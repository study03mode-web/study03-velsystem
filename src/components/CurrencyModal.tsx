import { useState, useEffect } from 'react';
import { X, Search, Globe } from 'lucide-react';
import { CURRENCIES } from '../types/settings';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: string;
  onUpdate: (currencyCode: string) => Promise<void>;
  isPending?: boolean;
}

export default function CurrencyModal({
  isOpen,
  onClose,
  currentCurrency,
  onUpdate,
  isPending = false
}: CurrencyModalProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(currentCurrency);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedCurrency(currentCurrency);
      setSearchTerm('');
    }
  }, [isOpen, currentCurrency]);

  const filteredCurrencies = CURRENCIES.filter(currency =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = async () => {
    if (selectedCurrency !== currentCurrency) {
      await onUpdate(selectedCurrency);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            Currency
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Currency List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredCurrencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => setSelectedCurrency(currency.code)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-colors ${
                selectedCurrency === currency.code
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{currency.flag}</span>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{currency.name}</p>
                  <p className="text-xs text-gray-500">
                    {currency.country} • {currency.symbol}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-600">{currency.code}</span>
                {selectedCurrency === currency.code && (
                  <span className="text-indigo-600 text-xs font-medium">Selected</span>
                )}
              </div>
            </button>
          ))}

          {filteredCurrencies.length === 0 && (
            <div className="text-center py-6 text-sm text-gray-500">
              No currencies found for "{searchTerm}"
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
            disabled={isPending || selectedCurrency === currentCurrency}
            className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}