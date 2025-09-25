import { useState } from 'react';
import { X, Search, Building2, Wallet, CreditCard, Banknote, Smartphone, FileText, Globe } from 'lucide-react';
import { Account } from '../types/account';

interface AccountSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  onSelect: (account: Account) => void;
  selectedAccount?: Account;
  title: string;
  excludeAccountId?: string; // For transfer to exclude from account
  onPaymentModeSelect?: (paymentModeId: string) => void;
  selectedPaymentModeId?: string;
  showPaymentModes?: boolean;
}

export default function AccountSelectModal({ 
  isOpen, 
  onClose, 
  accounts, 
  onSelect,
  selectedAccount,
  title,
  excludeAccountId,
  onPaymentModeSelect,
  selectedPaymentModeId,
  showPaymentModes = false
}: AccountSelectModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccountForPayment, setSelectedAccountForPayment] = useState<Account | null>(selectedAccount || null);

  const filteredAccounts = accounts
    .filter(account => account.id !== excludeAccountId)
    .filter(account =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSelectAccount = (account: Account) => {
    if (showPaymentModes && account.linkedPaymentModes && account.linkedPaymentModes.length > 0) {
      setSelectedAccountForPayment(account);
    } else {
      onSelect(account);
      onClose();
    }
  };

  const handleSelectPaymentMode = (paymentModeId: string) => {
    if (selectedAccountForPayment && onPaymentModeSelect) {
      onSelect(selectedAccountForPayment);
      onPaymentModeSelect(paymentModeId);
      onClose();
    }
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case '1':
        return <Building2 className="w-5 h-5" />;
      case '2':
        return <Wallet className="w-5 h-5" />;
      case '3':
        return <CreditCard className="w-5 h-5" />;
      case '4':
        return <Banknote className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const getPaymentModeIcon = (type: string) => {
    switch (type) {
      case '1':
        return <CreditCard className="w-4 h-4" />;
      case '2':
        return <Smartphone className="w-4 h-4" />;
      case '3':
        return <FileText className="w-4 h-4" />;
      case '4':
        return <Globe className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getPaymentModeTypeName = (type: string) => {
    switch (type) {
      case '1':
        return 'Debit Card';
      case '2':
        return 'UPI';
      case '3':
        return 'Cheque';
      case '4':
        return 'Internet Banking';
      default:
        return 'Payment Mode';
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'bank':
        return 'bg-blue-100 text-blue-700';
      case 'wallet':
        return 'bg-green-100 text-green-700';
      case 'credit-card':
        return 'bg-purple-100 text-purple-700';
      case 'cash':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!isOpen) return null;

  // Show payment mode selection if account is selected and has payment modes
  if (selectedAccountForPayment && showPaymentModes) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Select Payment Mode</h2>
            <button
              onClick={() => setSelectedAccountForPayment(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${getAccountTypeColor(selectedAccountForPayment.type.toString())}`}>
                {getAccountIcon(selectedAccountForPayment.type.toString())}
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedAccountForPayment.name}</p>
                <p className="text-sm text-gray-500">Select a payment mode</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {selectedAccountForPayment.linkedPaymentModes?.map((paymentMode) => (
                <button
                  key={paymentMode.id}
                  onClick={() => handleSelectPaymentMode(paymentMode.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    selectedPaymentModeId === paymentMode.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-gray-100">
                    {getPaymentModeIcon(paymentMode.type.toString())}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{paymentMode.name}</p>
                    <p className="text-sm text-gray-500">{getPaymentModeTypeName(paymentMode.type.toString())}</p>
                  </div>
                  {selectedPaymentModeId === paymentMode.id && (
                    <span className="text-sm text-indigo-600 font-medium">Selected</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedAccountForPayment(null)}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={() => {
                  onSelect(selectedAccountForPayment);
                  onClose();
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Skip Payment Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-2 sm:p-3 md:p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4">
          <div className="space-y-1.5 sm:space-y-2">
            {filteredAccounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleSelectAccount(account)}
                className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border transition-colors ${
                  selectedAccount?.id === account.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`p-1 sm:p-1.5 md:p-2 rounded-lg ${getAccountTypeColor(account.type)}`}>
                  {getAccountIcon(account.type)}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs sm:text-sm md:text-base font-medium text-gray-900 truncate">{account.name}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-gray-500 capitalize">{account.type}</p>
                    {account.linkedPaymentModes && account.linkedPaymentModes.length > 0 && (
                      <span className="text-xs text-gray-400 hidden md:inline">
                        • {account.linkedPaymentModes.length} payment mode(s)
                      </span>
                    )}
                  </div>
                </div>
                {selectedAccount?.id === account.id && (
                  <span className="text-xs text-indigo-600 font-medium">Selected</span>
                )}
              </button>
            ))}
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-4 sm:py-6 md:py-8 text-xs sm:text-sm text-gray-500">
              No accounts found matching "{searchTerm}"
            </div>
          )}
        </div>

        <div className="p-2 sm:p-3 md:p-4 border-t">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}