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
      <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
        <div className="flex justify-center mb-6">
          {gameStatus === 'won' ? (
            <div className="animate-bounce-and-spin">
              <PartyPopperIcon size={64} className="text-amber-500" />
            </div>
          ) : (
            <FrownIcon size={64} className="text-slate-500" />
          )}
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-3 
          bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {resultTitle}
        </h2>
        <p className="text-slate-500 text-center mb-6">{creatorText}</p>
        
        <div className="flex flex-col items-center justify-center space-y-2 mb-8">
          <p className="text-slate-700 mb-2">The word was:</p>
          <div className="flex gap-2">
            {word.split('').map((letter, index) => (
              <div 
                key={index}
                className="w-12 h-12 flex items-center justify-center 
                  bg-gradient-to-br from-emerald-400 to-emerald-600 
                  text-white font-bold rounded-lg uppercase text-xl
                  shadow-md animate-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
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
              bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
              text-white rounded-lg font-medium shadow-md transform hover:scale-105 transition-all"
          >
            <ShareIcon size={20} />
            Share Result
          </button>
          
          <Link
            to="/"
            className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 
              text-slate-800 rounded-lg text-center font-medium
              transform hover:scale-105 transition-all"
          >
            New Challenge
          </Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="font-medium text-slate-800 mb-3">Your guesses:</h3>
          <div className="grid grid-cols-1 gap-2">
            {guesses.map((guess, index) => (
              <div 
                key={index} 
                className="text-slate-700 font-medium p-2 rounded
                  bg-slate-50 animate-slide-in"
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