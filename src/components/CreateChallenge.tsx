import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidWord, generateChallengeId, encodeWord } from '../utils/gameUtils';
import { Share2Icon } from 'lucide-react';
import CopyLink from './CopyLink';

const CreateChallenge: React.FC = () => {
  const [word, setWord] = useState('');
  const [creator, setCreator] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [challengeUrl, setChallengeUrl] = useState('');
  const navigate = useNavigate();
  
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 5).toUpperCase();
    setWord(value);
    setError('');
    setShowShareLink(false);
  };
  
  const handleCreatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreator(e.target.value);
    setShowShareLink(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError('');
    
    if (!creator.trim()) {
      setError('Please enter your name');
      setIsValidating(false);
      return;
    }
    
    try {
      const valid = await isValidWord(word);
      if (!valid) {
        setError('Please enter a valid English word');
        setIsValidating(false);
        return;
      }
      
      const challengeId = generateChallengeId();
      const encodedData = encodeWord(word, creator);
      const url = `${window.location.origin}/challenge/${challengeId}/${encodedData}`;
      
      setChallengeUrl(url);
      setShowShareLink(true);
      setIsValidating(false);
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsValidating(false);
    }
  };
  
  const handleStartChallenge = () => {
    navigate(challengeUrl.replace(window.location.origin, ''));
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6">Create a Word Challenge</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="word" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Enter a 5-letter word
            </label>
            <input
              type="text"
              id="word"
              value={word}
              onChange={handleWordChange}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-gray-600 rounded-md text-lg font-medium tracking-wider text-center uppercase focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
              placeholder="WORDS"
              autoComplete="off"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="creator" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Your name
            </label>
            <input
              type="text"
              id="creator"
              value={creator}
              onChange={handleCreatorChange}
              className="w-full px-4 py-2 border-2 border-slate-300 dark:border-gray-600 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={word.length !== 5 || isValidating}
            className={`
              w-full py-3 px-4 rounded-md font-medium text-white 
              transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${word.length === 5 && !isValidating
                ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600' 
                : 'bg-slate-400 dark:bg-gray-600 cursor-not-allowed'}
            `}
          >
            {isValidating ? 'Validating...' : 'Create Challenge'}
          </button>
        </form>
        
        {showShareLink && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
              <Share2Icon size={20} />
              <span>Challenge created! Share this link:</span>
            </div>
            
            <CopyLink url={challengeUrl} />
            
            <button
              onClick={handleStartChallenge}
              className="w-full py-2 px-4 bg-emerald-100 dark:bg-emerald-900 hover:bg-emerald-200 dark:hover:bg-emerald-800 text-emerald-700 dark:text-emerald-300 rounded transition-colors"
            >
              Start Challenge Yourself
            </button>
          </div>
        )}
        
        <div className="mt-8 border-t border-slate-200 dark:border-gray-700 pt-4">
          <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">How it works:</h2>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Enter a 5-letter word of your choice</li>
            <li>Share the generated link with a friend</li>
            <li>They'll try to guess your word, Wordle-style</li>
            <li>See if they can solve it within 6 attempts!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge