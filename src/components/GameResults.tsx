import React from 'react';
import { Link } from 'react-router-dom';
import { GameState } from '../types';
import { PartyPopperIcon, FrownIcon, ShareIcon } from 'lucide-react';

interface GameResultsProps {
  gameState: GameState;
  onShareClick: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ gameState, onShareClick }) => {
  const { gameStatus, word, guesses, createdBy } = gameState;
  
  const resultTitle = gameStatus === 'won' 
    ? `You got it in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!` 
    : 'Better luck next time!';
  
  const creatorText = createdBy 
    ? `Challenge by: ${createdBy}` 
    : 'Anonymous challenge';
  
  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="flex justify-center mb-8">
          {gameStatus === 'won' ? (
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-amber-600 opacity-75 blur-lg rounded-full"></div>
              <div className="relative animate-bounce-and-spin">
                <PartyPopperIcon size={72} className="text-amber-500" />
              </div>
            </div>
          ) : (
            <FrownIcon size={72} className="text-slate-500" />
          )}
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-3 
          bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent
          animate-fade-in">
          {resultTitle}
        </h2>
        <p className="text-slate-500 text-center mb-8 animate-fade-in">{creatorText}</p>
        
        <div className="flex flex-col items-center justify-center space-y-2 mb-8">
          <p className="text-lg text-slate-700 font-medium mb-4 animate-fade-in">The word was:</p>
          <div className="flex gap-3">
            {word.split('').map((letter, index) => (
              <div 
                key={index}
                className="w-16 h-16 flex items-center justify-center 
                  bg-gradient-to-br from-emerald-400 to-emerald-600 
                  text-white font-bold rounded-xl uppercase text-2xl
                  shadow-lg animate-reveal transform hover:scale-110 
                  transition-transform duration-200 relative group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-75 blur group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <span className="relative">{letter}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={onShareClick}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6
              bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
              text-white rounded-xl font-medium shadow-lg transform hover:scale-105 
              transition-all duration-200 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-75 blur group-hover:opacity-100 transition-opacity rounded-xl"></div>
            <span className="relative flex items-center gap-2">
              <ShareIcon size={20} />
              Share Result
            </span>
          </button>
          
          <Link
            to="/"
            className="flex-1 py-3 px-6
              bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300
              text-slate-800 rounded-xl text-center font-medium shadow-md
              transform hover:scale-105 transition-all duration-200"
          >
            New Challenge
          </Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="font-medium text-slate-800 mb-4 text-lg">Your guesses:</h3>
          <div className="grid grid-cols-1 gap-2">
            {guesses.map((guess, index) => (
              <div 
                key={index} 
                className="text-slate-700 font-medium p-4 rounded-xl
                  bg-gradient-to-r from-slate-50 to-white
                  shadow-sm hover:shadow-md animate-slide-in
                  transform hover:translate-x-2 transition-all duration-200"
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

export default GameResults;