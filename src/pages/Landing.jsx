import React from 'react';

const Landing = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 bg-blue-700 text-white py-4 px-4 flex justify-between items-center shadow-md z-10">
        <h1 className="text-2xl font-bold">SwipeScoop</h1>
        <div className="space-x-4">
          <a href="/home" className="hover:underline">Home</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-hero" role="heading" >
            Welcome to SwipeScoop
          </h1>
          <p className="text-lg md:text-2xl mb-8 animate-hero max-w-xl">
            Discover news in a snap with swipeable headlines and a fun pixel grid!
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="/"
              className="inline-block bg-red-500 text-white py-3 px-8 rounded-full hover:bg-red-600 transition duration-300 animate-hero shadow-lg"
              
            >
              Try Now
            </a>
            <a
              href="#features"
              className="inline-block border border-white py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 animate-hero"
              
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 animate-hero">
          <img
            src="/assets/swipe-illustration.svg" 
            alt="SwipeScoop demo illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-hero">
          Why Choose SwipeScoop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 glassmorphism rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Swipeable News</h3>
            <p className="text-gray-600">
              Swipe right to save headlines or left to skip, with a fun, Tinder-like interface.
            </p>
          </div>
          <div className="p-6 glassmorphism rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Pixel Progress Grid</h3>
            <p className="text-gray-600">
              Track your reading with a GitHub-inspired pixel grid, colorful and shareable.
            </p>
          </div>
          <div className="p-6 glassmorphism rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Reading Trends</h3>
            <p className="text-gray-600">
              See your news habits with a sleek chart, keeping you informed and engaged.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700 italic">"SwipeScoop makes reading news addictive again!"</p>
            <p className="mt-4 font-semibold text-blue-700">Sarah, Student</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700 italic">"I love tracking my reading with the pixel grid."</p>
            <p className="mt-4 font-semibold text-blue-700">James, Developer</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700 italic">"Swiping through headlines is fun and productive."</p>
            <p className="mt-4 font-semibold text-blue-700">Aisha, Designer</p>
          </div>
        </div>
      </section>

      {/* Social Proof Logos */}
      <div className="py-8 px-4 text-center bg-white">
        <p className="mb-4 text-gray-500">Powered by</p>
        <div className="flex justify-center gap-8 opacity-70">
          <img src="/assets/newsapi-logo.png" alt="NewsAPI" className="h-8"/>
          {/* Add more logos if needed */}
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-blue-800 text-white py-8 px-4 text-center">
        <p className="mb-4 animate-hero">Join our newsletter for the latest updates!</p>
        <div className="flex max-w-md mx-auto mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow py-2 px-4 rounded-l-full text-gray-800 focus:outline-none"
            
          />
          <button
            className="bg-red-500 text-white py-2 px-6 rounded-r-full hover:bg-red-600 transition duration-300"
            
          >
            Subscribe
          </button>
        </div>
        <p className="mb-2 animate-hero">© 2025 SwipeScoop. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="/about" className="hover:underline" >About</a>
          <a href="/contact" className="hover:underline" >Contact</a>
          <a href="/privacy" className="hover:underline" >Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
