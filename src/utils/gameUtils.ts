import { LetterState } from '../types';

// Validates if the input is a valid 5-letter word
export const isValidWord = async (word: string): Promise<boolean> => {
  if (!/^[a-zA-Z]{5}$/i.test(word)) {
    return false;
  }
  
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.ok;
  } catch (error) {
    console.error('Error validating word:', error);
    return false;
  }
};

// Generates a unique ID for the challenge
export const generateChallengeId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

// Encodes the word for URL sharing
export const encodeWord = (word: string, createdBy?: string): string => {
  const wordToEncode = word.toLowerCase();
  const encoded = btoa(wordToEncode);
  
  if (createdBy && createdBy.trim()) {
    return `${encoded}|${btoa(createdBy.trim())}`;
  }
  
  return `${encoded}|${btoa('Anonymous User')}`;
};

// Decodes the word from URL
export const decodeWord = (encoded: string): { word: string; createdBy: string } => {
  try {
    const [wordEncoded, creatorEncoded] = encoded.split('|');
    const decodedWord = atob(wordEncoded);
    const decodedCreator = creatorEncoded ? atob(creatorEncoded) : 'Anonymous User';
    
    return {
      word: decodedWord,
      createdBy: decodedCreator
    };
  } catch (error) {
    console.error('Error decoding data:', error);
    throw new Error('Invalid challenge data');
  }
};

// Evaluates a guess against the target word
export const evaluateGuess = (guess: string, targetWord: string): LetterState[] => {
  const result: LetterState[] = Array(5).fill('absent');
  const targetLetters = targetWord.toLowerCase().split('');
  const guessLetters = guess.toLowerCase().split('');
  
  // First pass: Find correct letters
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = 'correct';
      targetLetters[i] = '*'; // Mark as used
    }
  }
  
  // Second pass: Find present letters
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'absent') {
      const index = targetLetters.indexOf(guessLetters[i]);
      if (index !== -1) {
        result[i] = 'present';
        targetLetters[index] = '*'; // Mark as used
      }
    }
  }
  
  return result;
};

// Get keyboard letter states based on all guesses
export const getKeyboardState = (guesses: string[], targetWord: string): Record<string, LetterState> => {
  const keyStates: Record<string, LetterState> = {};
  
  // Initialize all keys as unused
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    keyStates[letter] = 'unused';
  });
  
  // Update states based on guesses
  guesses.forEach(guess => {
    const states = evaluateGuess(guess, targetWord);
    
    guess.toLowerCase().split('').forEach((letter, index) => {
      const currentState = keyStates[letter];
      const newState = states[index];
      
      // Update state based on priority: correct > present > absent > unused
      if (newState === 'correct') {
        keyStates[letter] = 'correct';
      } else if (newState === 'present') {
        // If the letter isn't already marked as correct, mark it as present
        if (currentState !== 'correct') {
          keyStates[letter] = 'present';
        }
      } else if (newState === 'absent' && currentState === 'unused') {
        // Only mark as absent if it's currently unused
        keyStates[letter] = 'absent';
      }
    });
  });
  
  return keyStates;
};