import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HabitCalendarProps {
  logs?: string[];
}

interface MonthStats {
  total: number;
  completed: number;
  percentage: number;
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ logs = [] }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const isCompletedDate = (day: number): boolean => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
    const paddedMonth = currentMonth.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    const dateString = `${currentYear}-${paddedMonth}-${paddedDay}`;
    
    return logs.includes(dateString);
  };

  const renderCalendarDays = (): React.ReactElement[] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: React.ReactElement[] = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 w-12"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCompleted = isCompletedDate(day);
      const isTodayDate = isToday(day);
      
      days.push(
        <div
          key={day}
          className={`
            h-12 w-12 rounded-lg flex items-center justify-center text-sm font-medium
            ${isCompleted 
              ? 'bg-gruvbox-green text-gruvbox-dark' 
              : 'bg-gruvbox-blue text-gruvbox-dark'
            }
            ${isTodayDate 
              ? 'ring-3 ring-gruvbox-orange ring-offset-2' 
              : ''
            }
          `}
        >
        <span className="font-semibold">{day}</span>  
        </div>
      );
    }

    return days;
  };

  const getMonthStats = (): MonthStats => {
    const daysInMonth = getDaysInMonth(currentDate);
    const completedDays: number[] = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      if (isCompletedDate(day)) {
        completedDays.push(day);
      }
    }
    
    return {
      total: daysInMonth,
      completed: completedDays.length,
      percentage: Math.round((completedDays.length / daysInMonth) * 100)
    };
  };

  const stats = getMonthStats();

  return (
    <div className="max-w-md mx-auto p-6 bg-gruvbox-mid-l rounded-xl shadow-lg px-2">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gruvbox-dark cursor-pointer rounded-lg"
          type="button"
        >
          <ChevronLeft size={20} className="text-gruvbox-light" />
        </button>
        
        <h2 className="text-xl font-semibold text-gruvbox-light">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gruvbox-dark cursor-pointer rounded-lg"
          type="button"
        >
          <ChevronRight size={20} className="text-gruvbox-light" />
        </button>
      </div>

      <div className="mb-4 p-3 bg-gruvbox-mid-d rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gruvbox-light">
            <span className="font-medium">{stats.completed}</span> of <span className="font-medium">{stats.total}</span> days completed
          </div>
          <div className="text-lg font-bold text-gruvbox-green">
            {stats.percentage}%
          </div>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gruvbox-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${stats.percentage}%` }}
          ></div>
        </div>
      </div>


      <div className="flex justify-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gruvbox-green rounded"></div>
          <span className="text-gruvbox-light">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gruvbox-blue rounded"></div>
          <span className="text-gruvbox-light">Not Done</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded ring-3 ring-gruvbox-orange"></div>
          <span className="text-gruvbox-light">Today</span>
        </div>
      </div>


      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day: string) => (
          <div key={day} className="h-10 flex items-center justify-center">
            <span className="text-xs font-medium text-gruvbox-yellow uppercase">
              {day}
            </span>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-7 gap-2 mb-4">
        {renderCalendarDays()}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setCurrentDate(new Date())}
          className="flex-1 px-3 py-2 text-sm font-medium text-gruvbox-dark bg-gruvbox-purple cursor-pointer rounded-lg"
          type="button"
        >
          Current Month
        </button>
      </div>
    </div>
  );
};

export default HabitCalendar;