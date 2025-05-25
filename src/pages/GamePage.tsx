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
    const { gameStatus, guesses } = gameState;
    const baseText = `WordDuel Challenge${gameStatus === 'won' ? ` solved in ${guesses.length}/6` : ': Failed'}`;
    
    // Create emoji grid (like Wordle)
    const emojiGrid = guesses.map(guess => {
      const states = letterStates[guess];
      return states.map(state => {
        if (state === 'correct') return '🟩';
        if (state === 'present') return '🟨';
        return '⬜';
      }).join('');
    }).join('\n');
    
    const shareText = `${baseText}\n\n${emojiGrid}\n\nCreate your own: ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'WordDuel Challenge',
        text: shareText,
      }).catch(() => {
        // Fallback to clipboard if sharing fails
        navigator.clipboard.writeText(shareText);
        setShowLink(true);
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(shareText);
      setShowLink(true);
    }
  };
  
  if (!decodedData) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        {gameState.gameStatus === 'playing' ? (
          <>
            <GameInstructions createdBy={gameState.createdBy} />
            <GameBoard gameState={gameState} letterStates={letterStates} />
            {error && (
              <p className="text-center text-red-600 text-sm mt-4 animate-fade-in">
                {error}
              </p>
            )}
            <Keyboard 
              onKeyPress={handleKeyPress}
              onDelete={removeLetter}
              onEnter={submitGuess}
              guesses={gameState.guesses}
              targetWord={gameState.word}
            />
            
            {showLink && (
              <div className="mt-6">
                <p className="text-sm text-slate-600 mb-1">Link copied! Share this URL:</p>
                <CopyLink url={window.location.href} />
              </div>
            )}
          </>
        ) : (
         <GameResults gameState={gameState} onShareClick={handleShare} createdBy={decodedData?.createdBy} />

        )}
      </main>
    </div>
  );
};

export default GamePage;