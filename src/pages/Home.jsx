import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';
import html2canvas from 'html2canvas';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [grid, setGrid] = useState(JSON.parse(localStorage.getItem('grid')) || Array(100).fill(null));
  const [category, setCategory] = useState('technology');
  const [streak, setStreak] = useState(Number(localStorage.getItem('streak')) || 0);
  const [dailySaves, setDailySaves] = useState(JSON.parse(localStorage.getItem('dailySaves')) || [0, 0, 0, 0, 0, 0, 0]);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  // Fetch headlines from NewsAPI
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const cached = JSON.parse(localStorage.getItem('articles')) || [];
        if (cached.length) setArticles(cached);
        const apiKey = import.meta.env.VITE_NEWS_API_KEY || process.env.REACT_APP_NEWS_API_KEY;
        if (!apiKey) {
          throw new Error('API key not found. Please set VITE_NEWS_API_KEY or REACT_APP_NEWS_API_KEY in .env');
        }
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
        );
        setArticles(response.data.articles.slice(0, 10));
        localStorage.setItem('articles', JSON.stringify(response.data.articles.slice(0, 10)));
        setError(null);
      } catch (error) {
        console.error('Error fetching news:', error);
        setArticles([{ title: 'Offline Mode', source: { name: 'SwipeScoop' }, description: 'Check your connection.', url: '#' }]);
        setError(error.message || 'Failed to load articles. Using offline mode.');
      }
    };
    fetchArticles();
  }, [category]);

  // Check for new day and reset streak
  useEffect(() => {
    const checkDay = () => {
      const today = new Date().toDateString();
      if (today !== currentDate) {
        setStreak(0);
        localStorage.setItem('streak', '0');
        setCurrentDate(today);
      }
    };
    // Check every minute
    const interval = setInterval(checkDay, 60000);
    return () => clearInterval(interval);
  }, [currentDate]);

  // Handle swipe
  const onSwipe = (direction, article, index) => {
    if (direction === 'right') {
      // Update grid: Find first empty slot and fill with article data
      const newGrid = [...grid];
      const emptyIndex = newGrid.findIndex((pixel) => !pixel);
      if (emptyIndex !== -1) {
        newGrid[emptyIndex] = { title: article.title, color: category === 'technology' ? '#3B82F6' : '#EF4444' };
        setGrid(newGrid);
        localStorage.setItem('grid', JSON.stringify(newGrid));
        // Update daily saves for chart
        const newDailySaves = [...dailySaves];
        newDailySaves[new Date().getDay()] += 1;
        setDailySaves(newDailySaves);
        localStorage.setItem('dailySaves', JSON.stringify(newDailySaves));
        // Update streak: Increment per right swipe
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('streak', newStreak.toString());
      }
    }
  };

  // Export grid as image
  const exportGrid = () => {
    const gridElement = document.querySelector('.grid');
    if (gridElement) {
      html2canvas(gridElement).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'swipescoop-grid.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  // Reset streak for testing
  const resetStreak = () => {
    setStreak(0);
    localStorage.setItem('streak', '0');
  };

  // Chart data
  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Articles Saved',
      data: dailySaves,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
    }],
  };
  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Articles' } },
      x: { title: { display: true, text: 'Days' } },
    },
    animation: { duration: 1000, easing: 'easeInOutQuad' },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SwipeScoop</h1>
          <div className="space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/about" className="hover:underline">About</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Discover News</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          >
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <div className="relative h-96">
            {articles.length ? (
              articles.map((article, index) => (
                <TinderCard
                  key={index}
                  onSwipe={(dir) => onSwipe(dir, article, index)}
                  className="absolute w-full bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  preventSwipe={['up', 'down']}
                >
                  <h3 className="text-lg font-semibold mb-2 truncate">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{article.source.name}</p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{article.description || 'No description available.'}</p>
                  {article.urlToImage ? (
                    <img src={article.urlToImage} alt="Article" className="h-40 object-cover rounded mb-4" />
                  ) : (
                    <div className="h-40 bg-gray-200 rounded flex items-center justify-center mb-4">
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    Read More
                  </a>
                </TinderCard>
              ))
            ) : (
              <p className="text-center text-gray-500">Loading articles...</p>
            )}
          </div>
        </div>

        {/* Grid & Streak */}
        <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Reading Grid</h2>
          <p className="text-center mb-4 text-xl font-bold text-blue-500">Streak: {streak} swipes today</p>
          <div className="grid grid-cols-10 gap-1 mb-4">
            {grid.map((pixel, index) => (
              <div
                key={index}
                className="w-6 h-6 border transition-opacity duration-500 hover:scale-110"
                style={{ backgroundColor: pixel ? pixel.color : 'transparent' }}
                title={pixel ? pixel.title : ''}
              />
            ))}
          </div>
          <button
            onClick={exportGrid}
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 mr-2"
          >
            Export Grid
          </button>
          <button
            onClick={resetStreak}
            className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600 mt-2"
          >
            Reset Streak
          </button>
        </div>

        {/* Reading Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4 text-center">Reading Trends</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 px-4 text-center">
        <p className="mb-2">© 2025 SwipeScoop. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;