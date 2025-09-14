import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  minDate?: string;
  maxDate?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  required = false,
  className = '',
  minDate,
  maxDate
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [selectedDate]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    if (!isDateDisabled(newDate)) {
      // Format as YYYY-MM-DD to ensure consistent date handling
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const dayStr = String(newDate.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${dayStr}`);
      setIsOpen(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate && 
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;
      const isToday = 
        new Date().getDate() === day &&
        new Date().getMonth() === currentMonth &&
        new Date().getFullYear() === currentYear;
      const disabled = isDateDisabled(date);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={disabled}
          className={`h-8 w-8 text-sm rounded-md transition-colors ${
            isSelected
              ? 'bg-indigo-600 text-white'
              : isToday
              ? 'bg-indigo-100 text-indigo-600'
              : disabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const formatDisplayDate = () => {
    if (!selectedDate) return placeholder;
    return selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-left flex items-center justify-between text-sm sm:text-base"
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
          {formatDisplayDate()}
        </span>
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3 sm:p-4 w-full min-w-[280px] sm:min-w-[320px] max-w-[400px]">
          {/* Month/Year Navigation */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              type="button"
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {MONTHS[currentMonth]} {currentYear}
            </h3>
            
            <button
              type="button"
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="h-6 sm:h-8 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-500">{day.slice(0, 2)}</span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {renderCalendarDays()}
          </div>

          {/* Footer */}
          <div className="flex justify-end mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}