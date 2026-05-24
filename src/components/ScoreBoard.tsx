import React from 'react';
import type { Player, GameStats } from '../types';

interface ScoreBoardProps {
  stats: GameStats;
  activePlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isHistoryView: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  stats,
  activePlayer,
  winner,
  isDraw,
  isHistoryView,
}) => {
  const isGameOver = !!winner || isDraw;

  return (
    <div className="w-full max-w-md mx-auto space-y-5 animate-fade-in">
      {/* Dynamic Status / Active Turn Card */}
      <div className="relative overflow-hidden glassmorphic-card rounded-2xl p-4 shadow-premium border border-white/80">
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">Status</span>
            {isHistoryView && (
              <span className="text-[10px] bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full animate-pulse">
                History View
              </span>
            )}
          </div>
          
          <div className="flex items-center font-display text-sm font-semibold">
            {winner ? (
              <span className={`flex items-center space-x-1 ${winner === 'X' ? 'text-indigo-600' : 'text-emerald-600'}`}>
                <span>Player {winner} Victory! 🎉</span>
              </span>
            ) : isDraw ? (
              <span className="text-slate-600">Cat's Game! Draw 🤝</span>
            ) : (
              <span className="flex items-center space-x-1.5 text-slate-700">
                <span>Player</span>
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md font-bold text-xs ${
                  activePlayer === 'X' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {activePlayer}
                </span>
                <span>'s Turn</span>
              </span>
            )}
          </div>
        </div>

        {/* Floating background highlight depending on active turn (only visible during active play) */}
        {!isGameOver && !isHistoryView && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100">
            <div
              className={`h-full transition-all duration-500 ease-out ${
                activePlayer === 'X' ? 'w-1/2 bg-indigo-500' : 'w-1/2 translate-x-full bg-emerald-500'
              }`}
            />
          </div>
        )}
      </div>

      {/* Grid Scoreboard Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Player X Stats */}
        <div className={`glassmorphic-card rounded-2xl p-3 text-center border transition-all duration-500 ${
          activePlayer === 'X' && !isGameOver && !isHistoryView
            ? 'border-indigo-200 bg-indigo-50/20 shadow-premium ring-2 ring-indigo-500/10'
            : 'border-white/80'
        }`}>
          <div className="flex justify-center mb-1">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-50 font-bold text-sm text-indigo-600">
              X
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Player X</div>
          <div className="text-2xl font-extrabold font-display text-slate-800 mt-0.5">{stats.xWins}</div>
        </div>

        {/* Tie Stats */}
        <div className="glassmorphic-card rounded-2xl p-3 text-center border border-white/80">
          <div className="flex justify-center mb-1">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 font-bold text-sm text-slate-500">
              =
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Draws</div>
          <div className="text-2xl font-extrabold font-display text-slate-800 mt-0.5">{stats.draws}</div>
        </div>

        {/* Player O Stats */}
        <div className={`glassmorphic-card rounded-2xl p-3 text-center border transition-all duration-500 ${
          activePlayer === 'O' && !isGameOver && !isHistoryView
            ? 'border-emerald-200 bg-emerald-50/20 shadow-premium ring-2 ring-emerald-500/10'
            : 'border-white/80'
        }`}>
          <div className="flex justify-center mb-1">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-50 font-bold text-sm text-emerald-600">
              O
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Player O</div>
          <div className="text-2xl font-extrabold font-display text-slate-800 mt-0.5">{stats.oWins}</div>
        </div>
      </div>
    </div>
  );
};
