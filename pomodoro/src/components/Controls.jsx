import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Controls = ({ isRunning, onToggle, onReset }) => {
  return (
    <div className="flex gap-6 mt-8">
      <button
        onClick={onToggle}
        className={`jelly-btn flex items-center gap-2 px-8 py-4 rounded-3xl font-bold text-xl shadow-xl text-pomodoro-surface ${
          isRunning ? 'bg-[#ff9e9e]' : 'bg-[#a3e635]'
        }`}
      >
        {isRunning ? (
          <>
            <Pause size={28} /> Pause
          </>
        ) : (
          <>
            <Play size={28} /> Start
          </>
        )}
      </button>

      <button
        onClick={onReset}
        className="jelly-btn flex items-center justify-center p-4 rounded-3xl bg-pomodoro-surface text-pomodoro-text border-2 border-[rgba(255,255,255,0.1)] hover:bg-[#3b3b4f] shadow-lg"
        title="Reset Timer"
      >
        <RotateCcw size={28} />
      </button>
    </div>
  );
};

export default Controls;
