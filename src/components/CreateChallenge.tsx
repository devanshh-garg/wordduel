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
    console.log('Input value:', e.target.value, 'Updated creator state:', e.target.value.slice(0, 20));
    setCreator(e.target.value.slice(0, 20));
    setShowShareLink(false);
  };
  
  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError('');
    
    // Make creator name mandatory
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
      const encodedData = encodeWord(word, creator); // Pass creator directly
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
      <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6">Create a Word Challenge</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="word" className="block text-sm font-medium text-slate-700 mb-1">
              Enter a 5-letter word
            </label>
            <input
              type="text"
              id="word"
              value={word}
              onChange={handleWordChange}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-md text-lg font-medium tracking-wider text-center uppercase focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="WORDS"
              autoComplete="off"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="creator" className="block text-sm font-medium text-slate-700 mb-1">
              Your name (optional)
            </label>
            <input
              type="text"
              id="creator"
              value={creator}
              onChange={handleCreatorChange}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Anonymous"
            />
          </div>
          
          <button
            type="submit"
            disabled={word.length !== 5 || isValidating}
            className={`
              w-full py-3 px-4 rounded-md font-medium text-white 
              transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${word.length === 5 && !isValidating
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-slate-400 cursor-not-allowed'}
            `}
          >
            {isValidating ? 'Validating...' : 'Create Challenge'}
          </button>
        </form>
        
        {showShareLink && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 font-medium">
              <Share2Icon size={20} />
              <span>Challenge created! Share this link:</span>
            </div>
            
            <CopyLink url={challengeUrl} />
            
            <button
              onClick={handleStartChallenge}
              className="w-full py-2 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors"
            >
              Start Challenge Yourself
            </button>
          </div>
        )}
        
        <div className="mt-8 border-t border-slate-200 pt-4">
          <h2 className="text-lg font-medium text-slate-700 mb-2">How it works:</h2>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
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

export default CreateChallenge;