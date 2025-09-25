import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface YearPickerProps {
  year: number;
  onYearChange: (year: number) => void;
  label?: string;
  required?: boolean;
  className?: string;
  minYear?: number;
  maxYear?: number;
}

export default function YearPicker({
  year,
  onYearChange,
  label,
  required = false,
  className = '',
  minYear = 2010,
  maxYear = 2050
}: YearPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayStartYear, setDisplayStartYear] = useState(year - (year % 12));
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleYearSelect = (selectedYear: number) => {
    onYearChange(selectedYear);
    setIsOpen(false);
  };

  const navigateYearRange = (direction: 'prev' | 'next') => {
    const newStartYear = direction === 'prev' ? displayStartYear - 12 : displayStartYear + 12;
    if (newStartYear >= minYear && newStartYear <= maxYear) {
      setDisplayStartYear(newStartYear);
    }
  };

  const generateCurrentYearRange = () => {
    const years = [];
    const endYear = Math.min(displayStartYear + 11, maxYear);
    for (let y = Math.max(displayStartYear, minYear); y <= endYear; y++) {
      years.push(y);
    }
    return years;
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
        <span className="text-gray-900">
          {year}
        </span>
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3 sm:p-4 w-full min-w-[260px] sm:min-w-[280px] max-w-[320px]">
          {/* Year View Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              type="button"
              onClick={() => navigateYearRange('prev')}
              disabled={displayStartYear <= minYear}
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {displayStartYear} - {Math.min(displayStartYear + 11, maxYear)}
            </h3>
            
            <button
              type="button"
              onClick={() => navigateYearRange('next')}
              disabled={displayStartYear + 11 >= maxYear}
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>

          {/* Years Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {generateCurrentYearRange().map((yearOption) => (
              <button
                key={yearOption}
                type="button"
                onClick={() => handleYearSelect(yearOption)}
                className={`p-1.5 sm:p-2 text-xs sm:text-sm rounded-md transition-colors ${
                  year === yearOption
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {yearOption}
              </button>
            ))}
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