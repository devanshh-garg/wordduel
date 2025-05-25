import React, { useState, useEffect } from 'react';
import { BookIcon, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
            onClick={() => setDarkMode(!darkMode)}
            className="text-slate-700 hover:text-indigo-600 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
            to="/" 
            className="text-slate-700 hover:text-indigo-600 transition-colors"
          >
            New Challenge
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;