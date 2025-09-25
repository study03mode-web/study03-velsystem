import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface DebtRecordTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  debtId: string;
}

export default function DebtRecordTypeModal({ isOpen, onClose, debtId }: DebtRecordTypeModalProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'1' | '2' | null>(null);

  const handleConfirm = () => {
    if (selected) {
      navigate(`/debts/${debtId}/records/add`, { state: { recordType: selected } });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add Record</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          <p className="text-sm text-gray-600">Select what you want to track:</p>

          <div className="space-y-3">
            <button
              onClick={() => setSelected('1')}
              className={`w-full p-3 border rounded-lg text-left flex items-center gap-3 transition-all ${
                selected === '1'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Money Paid</h3>
                <p className="text-xs text-gray-600">Record money you have paid to someone</p>
              </div>
            </button>

            <button
              onClick={() => setSelected('2')}
              className={`w-full p-3 border rounded-lg text-left flex items-center gap-3 transition-all ${
                selected === '2'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <div className="bg-red-100 p-2 rounded-full">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Money Received</h3>
                <p className="text-xs text-gray-600">Record money you have received from someone</p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}