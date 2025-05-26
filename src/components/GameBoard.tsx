import React, { useEffect } from 'react';
import { GameState, LetterState } from '../types';
import GameRow from './GameRow';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { fireConfetti } from '../utils/confetti';

interface GameBoardProps {
  gameState: GameState;
  letterStates: Record<string, LetterState[]>;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, letterStates }) => {
  const { guesses, currentGuess } = gameState;
  const haptics = useHapticFeedback();
  
  // Handle win/lose effects
  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      haptics.gameWon();
      fireConfetti();
    }
  }, [gameState.gameStatus, haptics]);

  // Handle guess submission effects
  useEffect(() => {
    if (guesses.length > 0) {
      const lastGuess = guesses[guesses.length - 1];
      const lastGuessStates = letterStates[lastGuess];
      
      if (lastGuessStates) {
        const hasCorrect = lastGuessStates.some(state => state === 'correct');
        if (hasCorrect) {
          haptics.success();
        } else {
          haptics.error();
        }
      }
    }
  }, [guesses.length, letterStates, haptics]);

  const allRows = [...guesses];
  
  // If we're still playing, add the current guess
  if (gameState.gameStatus === 'playing' && allRows.length < 6) {
    allRows.push(currentGuess);
  }
  
  // Fill with empty rows if needed
  while (allRows.length < 6) {
    allRows.push('');
  }
  
  return (
    <div className="grid gap-2 w-full max-w-sm mx-auto">
      {allRows.map((guess, index) => {
        const isCurrentGuess = index === guesses.length && gameState.gameStatus === 'playing';
        const isSubmittedGuess = index < guesses.length;
        const states = isSubmittedGuess ? letterStates[guess] : undefined;
        
        return (
          <GameRow 
            key={index} 
            word={guess} 
            states={states}
            isCurrentGuess={isCurrentGuess}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;