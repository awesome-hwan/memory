import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ history }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Format date to YYYY-MM-DD
  const formatDate = (y, m, d) => {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  const days = [];
  // Empty slots before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDate(year, month, d);
    const completions = history[dateStr] || 0;
    
    let bgColor = 'bg-[rgba(255,255,255,0.05)]';
    if (completions > 0) {
      // Different shades of hot pink based on completion count
      if (completions === 1) bgColor = 'bg-[#ffb6c1] text-[#1e1e2e]'; // light pink
      else if (completions === 2) bgColor = 'bg-[#ff69b4] text-[#1e1e2e] font-bold'; // hot pink
      else bgColor = 'bg-[#ff1493] text-white font-extrabold'; // deep pink
    }

    const isToday = isCurrentMonth && d === today.getDate();

    days.push(
      <div 
        key={d} 
        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all duration-300 hover:scale-125 cursor-default
          ${bgColor} ${isToday ? 'ring-2 ring-white' : ''}
        `}
        title={`${dateStr}: ${completions} sessions`}
      >
        {completions >= 4 ? '🔥' : d}
      </div>
    );
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)] w-full">
      <div className="flex justify-between items-center mb-4 px-2">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="font-bold text-lg text-pomodoro-focus">
          {year}. {String(month + 1).padStart(2, '0')}
        </div>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs opacity-50 font-bold">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
};

export default Calendar;
