import { useEffect, useState } from 'react';
import { X, Bell } from 'lucide-react';
import { EARLY_REMINDER_OPTIONS } from '../types/scheduledTransaction';

interface EarlyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReminder: number;
  onUpdate: (reminder: number) => void;
  isPending?: boolean;
}

export default function EarlyReminderModal({
  isOpen,
  onClose,
  currentReminder,
  onUpdate,
  isPending = false,
}: EarlyReminderModalProps) {
  const [selectedReminder, setSelectedReminder] = useState(currentReminder);

  useEffect(() => {
    if (isOpen) setSelectedReminder(currentReminder);
  }, [isOpen, currentReminder]);

  const handleUpdate = () => {
    if (selectedReminder !== currentReminder) {
      onUpdate(selectedReminder);
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
            <Bell className="w-5 h-5 text-indigo-600" />
            Early Reminder
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
            Get reminded before the transaction is due:
          </p>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {EARLY_REMINDER_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSelectedReminder(value)}
                className={`w-full p-3 text-left border rounded-lg transition-colors text-sm ${
                  selectedReminder === value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{label}</span>
                  {selectedReminder === value && (
                    <span className="text-indigo-600 text-xs font-medium">
                      Selected
                    </span>
                  )}
                </div>
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
            disabled={isPending || selectedReminder === currentReminder}
            className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}