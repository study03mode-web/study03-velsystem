import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
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

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

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

  const getDayData = (day: number) => {
    return monthData?.data?.find(item => item.day === day);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-16 sm:h-20 lg:h-24 border border-gray-200"></div>
      );
    }

    // Days of the month
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
          className={`h-16 sm:h-20 lg:h-24 border border-gray-200 p-1 sm:p-2 cursor-pointer hover:bg-gray-50 transition-colors ${isToday ? 'bg-indigo-50 border-indigo-300' : ''
            }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs sm:text-sm font-medium ${isToday ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                {day}
              </span>
              {isToday && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-600 rounded-full"></div>
              )}
            </div>

            {hasData && (
              <div className="flex-1 space-y-0.5 sm:space-y-1">
                {dayData.income > 0 && (
                  <div className="bg-green-600 rounded-sm text-xs md:p-1">
                    <span className="text-black-600 font-medium truncate">
                      {formatCurrency(dayData.income)}
                    </span>
                  </div>
                )}
                {dayData.expense > 0 && (
                  <div className="bg-red-600 rounded-sm text-xs md:p-1">
                    <span className="text-black-600 font-medium truncate">
                      {formatCurrency(dayData.expense)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  if (isLoading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="h-16 sm:h-20 lg:h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Calendar View</h1>
              <p className="text-sm sm:text-base text-gray-600">Monthly overview of your financial activities</p>
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 sm:p-6">
          <button
            onClick={() => navigateToMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
            {MONTHS[currentMonth - 1]} {currentYear}
          </h2>

          <button
            onClick={() => navigateToMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-gray-50">
          {WEEKDAYS.map((day) => (
            <div key={day} className="p-2 sm:p-3 lg:p-4 text-center">
              <span className="text-xs sm:text-sm font-medium text-gray-700">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 sm:mt-6 bg-white rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Legend</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            {/* <TrendingUp className="w-4 h-4 text-green-600" /> */}
            <div className="w-4 h-4 bg-green-600 border border-indigo-300 rounded"></div>
            <span className="text-sm text-gray-600">Income</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* <TrendingDown className="w-4 h-4 text-red-600" /> */}
            <div className="w-4 h-4 bg-red-600 border border-indigo-300 rounded"></div>
            <span className="text-sm text-gray-600">Expense</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-indigo-50 border border-indigo-300 rounded"></div>
            <span className="text-sm text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;