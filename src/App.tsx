import { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { GameControls } from './components/GameControls';

import { StatsModal } from './components/StatsModal';
import { ParticleCanvas } from './components/ParticleCanvas';
import { checkWinner } from './utils/gameEngine';
import type { GameHistoryEntry, GameStats, Player } from './types';
import { Gamepad2 } from 'lucide-react';

const LOCAL_STORAGE_STATS_KEY = 'tictactoe_premium_stats';

const DEFAULT_STATS: GameStats = {
  xWins: 0,
  oWins: 0,
  draws: 0,
  gamesPlayed: 0,
  currentStreak: 0,
  streakWinner: null,
};

function App() {
  // Move History state (step 0 is the empty board)
  const [history, setHistory] = useState<GameHistoryEntry[]>([
    {
      board: Array(9).fill(null),
      lastMove: null,
      player: 'O', // Dummy placeholder: next will be 'X'
    },
  ]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Track stats
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  
  // Avoid duplicate stat tallying for the active match
  const [gameEvaluated, setGameEvaluated] = useState<boolean>(false);

  // Load stats from localStorage on mount
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem(LOCAL_STORAGE_STATS_KEY);
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (e) {
      console.error('Failed to load stats from localStorage:', e);
    }
  }, []);

  // Sync stats to localStorage when changed
  const saveStats = (newStats: GameStats) => {
    setStats(newStats);
    try {
      localStorage.setItem(LOCAL_STORAGE_STATS_KEY, JSON.stringify(newStats));
    } catch (e) {
      console.error('Failed to save stats to localStorage:', e);
    }
  };

  // Get current active board and outcomes
  const currentEntry = history[currentStep];
  const { winner, winningCombo, isDraw } = checkWinner(currentEntry.board);
  const isGameOver = !!winner || isDraw;
  
  // In our pass-and-play, X always goes first. Even steps = X's turn, Odd steps = O's turn
  const nextPlayer: Player = currentStep % 2 === 0 ? 'X' : 'O';

  // Evaluate outcomes and update statistics
  useEffect(() => {
    if (isGameOver && !gameEvaluated && currentStep === history.length - 1) {
      setGameEvaluated(true);
      
      const newStats = { ...stats };
      newStats.gamesPlayed += 1;

      if (winner) {
        if (winner === 'X') {
          newStats.xWins += 1;
        } else {
          newStats.oWins += 1;
        }

        // Streak updates
        if (newStats.streakWinner === winner) {
          newStats.currentStreak += 1;
        } else {
          newStats.currentStreak = 1;
          newStats.streakWinner = winner;
        }
      } else if (isDraw) {
        newStats.draws += 1;
        // Streak breaks on draw
        newStats.currentStreak = 0;
        newStats.streakWinner = null;
      }

      saveStats(newStats);
    }
  }, [isGameOver, winner, isDraw, gameEvaluated, currentStep, history.length, stats]);

  const handleSquareClick = (index: number) => {
    // Prevent moves if cell is taken, game is over, or viewing history
    if (currentEntry.board[index] || isGameOver || currentStep < history.length - 1) {
      return;
    }

    // Clone and update board
    const newBoard = [...currentEntry.board];
    newBoard[index] = nextPlayer;

    const newHistory = [
      ...history.slice(0, currentStep + 1),
      {
        board: newBoard,
        lastMove: index,
        player: nextPlayer,
      },
    ];

    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const handleResetGame = () => {
    setHistory([
      {
        board: Array(9).fill(null),
        lastMove: null,
        player: 'O',
      },
    ]);
    setCurrentStep(0);
    setGameEvaluated(false);
  };

  const handleResetStats = () => {
    saveStats(DEFAULT_STATS);
  };

  const isHistoryView = currentStep < history.length - 1;
  const celebrationType = winner ? 'win' : isDraw ? 'draw' : null;

  return (
    <div className="min-h-screen flex flex-col justify-between py-6 px-4 relative overflow-hidden bg-slate-50">
      {/* Background gradients for premium aesthetic */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />

      {/* Confetti Particles on game completion */}
      <ParticleCanvas active={isGameOver && currentStep === history.length - 1} type={celebrationType} />

      {/* Modern Premium Header */}
      <header className="w-full max-w-md mx-auto text-center space-y-2 animate-fade-in z-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200/60 border border-slate-300/40 text-[10px] uppercase font-bold tracking-wider text-slate-500">
          <Gamepad2 size={12} className="text-slate-500" />
          <span>Local Pass-and-Play</span>
        </div>
        <h1 className="text-3xl font-extrabold font-display tracking-tight text-slate-800 flex items-center justify-center space-x-2">
          <span>Tic-Tac-Toe</span>
          <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg text-xs font-black select-none border border-indigo-100">
            PRO
          </span>
        </h1>
        <p className="text-xs text-slate-400 font-medium">An ultra-premium, interactive classic experience</p>
      </header>

      {/* Main Game Interface Container */}
      <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center gap-6 my-6 z-10">
        {/* Turn & Tally Dashboards */}
        <ScoreBoard
          stats={stats}
          activePlayer={nextPlayer}
          winner={winner}
          isDraw={isDraw}
          isHistoryView={isHistoryView}
        />

        {/* Board Panel */}
        <div className="animate-scale-in">
          <Board
            board={currentEntry.board}
            onSquareClick={handleSquareClick}
            winningCombo={winningCombo}
            winner={winner}
            isDraw={isDraw}
            nextPlayer={nextPlayer}
            isHistoryView={isHistoryView}
          />
        </div>

        {/* Action Controls */}
        <GameControls
          onReset={handleResetGame}
          onOpenStats={() => setIsStatsOpen(true)}
          hasMoves={history.length > 1}
        />


      </main>

      {/* Performance Stats Overlay Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        onResetStats={handleResetStats}
      />
    </div>
  );
}

export default App;
