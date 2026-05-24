import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { GameHistoryEntry } from '../types';

interface HistoryPanelProps {
  history: GameHistoryEntry[];
  currentStep: number;
  onJumpToStep: (step: number) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  currentStep,
  onJumpToStep,
}) => {
  const totalMoves = history.length - 1;

  if (totalMoves < 1) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-4 px-6 border border-dashed border-slate-200 rounded-2xl animate-fade-in bg-white/30">
        <p className="text-xs text-slate-400 font-medium">Make a move to start tracking game history</p>
      </div>
    );
  }

  // Helper to map index (0-8) to grid coordinates (row, col) for clear reading
  const getMoveCoordinates = (index: number | null) => {
    if (index === null) return 'Start';
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    return `Row ${row}, Col ${col}`;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-fade-in glassmorphic-card rounded-2xl p-4 border border-white/80 shadow-premium">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">
          Move Explorer
        </h3>
        <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
          Step {currentStep} of {totalMoves}
        </span>
      </div>

      {/* Button Controls for Stepping */}
      <div className="flex items-center justify-between gap-1">
        <button
          onClick={() => onJumpToStep(0)}
          disabled={currentStep === 0}
          className="p-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Jump to Start"
        >
          <ChevronsLeft size={16} />
        </button>

        <button
          onClick={() => onJumpToStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="p-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center space-x-1"
          title="Previous Move"
        >
          <ChevronLeft size={16} />
          <span className="text-xs font-semibold pr-1">Undo</span>
        </button>

        <span className="text-xs font-medium text-slate-500 font-display select-none">
          {currentStep === 0 ? (
            'Game Start'
          ) : (
            <span className="font-semibold text-slate-700">
              Player {history[currentStep].player} at {getMoveCoordinates(history[currentStep].lastMove)}
            </span>
          )}
        </span>

        <button
          onClick={() => onJumpToStep(currentStep + 1)}
          disabled={currentStep === totalMoves}
          className="p-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center space-x-1"
          title="Next Move"
        >
          <span className="text-xs font-semibold pl-1">Redo</span>
          <ChevronRight size={16} />
        </button>

        <button
          onClick={() => onJumpToStep(totalMoves)}
          disabled={currentStep === totalMoves}
          className="p-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Jump to Current"
        >
          <ChevronsRight size={16} />
        </button>
      </div>

      {/* Horizontal Steps Timeline scrollbar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar mask-grad">
        {history.map((entry, index) => {
          const isSelected = index === currentStep;
          const isStart = index === 0;

          return (
            <button
              key={index}
              onClick={() => onJumpToStep(index)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-xl font-display text-xs border font-semibold transition-all relative ${
                isSelected
                  ? isStart
                    ? 'bg-slate-700 border-slate-700 text-white scale-110 shadow-md'
                    : entry.player === 'X'
                    ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-md shadow-indigo-100'
                    : 'bg-emerald-600 border-emerald-600 text-white scale-110 shadow-md shadow-emerald-100'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              <span>{isStart ? '●' : index}</span>
              {index > 0 && !isSelected && (
                <span className={`absolute bottom-0.5 text-[8px] font-extrabold ${
                  entry.player === 'X' ? 'text-indigo-400' : 'text-emerald-400'
                }`}>
                  {entry.player}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
