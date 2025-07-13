import React, { useState, useEffect } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
import { Line } from "react-chartjs-2";
import { GalleryHorizontal, LogOut } from 'lucide-react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Filler
);

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [grid, setGrid] = useState(
    JSON.parse(localStorage.getItem("grid")) || Array(100).fill(null)
  );
  const [category, setCategory] = useState("technology");

  const [trueStreak, setTrueStreak] = useState(
    Number(localStorage.getItem("trueStreak")) || 0
  );
  const [lastActiveDate, setLastActiveDate] = useState(
    localStorage.getItem("lastActiveDate") || ""
  );

  const [dailySaves, setDailySaves] = useState(
    JSON.parse(localStorage.getItem("dailySaves")) || Array(7).fill(0)
  );

  const [error, setError] = useState(null);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const cached = JSON.parse(localStorage.getItem("articles")) || [];
        if (cached.length) setArticles(cached);

        const apiKey =
          import.meta.env.VITE_NEWS_API_KEY ||
          process.env.REACT_APP_NEWS_API_KEY;
        if (!apiKey) throw new Error("API key not found in .env");

        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
        );
        const topArticles = response.data.articles.slice(0, 10);
        setArticles(topArticles);
        localStorage.setItem("articles", JSON.stringify(topArticles));
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([
          {
            title: "Offline Mode",
            source: { name: "SwipeScoop" },
            description: "Check your connection.",
            url: "#",
          },
        ]);
        setError("Failed to load articles. Using offline mode.");
      }
    };
    fetchArticles();
  }, [category]);

  // True streak check on load
  useEffect(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastActiveDate !== today) {
      if (lastActiveDate === yesterday) {
        const updatedStreak = trueStreak + 1;
        setTrueStreak(updatedStreak);
        localStorage.setItem("trueStreak", updatedStreak.toString());
      } else {
        setTrueStreak(1);
        localStorage.setItem("trueStreak", "1");
      }
      setLastActiveDate(today);
      localStorage.setItem("lastActiveDate", today);

      // Rolling window shift
      const newDailySaves = [...dailySaves.slice(1), 0];
      setDailySaves(newDailySaves);
      localStorage.setItem("dailySaves", JSON.stringify(newDailySaves));
    }
  }, []); 

  // Handle swipe
  const onSwipe = (direction, article) => {
    if (direction === "right") {
      const newGrid = [...grid];
      const emptyIndex = newGrid.findIndex((pixel) => !pixel);
      if (emptyIndex !== -1) {
        newGrid[emptyIndex] = {
          title: article.title,
          color: category === "technology" ? "#3B82F6" : "#EF4444",
        };
        setGrid(newGrid);
        localStorage.setItem("grid", JSON.stringify(newGrid));

        // Update daily saves (today as last index)
        const newDailySaves = [...dailySaves];
        newDailySaves[newDailySaves.length - 1] += 1;
        setDailySaves(newDailySaves);
        localStorage.setItem("dailySaves", JSON.stringify(newDailySaves));
      }
    }
  };

  const resetStreak = () => {
    setTrueStreak(0);
    localStorage.setItem("trueStreak", "0");
  };

  // Chart data
  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Articles Saved",
        data: dailySaves,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Articles" } },
      x: { title: { display: true, text: "Days" } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <GalleryHorizontal/>
            SwipeScoop</h1>
          <a href="/" className="flex items-center gap-2 font-bold">
            <LogOut/>
            Exit</a>
        </div>
      </nav>

      <main className="flex-grow p-4 max-w-5xl mx-auto w-full">
        {/* Streak Badge */}
        <div className="bg-white p-4 rounded-lg shadow mb-4 text-center">
          <p className="text-2xl font-bold text-orange-500">
            🔥 {trueStreak} day streak!
          </p>
          {trueStreak >= 3 && (
            <p className="text-green-600 font-semibold">
              🏅 Bronze Badge unlocked!
            </p>
          )}
          {trueStreak >= 7 && (
            <p className="text-yellow-500 font-semibold">
              🥇 Gold Badge unlocked!
            </p>
          )}
          <button
            onClick={resetStreak}
            className="bg-red-500 text-white py-1 px-4 rounded mt-2 hover:bg-red-600 transition duration-300"
          >
            Reset Streak
          </button>
        </div>

        {/* Tinder Cards */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
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
                  onSwipe={(dir) => onSwipe(dir, article)}
                  className="absolute w-full bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  preventSwipe={["up", "down"]}
                >
                  <h3 className="text-lg font-semibold mb-2 truncate">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {article.source.name}
                  </p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {article.description || "No description available."}
                  </p>
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt="Article"
                      className="h-40 object-cover rounded mb-4"
                    />
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

        {/* Grid */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Your Reading Grid
          </h2>
          <div className="grid grid-cols-10 gap-1 mb-4">
            {grid.map((pixel, index) => (
              <div
                key={index}
                className="w-6 h-6 border transition duration-300 hover:scale-110"
                style={{ backgroundColor: pixel ? pixel.color : "transparent" }}
                title={pixel ? pixel.title : ""}
              />
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Reading Trends
          </h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </main>

      <footer className="bg-blue-800 text-white py-6 px-4 text-center">
        <p className="mb-2">© 2025 SwipeScoop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
