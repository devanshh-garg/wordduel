import React from 'react';
import { Link } from 'react-router-dom';
import { GameState } from '../types';
import { PartyPopperIcon, FrownIcon, ShareIcon } from 'lucide-react';

interface GameResultsProps {
  gameState: GameState;
  onShareClick: () => void;
  createdBy?: string;
}

const GameResults: React.FC<GameResultsProps> = ({ gameState, onShareClick, createdBy }) => {
  const { gameStatus, word, guesses } = gameState;
  
  const resultTitle = gameStatus === 'won'
    ? `You got it in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!` 
    : 'Better luck next time!';
  
  const creatorText = createdBy 
    ? `Challenge by ${createdBy}` 
    : `Challenge by: Your dorky friend`;
  
  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl p-8 animate-fade-in">
        <div className="flex justify-center mb-6">
          {gameStatus === 'won' ? (
            <div className="animate-bounce-and-spin">
              <PartyPopperIcon size={64} className="text-amber-500" />
            </div>
          ) : (
            <FrownIcon size={64} className="text-slate-500 dark:text-slate-400" />
          )}
        </div>

        <h2 className="text-3xl font-bold text-center mb-3
          bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          {resultTitle}
        </h2>

        <p className="text-lg font-medium text-center mb-8
          bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
          {creatorText}
        </p>
        
        <div className="flex flex-col items-center justify-center space-y-2 mb-8">
          <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4">The word was:</p>
          <div className="flex gap-2">
            {word.split('').map((letter, index) => (
              <div
                key={index}
                className="w-14 h-14 flex items-center justify-center 
                  bg-gradient-to-br from-emerald-400 to-emerald-600 
                  text-white font-bold rounded-lg uppercase text-2xl
                  shadow-lg animate-reveal transform hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={onShareClick}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6
              bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 
              hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600
              text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all"
          >
            <ShareIcon size={20} />
            Share Result
          </button>

          <Link
            to="/"
            className="flex-1 py-3 px-6
              bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-800 
              hover:from-slate-200 hover:to-slate-300 dark:hover:from-gray-600 dark:hover:to-gray-700
              text-slate-800 dark:text-slate-200 rounded-lg text-center font-medium shadow-md
              transform hover:scale-105 transition-all"
          >
            New Challenge
          </Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-700">
          <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-4 text-lg">Your guesses:</h3>
          <div className="grid grid-cols-1 gap-2">
            {guesses.map((guess, index) => (
              <div
                key={index} 
                className="text-slate-700 dark:text-slate-300 font-medium p-3 rounded-lg
                  bg-gradient-to-r from-slate-50 to-white dark:from-gray-800 dark:to-gray-700
                  shadow-sm hover:shadow-md animate-slide-in
                  transform hover:translate-x-1 transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {index + 1}. {guess.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResults