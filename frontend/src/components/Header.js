import React, { useState } from 'react';
import LoginModal from './LoginModal';
import '../styles/components.css';

function Header({ user }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <header className="border-b border-gray-700 bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">⛽</span>
          <h1 className="text-2xl font-bold text-yellow-400">FuelPH</h1>
        </div>

        <nav className="flex items-center space-x-6">
          <a href="/" className="hover:text-yellow-400 transition">Home</a>
          <a href="/stations" className="hover:text-yellow-400 transition">Stations</a>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="hover:text-yellow-400 transition">Dashboard</a>
              <span className="text-sm text-gray-400">{user.email}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
            >
              Login
            </button>
          )}
        </nav>

        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      </div>
    </header>
  );
}

export default Header;
