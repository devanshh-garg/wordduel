import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import GameBoard from '../components/GameBoard';
import Keyboard from '../components/Keyboard';
import GameResults from '../components/GameResults';
import GameInstructions from '../components/GameInstructions';
import CopyLink from '../components/CopyLink';
import { useGameState } from '../hooks/useGameState';
import { decodeWord } from '../utils/gameUtils';

const GamePage: React.FC = () => {
  const { challengeId, encodedWord } = useParams<{ challengeId: string; encodedWord: string }>();
  const [decodedData, setDecodedData] = useState<{ word: string; createdBy?: string } | null>(null);
  const [showLink, setShowLink] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!encodedWord) {
      navigate('/');
      return;
    }

    try {
      const data = decodeWord(encodedWord);
      setDecodedData(data);
    } catch (error) {
      navigate('/');
    }
  }, [encodedWord, navigate]);

  const { 
    gameState, 
    addLetter, 
    removeLetter, 
    submitGuess, 
    letterStates,
    error 
  } = useGameState(
    decodedData?.word || '',
    decodedData?.createdBy
  );
  
  const handleKeyPress = useCallback((key: string) => {
    if (/^[a-zA-Z]$/.test(key)) {
      addLetter(key.toLowerCase());
    }
  }, [addLetter]);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      removeLetter();
    } else if (e.key === 'Enter') {
      submitGuess();
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      addLetter(e.key.toLowerCase());
    }
  }, [addLetter, removeLetter, submitGuess]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  const handleShare = () => {
    const { gameStatus, guesses, word } = gameState;
    const baseText = `WordDuel Challenge${gameStatus === 'won' ? ` solved in ${guesses.length}/6` : ': Failed'}`;
    
    const maxLength = Math.max(...guesses.map(g => g.length));
    
    const guessesWithEmoji = guesses.map(guess => {
      const states = letterStates[guess];
      const emojis = states.map(state => {
        if (state === 'correct') return '🟩';
        if (state === 'present') return '🟨';
        return '⬜';
      }).join('');
      const paddedWord = guess.toUpperCase().padEnd(maxLength, ' ');
      return `${paddedWord}  ${emojis}`;
    }).join('\n');
    
    const shareText = `${baseText}\n\n${guessesWithEmoji}\n\n${gameStatus === 'lost' ? `Word was: ${word.toUpperCase()}\n\n` : ''}Create your own: ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'WordDuel Challenge',
        text: shareText,
      }).catch(() => {
        navigator.clipboard.writeText(shareText);
        setShowLink(true);
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setShowLink(true);
    }
  };
  
  if (!decodedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-slate-600 dark:text-slate-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-6">
        {gameState.gameStatus === 'playing' ? (
          <div className="space-y-6">
            <GameInstructions createdBy={decodedData?.createdBy} />
            <div className="flex flex-col items-center">
              <GameBoard gameState={gameState} letterStates={letterStates} />
              {error && (
                <p className="text-center text-red-600 dark:text-red-400 text-sm mt-4 animate-fade-in bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                  {error}
                </p>
              )}
              <Keyboard 
                onKeyPress={handleKeyPress}
                onDelete={removeLetter}
                onEnter={submitGuess}
                guesses={gameState.guesses}
                letterStates={letterStates}
              />
            </div>
            
            {showLink && (
              <div className="mt-8 max-w-md mx-auto">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Link copied! Share this URL:</p>
                <CopyLink url={window.location.href} />
              </div>
            )}
          </div>
        ) : (
         <GameResults gameState={gameState} onShareClick={handleShare} createdBy={decodedData?.createdBy} />
        )}
      </main>
    </div>
  );
};

export default GamePage;