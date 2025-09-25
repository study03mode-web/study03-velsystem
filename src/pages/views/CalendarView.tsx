import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMonthSummary } from '../../hooks/useSummary';
import { useFormatters } from '../../hooks/useFormatters';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarView() {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const { data: monthData, isLoading } = useMonthSummary(currentMonth, currentYear);
  const { formatCurrency } = useFormatters();

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month, 0).getDate();

  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month - 1, 1).getDay();

  const navigateToMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleDayClick = (day: number) => {
    navigate(`/views/day?day=${day}&month=${currentMonth}&year=${currentYear}`);
  };

  const getDayData = (day: number) =>
    monthData?.data?.find(item => item.day === day);

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = getDayData(day);
      const hasData = dayData && (dayData.expense > 0 || dayData.income > 0);
      const isToday =
        day === currentDate.getDate() &&
        currentMonth === currentDate.getMonth() + 1 &&
        currentYear === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          className={`rounded-xl border min-h-[60px] sm:min-h-[80px] p-2 sm:p-3 cursor-pointer transition hover:shadow-md ${
            isToday ? 'bg-indigo-50 border-indigo-300' : 'bg-white'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span
              className={`text-xs sm:text-sm font-medium ${
                isToday ? 'text-indigo-600' : 'text-gray-900'
              }`}
            >
              {day}
            </span>
            {isToday && (
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
            )}
          </div>

          {hasData && (
            <div className="space-y-1">
              {dayData.income > 0 && (
                <span className="block text-[10px] sm:text-xs font-medium text-green-600">
                  +{formatCurrency(dayData.income)}
                </span>
              )}
              {dayData.expense > 0 && (
                <span className="block text-[10px] sm:text-xs font-medium text-red-600">
                  -{formatCurrency(dayData.expense)}
                </span>
              )}
            </div>
          )}

          {/* Loading shimmer for cells without data */}
          {isLoading && (
            <div className="space-y-1 mt-2">
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Monthly overview of your finances
          </p>
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow p-2 mb-4">
        <button onClick={() => navigateToMonth('prev')} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>

        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          {MONTHS[currentMonth - 1]} {currentYear}
        </h2>

        <button onClick={() => navigateToMonth('next')} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-[10px] sm:text-xs font-medium text-gray-500">
        {WEEKDAYS.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">{renderCalendarDays()}</div>

      {/* Legend */}
      <div className="mt-4 bg-white rounded-xl shadow p-3 sm:p-4 flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded" />
          <span className="text-xs sm:text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded" />
          <span className="text-xs sm:text-sm text-gray-600">Expense</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-50 border border-indigo-300 rounded" />
          <span className="text-xs sm:text-sm text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;