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
  
  const handleCopyWord = () => {
    navigator.clipboard.writeText(word);
  };
  
  const resultTitle = gameStatus === 'won' 
    ? `You got it in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!` 
    : 'Better luck next time!';
  
  const creatorText = createdBy 
    ? `Challenge by: ${createdBy}` 
    : 'Anonymous challenge';
  
  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
        <div className="flex justify-center mb-4">
          {gameStatus === 'won' ? (
            <PartyPopperIcon size={48} className="text-amber-500 animate-bounce" />
          ) : (
            <FrownIcon size={48} className="text-slate-500" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">{resultTitle}</h2>
        <p className="text-slate-500 text-center mb-6">{creatorText}</p>
        
        <div className="flex flex-col items-center justify-center space-y-2 mb-6">
          <p className="text-slate-700">The word was:</p>
          <div className="flex gap-2 mt-2">
            {word.split('').map((letter, index) => (
              <div 
                key={index}
                className="w-10 h-10 flex items-center justify-center bg-emerald-500 text-white font-bold rounded uppercase"
              >
                {letter}
              </div>
            ))}
          </div>
          <button 
            onClick={handleCopyWord}
            className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
          >
            Copy word
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={onShareClick}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
          >
            <ShareIcon size={18} />
            Share Result
          </button>
          
          <Link
            to="/"
            className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-center transition-colors"
          >
            New Challenge
          </Link>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200">
          <h3 className="font-medium text-slate-800 mb-2">Your guesses:</h3>
          <div className="grid grid-cols-1 gap-2">
            {guesses.map((guess, index) => (
              <div key={index} className="text-slate-700 font-medium">
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