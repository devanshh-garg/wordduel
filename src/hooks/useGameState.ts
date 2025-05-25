import { useState, useEffect } from 'react';
import { GameState, GameStatus, LetterState } from '../types';
import { evaluateGuess, isValidWord } from '../utils/gameUtils';

const MAX_ATTEMPTS = 6;

export const useGameState = (targetWord: string, createdBy?: string): {
  gameState: GameState;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => Promise<void>;
  letterStates: Record<string, LetterState[]>;
  error?: string;
} => {
  const [gameState, setGameState] = useState<GameState>({
    word: targetWord,
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    createdBy
  });
  
  const [error, setError] = useState<string>();
  const [letterStates, setLetterStates] = useState<Record<string, LetterState[]>>({});
  
  // Update letter states when guesses change
  useEffect(() => {
    const states: Record<string, LetterState[]> = {};
    
    gameState.guesses.forEach(guess => {
      states[guess] = evaluateGuess(guess, targetWord);
    });
    
    setLetterStates(states);
  }, [gameState.guesses, targetWord]);
  
  // Check for win/loss conditions
  useEffect(() => {
    if (gameState.guesses.length > 0) {
      const lastGuess = gameState.guesses[gameState.guesses.length - 1];
      
      if (lastGuess.toLowerCase() === targetWord.toLowerCase()) {
        setGameState(prev => ({ ...prev, gameStatus: 'won', word: targetWord })); // Include targetWord
      } else if (gameState.guesses.length >= MAX_ATTEMPTS) {
        setGameState(prev => ({ ...prev, gameStatus: 'lost', word: targetWord })); // Include targetWord
      }
    }
  }, [gameState.guesses, targetWord]);
  
  const addLetter = (letter: string) => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length < 5) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + letter
      }));
      setError(undefined);
    }
  };
  
  const removeLetter = () => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length > 0) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1)
      }));
      setError(undefined);
    }
  };
  
  const submitGuess = async () => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length !== 5) return;
    
    try {
      const valid = await isValidWord(gameState.currentGuess);
      if (!valid) {
        setError('Not a valid word');
        return;
      }
      
      setGameState(prev => ({
        ...prev,
        guesses: [...prev.guesses, prev.currentGuess],
        currentGuess: ''
      }));
      setError(undefined);
    } catch (error) {
      setError('Error validating word');
    }
  };
  
  return { gameState, addLetter, removeLetter, submitGuess, letterStates, error };
};