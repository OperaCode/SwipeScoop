import React from "react";
import { motion } from "framer-motion";
import { GalleryHorizontal } from "lucide-react";
import newsLogo from "../assets/newsapi-logo.png"


const Landing = () => {
 
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col font-sans">
      {/* Navigation Header */}
      <nav className="sticky top-0 bg-blue-700 text-white py-4 px-8 flex justify-between items-center shadow-md z-10">
        <h1 className="text-2xl font-extrabold flex items-center ">
          <GalleryHorizontal/>
          SwipeScoop</h1>
        <div className="space-x-4">
          <a href="#top" className="hover:underline font-bold ">
            Home
          </a>
          <a href="#features" className=" hover:underline font-bold">
            Features
          </a>
          <a href="#contact" className=" hover:underline font-bold">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.main
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="top"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 px-4 text-center flex flex-col md:flex-ro items-center justify-center gap-8 relative overflow-hidden "
      >
        {/* Hero Text */}
        <motion.div
          className="w-full justify-center pt-4 "
          initial="hidden"
          animate="visible"
         
        >
          <div className="">
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold mb-4"
              role="heading"
            >
              Welcome to SwipeScoop
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg md:text-2xl  max-w-xl m-auto p-4"
            >
              Swipe through concise headlines to stay updated in seconds, and explore our interactive pixel grid for hidden stories. <br />
              <span className=" p-3 inline-block animate-spin-slow text-7xl md:text-9xl">
                🌍
              </span>
            </motion.p>
          </div>

          {/* Hero Buttons */}
          <motion.div className="flex justify-center max-w-xl gap-4 m-auto">
            <motion.a
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              href="/home"
              className="flex-1  bg-red-500 text-white py-3 md:w-1/5 w-2/3 px-3 rounded-full hover:bg-red-600 transition duration-300 shadow-lg items-center m-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
            <motion.a
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              href="#features"
              className="flex-1  border border-white py-3 md:w-1/5 w-2/3 px-3 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 m-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-indigo-600/50 z-[-1]" />
      </motion.main>

      {/* Features Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        id="features"
        className="py-16 px-4 bg-white"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ y:-30, opacity:0 }}
        whileInView={{ y:0, opacity:1 }}
        transition={{ duration:0.8, delay:0.5 }}
        >
          Why Choose SwipeScoop?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {[
            {
              title: "Swipeable News",
              desc: "Swipe right to save headlines or left to skip, with a fun, Tinder-like interface.",
              icon: (
                <svg
                  className="w-8 h-8 mb-2 text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              ),
            },
            {
              title: "Pixel Progress Grid",
              desc: "Track your reading with a GitHub-inspired pixel grid, colorful and shareable.",
              icon: (
                <svg
                  className="w-8 h-8 mb-2 text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" />
                </svg>
              ),
            },
            {
              title: "Reading Trends",
              desc: "See your news habits with a sleek chart, keeping you informed and engaged.",
              icon: (
                <svg
                  className="w-8 h-8 mb-2 text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 glassmorphism rounded-lg shadow-lg"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
             
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          
        >
          What Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              quote: "SwipeScoop makes reading news addictive again!",
              name: "Sarah, Student",
            },
            {
              quote: "I love tracking my reading with the pixel grid.",
              name: "James, Developer",
            },
            {
              quote: "Swiping through headlines is fun and productive.",
              name: "Aisha, Designer",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
             
              whileHover={{ y: -5 }}
            >
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <p className="mt-4 font-semibold text-blue-700">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-8 px-4 text-center bg-white"
      >
        <motion.p
          className="mb-4 text-gray-500"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          
        >
          Powered by
        </motion.p>
        <motion.div
          className="flex justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          
        >
          <img
            src={newsLogo}
            alt="NewsAPI logo"
            className="h-8"
            loading="lazy"
          />
          {/* <h3 className="h-8">🗞️</h3> */}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-blue-800 text-white py-8 px-4 text-center"
      >
        <motion.p
          className="mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          
        >
          Join our newsletter for the latest updates!
        </motion.p>
        <motion.div
          className="flex max-w-md mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow py-2 px-4 rounded-l-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            
          />
          <motion.button
            className="bg-red-500 text-white py-2 px-6 rounded-r-full hover:bg-red-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
           
          >
            Subscribe
          </motion.button>
        </motion.div>
        <motion.p
          className="mb-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          
        >
          © 2025 SwipeScoop. All rights reserved.
        </motion.p>
        <div className="flex justify-center space-x-4">
          <a
            href="#top"
            className="hover:underline"
            
          >
            Home
          </a>
          <a
            href="#features"
            className="hover:underline"
            
          >
            Features
          </a>
          <a
            href="#contact"
            className="hover:underline"
            
          >
            Privacy
          </a>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 10s linear infinite;
        }
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Landing;
