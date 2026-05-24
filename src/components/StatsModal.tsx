import React from 'react';
import { X as CloseIcon, Trophy, Percent, Flame, Sparkles } from 'lucide-react';
import type { GameStats } from '../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  onResetStats: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onResetStats,
}) => {
  if (!isOpen) return null;

  const total = stats.gamesPlayed || 1;
  const xRatio = Math.round((stats.xWins / total) * 100);
  const oRatio = Math.round((stats.oWins / total) * 100);
  const drawRatio = Math.round((stats.draws / total) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white/95 border border-slate-100 rounded-3xl p-6 shadow-2xl z-10 animate-scale-in glassmorphic">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <CloseIcon size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2.5 mb-5 border-b border-slate-100 pb-3">
          <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Trophy size={20} className="animate-float-slow" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-slate-800">Match Stats</h2>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Historical Performance</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Total games */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Games</span>
              <div className="text-2xl font-extrabold text-slate-800 mt-1">{stats.gamesPlayed}</div>
            </div>

            {/* Current streak */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center">
              <div className="flex items-center space-x-1">
                <Flame size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Streak</span>
              </div>
              <div className="text-xl font-extrabold text-slate-800 mt-1">
                {stats.currentStreak > 0 ? (
                  <span className="flex items-center space-x-1 justify-center">
                    <span>{stats.currentStreak}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-black leading-none ${
                      stats.streakWinner === 'X' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {stats.streakWinner}
                    </span>
                  </span>
                ) : (
                  '0'
                )}
              </div>
            </div>
          </div>

          {/* Ratios & Progress bars */}
          <div className="space-y-3 bg-slate-50/60 border border-slate-100/50 rounded-2xl p-4">
            <h4 className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <Percent size={12} />
              <span>Win Ratios</span>
            </h4>

            {/* X ratio */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Player X ({stats.xWins} wins)</span>
                <span>{stats.gamesPlayed > 0 ? xRatio : 0}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-x rounded-full transition-all duration-700"
                  style={{ width: `${stats.gamesPlayed > 0 ? xRatio : 0}%` }}
                />
              </div>
            </div>

            {/* O ratio */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Player O ({stats.oWins} wins)</span>
                <span>{stats.gamesPlayed > 0 ? oRatio : 0}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-o rounded-full transition-all duration-700"
                  style={{ width: `${stats.gamesPlayed > 0 ? oRatio : 0}%` }}
                />
              </div>
            </div>

            {/* Draw ratio */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Draws ({stats.draws} ties)</span>
                <span>{stats.gamesPlayed > 0 ? drawRatio : 0}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full transition-all duration-700"
                  style={{ width: `${stats.gamesPlayed > 0 ? drawRatio : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onResetStats}
            className="text-xs font-semibold text-slate-400 hover:text-rose-500 hover:underline transition-colors"
          >
            Reset Metrics
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-900 text-white font-display font-medium text-xs px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 shadow-md"
          >
            <Sparkles size={12} />
            <span>Close View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
