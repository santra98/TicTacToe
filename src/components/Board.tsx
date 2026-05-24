import React from 'react';
import type { BoardState, Player } from '../types';
import { Square } from './Square';

interface BoardProps {
  board: BoardState;
  onSquareClick: (index: number) => void;
  winningCombo: number[] | null;
  winner: Player | null;
  isDraw: boolean;
  nextPlayer: Player;
  isHistoryView: boolean; // lock controls if viewing history
}

export const Board: React.FC<BoardProps> = ({
  board,
  onSquareClick,
  winningCombo,
  winner,
  isDraw,
  nextPlayer,
  isHistoryView,
}) => {
  const getLineCoordinates = (combo: number[]) => {
    const sorted = [...combo].sort((a, b) => a - b);
    const key = sorted.join(',');

    switch (key) {
      // Rows
      case '0,1,2':
        return { x1: '6%', y1: '16.66%', x2: '94%', y2: '16.66%' };
      case '3,4,5':
        return { x1: '6%', y1: '50%', x2: '94%', y2: '50%' };
      case '6,7,8':
        return { x1: '6%', y1: '83.33%', x2: '94%', y2: '83.33%' };
      // Columns
      case '0,3,6':
        return { x1: '16.66%', y1: '6%', x2: '16.66%', y2: '94%' };
      case '1,4,7':
        return { x1: '50%', y1: '6%', x2: '50%', y2: '94%' };
      case '2,5,8':
        return { x1: '83.33%', y1: '6%', x2: '83.33%', y2: '94%' };
      // Diagonals
      case '0,4,8':
        return { x1: '10%', y1: '10%', x2: '90%', y2: '90%' };
      case '2,4,6':
        return { x1: '90%', y1: '10%', x2: '10%', y2: '90%' };
      default:
        return null;
    }
  };

  const winningCoords = winningCombo ? getLineCoordinates(winningCombo) : null;
  const isGameOver = !!winner || isDraw;

  return (
    <div className="relative w-full max-w-[340px] md:max-w-[420px] aspect-square mx-auto p-4 rounded-3xl bg-slate-100/60 border border-slate-200/80 shadow-inner">
      <div className="grid grid-cols-3 gap-3 md:gap-4 h-full w-full">
        {board.map((cell, index) => {
          const isWinningSquare = winningCombo ? winningCombo.includes(index) : false;
          return (
            <Square
              key={index}
              value={cell}
              onClick={() => onSquareClick(index)}
              isWinning={isWinningSquare}
              disabled={isGameOver || isHistoryView}
              nextPlayer={nextPlayer}
            />
          );
        })}
      </div>

      {/* SVG overlay that dynamically draws the winning path */}
      {winningCoords && winner && (
        <svg className="winning-line-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line
            x1={parseFloat(winningCoords.x1)}
            y1={parseFloat(winningCoords.y1)}
            x2={parseFloat(winningCoords.x2)}
            y2={parseFloat(winningCoords.y2)}
            className={`winning-path ${
              winner === 'X' ? 'stroke-indigo-600' : 'stroke-emerald-600'
            }`}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};
