import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (params: { type: 'custom' | 'all'; fromDate?: number; fromMonth?: number; fromYear?: number; toDate?: number; toMonth?: number; toYear?: number }) => void;
}

const tabs = ['Date Range', 'All Time'];

export default function DateRangeModal({ isOpen, onClose, onApply }: DateRangeModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Set default dates - from start of current month to today
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      setFromDate(startOfMonth.toISOString().split('T')[0]);
      setToDate(today.toISOString().split('T')[0]);
    }
  }, [isOpen]);

  const handleApply = () => {
    if (activeTab === 0) {
      // Date Range
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      
      onApply({
        type: 'custom',
        fromDate: fromDateObj.getDate(),
        fromMonth: fromDateObj.getMonth() + 1,
        fromYear: fromDateObj.getFullYear(),
        toDate: toDateObj.getDate(),
        toMonth: toDateObj.getMonth() + 1,
        toYear: toDateObj.getFullYear(),
      });
    } else {
      // All Time
      onApply({ type: 'all' });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-indigo-600" />
            Custom Analysis
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4 sm:mb-6">
            {tabs.map((tab, index) => {
              const active = activeTab === index;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 text-xs sm:text-sm font-medium rounded-lg py-2 transition-all duration-200 ${
                    active
                      ? "bg-white shadow text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Date Range Tab */}
          {activeTab === 0 && (
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="fromDate" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label htmlFor="toDate" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                />
              </div>
            </div>
          )}

          {/* All Time Tab */}
          {activeTab === 1 && (
            <div className="text-center py-6 sm:py-8">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                All Time Analysis
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                View analysis for all your transactions since you started using ExpenseTrace
              </p>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 border-t">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={activeTab === 0 && (!fromDate || !toDate)}
              className="flex-1 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}