import { useState, useEffect, useRef } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function TimePicker({
  value,
  onChange,
  label,
  placeholder = 'Select time',
  required = false,
  className = ''
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: settings } = useSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parse current time value
  const [hours, minutes] = value ? value.split(':').map(Number) : [new Date().getHours(), new Date().getMinutes()];
  
  const [selectedHour, setSelectedHour] = useState(hours);
  const [selectedMinute, setSelectedMinute] = useState(minutes);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(hours >= 12 ? 'PM' : 'AM');

  const is24Hour = settings?.timeFormat === 2;

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':').map(Number);
      setSelectedHour(h);
      setSelectedMinute(m);
      setSelectedPeriod(h >= 12 ? 'PM' : 'AM');
    }
  }, [value]);

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

  const formatDisplayTime = () => {
    if (!value) return placeholder;
    
    if (is24Hour) {
      return `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    } else {
      const displayHour = selectedHour === 0 ? 12 : selectedHour > 12 ? selectedHour - 12 : selectedHour;
      return `${displayHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
    }
  };

  const handleTimeChange = () => {
    let finalHour = selectedHour;
    
    if (!is24Hour) {
      if (selectedPeriod === 'PM' && selectedHour !== 12) {
        finalHour = selectedHour + 12;
      } else if (selectedPeriod === 'AM' && selectedHour === 12) {
        finalHour = 0;
      }
    }
    
    const timeString = `${finalHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    onChange(timeString);
    setIsOpen(false);
  };

  const adjustValue = (type: 'hour' | 'minute', direction: 'up' | 'down') => {
    if (type === 'hour') {
      let newHour = selectedHour;
      if (direction === 'up') {
        newHour = is24Hour ? (selectedHour + 1) % 24 : selectedHour === 12 ? 1 : selectedHour + 1;
        if (!is24Hour && newHour > 12) newHour = 1;
      } else {
        newHour = is24Hour ? (selectedHour - 1 + 24) % 24 : selectedHour === 1 ? 12 : selectedHour - 1;
        if (!is24Hour && newHour < 1) newHour = 12;
      }
      setSelectedHour(newHour);
    } else {
      const newMinute = direction === 'up' ? (selectedMinute + 1) % 60 : (selectedMinute - 1 + 60) % 60;
      setSelectedMinute(newMinute);
    }
  };

  const generateHours = () => {
    if (is24Hour) {
      return Array.from({ length: 24 }, (_, i) => i);
    } else {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }
  };

  const generateMinutes = () => {
    return Array.from({ length: 60 }, (_, i) => i);
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
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {formatDisplayTime()}
        </span>
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3 sm:p-4 w-full min-w-[260px] sm:min-w-[280px] max-w-[320px]">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            {/* Hour Selector */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => adjustValue('hour', 'up')}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
              
              <div className="w-12 sm:w-16 h-24 sm:h-32 overflow-y-auto border border-gray-200 rounded-md">
                {generateHours().map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => setSelectedHour(hour)}
                    className={`w-full py-0.5 sm:py-1 text-xs sm:text-sm transition-colors ${
                      selectedHour === hour
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {is24Hour ? hour.toString().padStart(2, '0') : hour}
                  </button>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => adjustValue('hour', 'down')}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
            </div>

            <div className="text-lg sm:text-2xl font-bold text-gray-400">:</div>

            {/* Minute Selector */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => adjustValue('minute', 'up')}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
              
              <div className="w-12 sm:w-16 h-24 sm:h-32 overflow-y-auto border border-gray-200 rounded-md">
                {generateMinutes().map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    onClick={() => setSelectedMinute(minute)}
                    className={`w-full py-0.5 sm:py-1 text-xs sm:text-sm transition-colors ${
                      selectedMinute === minute
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {minute.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => adjustValue('minute', 'down')}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
            </div>

            {/* AM/PM Selector for 12-hour format */}
            {!is24Hour && (
              <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedPeriod('AM')}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors ${
                    selectedPeriod === 'AM'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPeriod('PM')}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors ${
                    selectedPeriod === 'PM'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  PM
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleTimeChange}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Set Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
}