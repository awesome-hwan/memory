import React, { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import Calendar from './components/Calendar';

const FOCUS_TIME = 3;
const BREAK_TIME = 5 * 60;

function App() {
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);

  // Load history from localStorage on initial render
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('pomodoroHistory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pomodoroHistory', JSON.stringify(history));
  }, [history]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  }, [mode]);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Time is up!
      if (mode === 'focus') {
        // Record completion
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        setHistory(prev => ({
          ...prev,
          [dateStr]: (prev[dateStr] || 0) + 1
        }));
      }

      // Switch mode
      const nextMode = mode === 'focus' ? 'break' : 'focus';
      setMode(nextMode);
      setTimeLeft(nextMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  // When mode changes manually, reset the timer
  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  return (
    <div className="flex flex-col items-center p-8 max-w-md w-full bg-pomodoro-surface/50 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-[rgba(255,255,255,0.05)]">
      <div className="mb-6 flex gap-4 bg-[rgba(0,0,0,0.2)] p-2 rounded-full">
        <button 
          onClick={() => setMode('focus')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${mode === 'focus' ? 'bg-pomodoro-focus text-pomodoro-surface shadow-md' : 'text-pomodoro-text opacity-50 hover:opacity-100'}`}
        >
          Focus
        </button>
        <button 
          onClick={() => setMode('break')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${mode === 'break' ? 'bg-pomodoro-break text-pomodoro-surface shadow-md' : 'text-pomodoro-text opacity-50 hover:opacity-100'}`}
        >
          Break
        </button>
      </div>

      <TimerDisplay timeLeft={timeLeft} mode={mode} />
      
      <Controls 
        isRunning={isRunning} 
        onToggle={toggleTimer} 
        onReset={resetTimer} 
      />

      <Calendar history={history} />
    </div>
  );
}

export default App;
