import React from 'react';
import { Croissant, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useSoundEffects } from '../hooks/useSoundEffects';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useSoundEffects();

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
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12a1 1 0 01-1.707.707L5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v1z" />
              </svg>
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