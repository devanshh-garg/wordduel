export type GameStatus = 'playing' | 'won' | 'lost';

export type LetterState = 'correct' | 'present' | 'absent' | 'unused';

export interface GameState {
  word: string;
  guesses: string[];
  currentGuess: string;
  gameStatus: GameStatus;
  createdBy: string;
}

export interface KeyboardKey {
  key: string;
  state: LetterState;
  width?: number;
}