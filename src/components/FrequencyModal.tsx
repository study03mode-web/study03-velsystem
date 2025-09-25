import { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import {
  FREQUENCY_OPTIONS,
  FrequencyType,
  END_TYPE_OPTIONS,
  EndType,
} from '../types/scheduledTransaction';

interface FrequencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFrequency: FrequencyType;
  currentEndType: EndType;
  currentInterval: number;
  currentOccurrence: number;
  onUpdate: (
    frequency: FrequencyType,
    endType: EndType,
    interval: number,
    occurrence: number
  ) => void;
  isPending?: boolean;
}

export default function FrequencyModal({
  isOpen,
  onClose,
  currentFrequency,
  currentEndType,
  currentInterval,
  currentOccurrence,
  onUpdate,
  isPending = false,
}: FrequencyModalProps) {
  const [selectedFrequency, setSelectedFrequency] =
    useState<FrequencyType>(currentFrequency);
  const [selectedEndType, setSelectedEndType] =
    useState<EndType>(currentEndType);
  const [selectedInterval, setSelectedInterval] = useState(currentInterval);
  const [selectedOccurrence, setSelectedOccurrence] =
    useState(currentOccurrence);

  const handleUpdate = () => {
    onUpdate(
      selectedFrequency,
      selectedEndType,
      selectedInterval,
      selectedOccurrence
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-indigo-600" />
            Frequency
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 overflow-y-auto">
          <p className="text-sm text-gray-600">
            Choose how often this transaction should repeat:
          </p>

          {/* Frequency Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Frequency</h3>
            <div className="space-y-2">
              {Object.entries(FREQUENCY_OPTIONS).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setSelectedFrequency(value as FrequencyType)}
                  className={`w-full p-3 text-left border rounded-lg transition-colors text-sm ${
                    selectedFrequency === value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{label}</span>
                    {selectedFrequency === value && (
                      <span className="text-indigo-600 text-xs font-medium">
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interval */}
          {selectedFrequency !== 'NONE' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Repeat Interval
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={selectedInterval}
                  onChange={(e) =>
                    setSelectedInterval(parseInt(e.target.value) || 1)
                  }
                  className="w-20 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-sm text-gray-600">
                  {selectedFrequency === 'DAILY'
                    ? 'day(s)'
                    : selectedFrequency === 'WEEKLY'
                    ? 'week(s)'
                    : selectedFrequency === 'MONTHLY'
                    ? 'month(s)'
                    : selectedFrequency === 'YEARLY'
                    ? 'year(s)'
                    : ''}
                </span>
              </div>
            </div>
          )}

          {/* End Type */}
          {selectedFrequency !== 'NONE' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Ends</h3>
              <div className="space-y-2">
                {Object.entries(END_TYPE_OPTIONS).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setSelectedEndType(value as EndType)}
                    className={`w-full p-3 text-left border rounded-lg transition-colors text-sm ${
                      selectedEndType === value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{label}</span>
                      {selectedEndType === value && (
                        <span className="text-indigo-600 text-xs font-medium">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Occurrence Count */}
          {selectedEndType === 'OCCURRENCE' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Number of Occurrences
              </h3>
              <input
                type="number"
                min="1"
                value={selectedOccurrence}
                onChange={(e) =>
                  setSelectedOccurrence(parseInt(e.target.value) || 1)
                }
                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter number of times to repeat"
              />
            </div>
          )}
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
            disabled={isPending}
            className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}