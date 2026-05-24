import React from 'react';
import type { Player } from '../types';

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
  nextPlayer: Player;
}

export const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  isWinning,
  disabled,
  nextPlayer,
}) => {
  const getMarkerContent = () => {
    if (value === 'X') {
      return (
        <svg
          className="w-10 h-10 md:w-14 md:h-14 stroke-brand-x stroke-[2.5] fill-none animate-scale-in"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    }
    if (value === 'O') {
      return (
        <svg
          className="w-10 h-10 md:w-14 md:h-14 stroke-brand-o stroke-[2.5] fill-none animate-scale-in"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    }
    
    // Ghost marker on hover for empty squares
    if (!disabled) {
      if (nextPlayer === 'X') {
        return (
          <svg
            className="w-10 h-10 md:w-14 md:h-14 stroke-indigo-200 stroke-[2] fill-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        );
      } else {
        return (
          <svg
            className="w-10 h-10 md:w-14 md:h-14 stroke-emerald-200 stroke-[2] fill-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
          </svg>
        );
      }
    }
    return null;
  };

  const getSquareStyles = () => {
    if (value) {
      if (isWinning) {
        return value === 'X'
          ? 'bg-indigo-50 border-brand-x shadow-[0_0_20px_rgba(79,70,229,0.2)] text-brand-x'
          : 'bg-emerald-50 border-brand-o shadow-[0_0_20px_rgba(5,150,105,0.2)] text-brand-o';
      }
      return 'bg-white border-slate-200 shadow-premium';
    }

    if (disabled) {
      return 'bg-slate-50 border-slate-100 cursor-not-allowed';
    }

    // Normal active empty square
    return 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-premium hover:shadow-premium-hover';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`group relative flex items-center justify-center aspect-square rounded-2xl border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${getSquareStyles()}`}
      aria-label={`Square`}
    >
      {getMarkerContent()}
    </button>
  );
};
