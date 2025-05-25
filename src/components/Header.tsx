import React, { useState, useEffect } from 'react';
import { BookIcon, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('theme') !== 'light')));
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
        
        <nav className="flex gap-4">
          <Link
            to="/" 
            className="text-slate-700 hover:text-indigo-600 transition-colors"
          >
            New Challenge
          </Link>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-slate-700 hover:text-indigo-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

useEffect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode);
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}, [isDarkMode]);

export default Header;