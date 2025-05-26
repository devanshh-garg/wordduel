import React from 'react';
import { Croissant, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white border-b border-slate-200 py-4 px-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl"
        >
          <Croissant size={40} />
          <span>WordDuel</span>
        </Link> 

        <nav className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={20} className="text-slate-700 dark:text-slate-300" />
            ) : (
              <Moon size={20} className="text-slate-700 dark:text-slate-300" />
            )}
          </button>
          <Link 
            to="/" 
            className="text-slate-700 hover:text-indigo-600 transition-colors dark:text-slate-300 dark:hover:text-indigo-400"
          >
            New Challenge
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;