import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-tight">Sonnet Chat</h1>
        <div className="space-x-4">
          <button className="bg-transparent text-white hover:underline">Login</button>
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Sign Up</button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent">
          Your AI Shoe Assistant
        </h2>
        <p className="text-lg text-gray-400 max-w-xl mb-10">
          Discover and book your perfect pair. Our LLM-powered assistant understands your style, preferences, and activity to find the best shoes for you.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
        <Link
  to="/chat"
  className="bg-white text-black px-6 py-3 rounded font-medium hover:bg-gray-100 transition"
>
  Start Chat
</Link>
          <button className="bg-gray-800 border border-gray-600 px-6 py-3 rounded font-medium hover:bg-gray-700 transition">
            How it Works
          </button>
        </div>

        {/* Gradient background */}
        <div className="absolute inset-0 -z-10 grid grid-cols-12 grid-rows-6 opacity-20">
          <div className="col-span-full row-span-full bg-gradient-to-br from-blue-500 via-green-400 to-red-600"></div>
        </div>
      </section>

      {/* Features */}
      <section className="px-10 py-20 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sneakers" className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Shoe Matching</h3>
            <p className="text-gray-400">We match your activity, budget, and style with the right shoes using advanced AI.</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1593733925160-6f78dc0be8b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGV4dGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="Running Shoes" className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Text Booking</h3>
            <p className="text-gray-400">Interact via chat with our LLM to book shoes instantly and intuitively.</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNob2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D" alt="Shoe Store" className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seamless Orders</h3>
            <p className="text-gray-400">Get real-time recommendations and order confirmation without leaving the conversation.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500 text-sm">
        © {new Date().getFullYear()} Sonnet Chat. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
