export type Player = 'X' | 'O';

export type BoardState = (Player | null)[];

export interface GameHistoryEntry {
  board: BoardState;
  lastMove: number | null; // index (0-8) where the move was made
  player: Player; // the player who made this move
}

export interface GameStats {
  xWins: number;
  oWins: number;
  draws: number;
  gamesPlayed: number;
  currentStreak: number;
  streakWinner: Player | null;
}

export interface GameResult {
  winner: Player | null;
  winningCombo: number[] | null;
  isDraw: boolean;
}
