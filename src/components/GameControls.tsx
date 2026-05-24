import React from 'react';
import { RotateCcw, BarChart3 } from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
  onOpenStats: () => void;
  hasMoves: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onOpenStats,
  hasMoves,
}) => {
  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-center gap-4 animate-fade-in">
      {/* Reset/Restart Game Button */}
      <button
        onClick={onReset}
        disabled={!hasMoves}
        className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl font-display font-medium text-sm transition-all duration-300 outline-none select-none ${
          hasMoves
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        <RotateCcw size={16} className={hasMoves ? "animate-spin-slow" : ""} />
        <span>Restart Game</span>
      </button>

      {/* Stats Button */}
      <button
        onClick={onOpenStats}
        className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl font-display font-medium text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 outline-none select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
      >
        <BarChart3 size={16} />
        <span>View Stats</span>
      </button>
    </div>
  );
};
