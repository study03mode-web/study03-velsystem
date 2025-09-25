import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (params: { type: 4 | "all"; from?: string; to?: string }) => void;
  isPending?: boolean;
}

const tabs = ["Date Range", "All Time"];

export default function DateRangeModal({
  isOpen,
  onClose,
  onApply,
  isPending = false,
}: DateRangeModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      setFromDate(startOfMonth.toISOString().split("T")[0]);
      setToDate(today.toISOString().split("T")[0]);
    }
  }, [isOpen]);

  const handleApply = () => {
    if (activeTab === 0) {
      onApply({
        type: 4,
        from: fromDate,
        to: toDate,
      });
    } else {
      onApply({ type: "all" });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            Custom Analysis
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-full p-1">
            {tabs.map((tab, index) => {
              const active = activeTab === index;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 text-sm font-medium rounded-full py-2 transition-all ${
                    active
                      ? "bg-white shadow text-gray-900"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Date Range */}
          {activeTab === 0 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fromDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  From Date
                </label>
                <input
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="toDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  To Date
                </label>
                <input
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>
          )}

          {/* All Time */}
          {activeTab === 1 && (
            <div className="text-center py-6">
              <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-medium text-gray-900 mb-1">
                All Time Analysis
              </h3>
              <p className="text-sm text-gray-500">
                View analysis for all your transactions since you started using
                ExpenseTrace.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={
              isPending ||
              (activeTab === 0 &&
                (!fromDate || !toDate || new Date(fromDate) > new Date(toDate)))
            }
            className="flex-1 px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}