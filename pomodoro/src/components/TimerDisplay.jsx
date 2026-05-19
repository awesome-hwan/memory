import React from 'react';

const TimerDisplay = ({ timeLeft, mode }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  const isFocus = mode === 'focus';
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div 
        className={`text-2xl font-bold mb-4 px-6 py-2 rounded-full shadow-lg ${
          isFocus ? 'bg-pomodoro-focus text-pomodoro-surface' : 'bg-pomodoro-break text-pomodoro-surface'
        }`}
      >
        {isFocus ? '🧠 Focus Time' : '☕ Break Time'}
      </div>
      <div 
        className="text-[120px] font-extrabold leading-none tracking-tight tabular-nums animate-float"
        style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
      >
        {displayMinutes}:{displaySeconds}
      </div>
    </div>
  );
};

export default TimerDisplay;
