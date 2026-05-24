import type { BoardState, GameResult } from '../types';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6],
];

/**
 * Checks the board state for a winner or a draw
 */
export function checkWinner(board: BoardState): GameResult {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningCombo: combo,
        isDraw: false,
      };
    }
  }

  const isDraw = board.every((cell) => cell !== null);
  return {
    winner: null,
    winningCombo: null,
    isDraw,
  };
}
