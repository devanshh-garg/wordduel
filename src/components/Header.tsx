import React, { useState, useEffect } from 'react';
import { BookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BsSun, BsMoon } from 'react-icons/bs';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  return (
    <header className="w-full bg-white border-b border-slate-200 py-4 px-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-indigo-600 font-bold text-xl"
        >
          <BookIcon size={24} />
          <span>WordDuel</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link 
            to="/" 
            className="text-slate-700 hover:text-indigo-600 transition-colors"
          >
            New Challenge
          </Link>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-slate-700 hover:text-indigo-600 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

useEffect(() => {
  const root = document.documentElement;
  if (isDarkMode) {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}, [isDarkMode]);

export default Header;