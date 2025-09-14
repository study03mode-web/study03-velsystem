import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, TrendingDown, ArrowUpDown, Edit, Trash2, Building2, Wallet, CreditCard, Banknote, Smartphone, FileText, Globe } from 'lucide-react';
import { useDaySummary } from '../../hooks/useSummary';
import { useDeleteTransaction } from '../../hooks/useTransactions';
import { useFormatters } from '../../hooks/useFormatters';
import { TRANSACTION_TYPES } from '../../types/transaction';
import ConfirmationModal from '../../components/ConfirmationModal';

function DayView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentDate = new Date();
  const [transactionToDelete, setTransactionToDelete] = useState<{ id: string; description: string } | null>(null);
  
  const [currentDay, setCurrentDay] = useState(
    parseInt(searchParams.get('day') || currentDate.getDate().toString())
  );
  const [currentMonth, setCurrentMonth] = useState(
    parseInt(searchParams.get('month') || (currentDate.getMonth() + 1).toString())
  );
  const [currentYear, setCurrentYear] = useState(
    parseInt(searchParams.get('year') || currentDate.getFullYear().toString())
  );

  const { data: dayData, isLoading } = useDaySummary(currentDay, currentMonth, currentYear);
  const deleteTransaction = useDeleteTransaction();
  const { formatCurrency } = useFormatters();

  // Update URL when date changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('day', currentDay.toString());
    newSearchParams.set('month', currentMonth.toString());
    newSearchParams.set('year', currentYear.toString());
    navigate(`/views/day?${newSearchParams.toString()}`, { replace: true });
  }, [currentDay, currentMonth, currentYear, navigate]);

  const navigateToDay = (direction: 'prev' | 'next') => {
    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDay);
    
    if (direction === 'prev') {
      currentDateObj.setDate(currentDateObj.getDate() - 1);
    } else {
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    setCurrentDay(currentDateObj.getDate());
    setCurrentMonth(currentDateObj.getMonth() + 1);
    setCurrentYear(currentDateObj.getFullYear());
  };

  const handleDeleteTransaction = async () => {
    if (transactionToDelete) {
      try {
        await deleteTransaction.mutateAsync(transactionToDelete.id);
        setTransactionToDelete(null);
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    }
  };

  const getTransactionIcon = (type: number | null) => {
    switch (type) {
      case 1: // Expense
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 2: // Income
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 3: // Transfer
        return <ArrowUpDown className="w-5 h-5 text-blue-600" />;
      default:
        return <ArrowUpDown className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAmountColor = (type: number | null) => {
    switch (type) {
      case 1: // Expense
        return 'text-red-600';
      case 2: // Income
        return 'text-green-600';
      case 3: // Transfer
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAccountIcon = (type: number) => {
    switch (type) {
      case 1: // Bank
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 2: // Wallet
        return <Wallet className="w-4 h-4 text-green-600" />;
      case 3: // Credit Card
        return <CreditCard className="w-4 h-4 text-purple-600" />;
      case 4: // Cash
        return <Banknote className="w-4 h-4 text-yellow-600" />;
      default:
        return <Building2 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPaymentModeIcon = (type: number) => {
    switch (type) {
      case 1:
        return <Smartphone className="w-3 h-3 text-blue-600" />;
      case 2:
        return <CreditCard className="w-3 h-3 text-purple-600" />;
      case 3:
        return <FileText className="w-3 h-3 text-gray-600" />;
      case 4:
        return <Globe className="w-3 h-3 text-green-600" />;
      default:
        return <CreditCard className="w-3 h-3 text-gray-600" />;
    }
  };

  const formatDateString = () => {
    const date = new Date(currentYear, currentMonth - 1, currentDay);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = () => {
    const today = new Date();
    return (
      currentDay === today.getDate() &&
      currentMonth === today.getMonth() + 1 &&
      currentYear === today.getFullYear()
    );
  };

  if (isLoading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const summary = dayData?.data;
  const transactions = summary?.transactions || [];
  const balance = (summary?.income || 0) - (summary?.spending || 0);

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Day View</h1>
            <p className="text-sm sm:text-base text-gray-600">Daily financial summary and transactions</p>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 sm:p-6">
          <button
            onClick={() => navigateToDay('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          
          <div className="text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              {formatDateString()}
            </h2>
            {isToday() && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                Today
              </span>
            )}
          </div>
          
          <button
            onClick={() => navigateToDay('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Income</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(summary?.income || 0)}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Spending</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(summary?.spending || 0)}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Balance</p>
              <p className={`text-2xl font-bold ${
                balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {balance >= 0 ? '+' : ''}{formatCurrency(balance)}
              </p>
            </div>
            <div className={`rounded-full p-3 ${
              balance >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <ArrowUpDown className={`h-6 w-6 ${
                balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Transactions ({transactions.length})
          </h2>
        </div>

        {transactions.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <ArrowUpDown className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No transactions for this day
            </h3>
            <p className="text-gray-500 mb-4">
              No financial activities recorded for {formatDateString()}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-3 sm:p-4 lg:p-6 flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        {transaction.description || 'No description'}
                      </p>
                      {transaction.type && (
                        <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex-shrink-0">
                          {TRANSACTION_TYPES[transaction.type.toString() as keyof typeof TRANSACTION_TYPES]}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 lg:space-x-4 text-xs sm:text-sm text-gray-500">
                      <span>Transaction ID: {transaction.id.slice(0, 8)}...</span>
                      {transaction.account && (
                        <span className="hidden sm:inline flex items-center">
                          • {getAccountIcon(transaction.account.type)} 
                          <span className="ml-1">{transaction.account.name}</span>
                        </span>
                      )}
                      {transaction.paymentMode && (
                        <span className="hidden md:inline flex items-center">
                          • {getPaymentModeIcon(transaction.paymentMode.type)} 
                          <span className="ml-1">{transaction.paymentMode.name}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  <div className="text-right">
                    <p className={`text-sm sm:text-base font-semibold ${getAmountColor(transaction.type)}`}>
                      {transaction.type === 1 ? '-' : transaction.type === 2 ? '+' : ''}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => navigate(`/transactions/edit/${transaction.id}`)}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => setTransactionToDelete({ 
                        id: transaction.id, 
                        description: transaction.description || 'transaction' 
                      })}
                      disabled={deleteTransaction.isPending}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50 rounded-md hover:bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={handleDeleteTransaction}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${transactionToDelete?.description}" transaction? This action cannot be undone.`}
        confirmText="Delete Transaction"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteTransaction.isPending}
      />
    </div>
  );
}

export default DayView;