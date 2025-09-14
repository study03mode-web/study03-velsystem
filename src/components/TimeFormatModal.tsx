import { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { TIME_FORMATS } from '../types/settings';

interface TimeFormatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFormat: number;
  onUpdate: (formatCode: number) => Promise<void>;
  isPending?: boolean;
}

export default function TimeFormatModal({ 
  isOpen, 
  onClose, 
  currentFormat,
  onUpdate,
  isPending = false
}: TimeFormatModalProps) {
  const [selectedFormat, setSelectedFormat] = useState(currentFormat);

  useEffect(() => {
    if (isOpen) setSelectedFormat(currentFormat);
  }, [isOpen, currentFormat]);

  const handleUpdate = async () => {
    if (selectedFormat !== currentFormat) {
      await onUpdate(selectedFormat);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Time Format
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 overflow-y-auto">
          <p className="text-sm text-gray-600">
            Choose your preferred time format:
          </p>

          <div className="space-y-2">
            {Object.entries(TIME_FORMATS).map(([code, label]) => (
              <button
                key={code}
                onClick={() => setSelectedFormat(Number(code))}
                className={`w-full p-3 text-left border rounded-lg transition-colors text-sm ${
                  selectedFormat === Number(code)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{label}</span>
                  {selectedFormat === Number(code) && (
                    <span className="text-indigo-600 text-xs font-medium">Selected</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Example: {Number(code) === 1 ? '2:30 PM' : '14:30'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isPending || selectedFormat === currentFormat}
            className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}