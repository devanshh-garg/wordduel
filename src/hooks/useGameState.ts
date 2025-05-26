import { useState, useEffect } from 'react';
import { GameState, GameStatus, LetterState } from '../types';
import { evaluateGuess, isValidWord } from '../utils/gameUtils';

const MAX_ATTEMPTS = 6;
const SUBMIT_COOLDOWN_MS = 250; // 250ms cooldown between submissions

export const useGameState = (targetWord: string, createdBy?: string): {
    gameState: GameState;
    addLetter: (letter: string) => void;
    removeLetter: () => void;
    submitGuess: () => Promise<void>;
    letterStates: Record<string, LetterState[]>;
    error?: string;
    resetGame: () => void;
} => {
  const localStorageKey = `wordle-game-state-${targetWord}`;
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadGameState = (): GameState => {
    const savedState = localStorage.getItem(localStorageKey);
    if (savedState) {
      try {
        const parsedState: GameState = JSON.parse(savedState);
        if (parsedState.word === targetWord) {
          return parsedState;
        }
      } catch (e) {
        console.error("Failed to parse game state from localStorage:", e);
      }
    }
    return {
      word: targetWord,
      guesses: [],
      currentGuess: '',
      gameStatus: 'playing',
      createdBy
    };
  };
  
  const [gameState, setGameState] = useState<GameState>(loadGameState());
  const [error, setError] = useState<string>();
  const [letterStates, setLetterStates] = useState<Record<string, LetterState[]>>({});

  // Update game state when targetWord changes
  useEffect(() => {
    if (gameState.word !== targetWord) {
      setGameState(loadGameState());
    }
  }, [targetWord]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(gameState));
  }, [gameState, localStorageKey]);

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
    if (!gameState) return; // Ensure gameState is defined
    if (gameState.guesses.length > 0) {
      const lastGuess = gameState.guesses[gameState.guesses.length - 1];
      
      if (lastGuess.toLowerCase() === targetWord.toLowerCase()) {
        setGameState(prev => ({ ...prev, gameStatus: 'won', word: targetWord }));
      } else if (gameState.guesses.length >= MAX_ATTEMPTS) {
        setGameState(prev => ({ ...prev, gameStatus: 'lost', word: targetWord }));
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
    if (isSubmitting) return; // Prevent submission if one is already in progress
    
    // Prevent empty submissions
    if (gameState.currentGuess.trim().length === 0) {
      return;
    }

    // Check if enough time has passed since last submission
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
      return;
    }

    if (gameState.currentGuess.length !== 5) {
      setError('Word must be 5 letters');
      return;
    }

    setIsSubmitting(true); // Set submitting flag
    
    try {
      const valid = await isValidWord(gameState.currentGuess);
      if (!valid) {
        setError('Not a valid word');
        setIsSubmitting(false); // Reset submitting flag
        return;
      }
      
      setLastSubmitTime(now);
      setGameState(prev => ({
        ...prev,
        guesses: [...prev.guesses, prev.currentGuess],
        currentGuess: ''
      }));
      setError(undefined);
    } catch (error) {
      setError('Error validating word');
    } finally {
      setIsSubmitting(false); // Always reset submitting flag
    }
  };

  const resetGame = () => {
    const initialGameState: GameState = {
      word: targetWord,
      guesses: [],
      currentGuess: '',
      gameStatus: 'playing',
      createdBy
    };
    setGameState(initialGameState);
    localStorage.removeItem(localStorageKey);
  };

  return { gameState, addLetter, removeLetter, submitGuess, letterStates, error, resetGame };
};