import React from 'react'

const Landing = () => {
 return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
          SwipeScoop
        </h1>
        <p className="text-lg md:text-xl mb-6 animate-fadeIn">
          Discover news in a snap with swipeable headlines and a fun pixel grid!
        </p>
        <a
          href="/home"
          className="inline-block bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 animate-fadeIn"
        >
          Try Now
        </a>
      </header>

      {/* Features Section */}
      <section className="py-12 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 animate-fadeIn">
          Why SwipeScoop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-lg shadow-lg animate-fadeIn">
            <h3 className="text-xl font-semibold mb-2">Swipeable News</h3>
            <p className="text-gray-600">
              Swipe right to save headlines or left to skip, with a fun, Tinder-like interface.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-lg animate-fadeIn">
            <h3 className="text-xl font-semibold mb-2">Pixel Progress Grid</h3>
            <p className="text-gray-600">
              Track your reading with a GitHub-inspired pixel grid, colorful and shareable.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-lg animate-fadeIn">
            <h3 className="text-xl font-semibold mb-2">Reading Trends</h3>
            <p className="text-gray-600">
              See your news habits with a sleek chart, keeping you informed and engaged.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 px-4 text-center">
        <p className="mb-2 animate-fadeIn">&copy; 2025 SwipeScoop. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default Landing
