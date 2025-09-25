import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Calendar,
} from 'lucide-react';
import {
  useUpcomingScheduledTransactions,
  useCompletedScheduledTransactions,
  useDeleteScheduledTransaction,
} from '../../hooks/useScheduledTransactions';
import { SCHEDULED_TRANSACTION_TYPES, FREQUENCY_OPTIONS } from '../../types/scheduledTransaction';
import { useFormatters } from '../../hooks/useFormatters';
import CategoryIcon from '../../components/CategoryIcon';
import ConfirmationModal from '../../components/ConfirmationModal';

const tabs = ['Upcoming', 'Completed'];

function ScheduledTransactions() {
  const [activeTab, setActiveTab] = useState(0);
  const [transactionToDelete, setTransactionToDelete] = useState<{ id: string; description: string } | null>(null);

  // pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(15);

  const { data: upcomingData, isLoading: upcomingLoading } = useUpcomingScheduledTransactions(currentPage, pageSize, activeTab === 0);
  const { data: completedData, isLoading: completedLoading } = useCompletedScheduledTransactions(currentPage, pageSize, activeTab === 1);

  const deleteTransaction = useDeleteScheduledTransaction();
  const { formatCurrency } = useFormatters();

  // switch dataset based on tab
  const data = activeTab === 1 ? completedData : upcomingData;
  const isLoading = activeTab === 1 ? completedLoading : upcomingLoading;
  const transactions = data?.content || [];
  const totalPages = data?.totalPages || 0;

  const handleDeleteTransaction = async () => {
    if (transactionToDelete) {
      try {
        await deleteTransaction.mutateAsync(transactionToDelete.id);
        setTransactionToDelete(null);
      } catch (error) {
        console.error('Failed to delete scheduled transaction:', error);
      }
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'EXPENSE': return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'INCOME': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'TRANSFER': return <ArrowUpDown className="w-5 h-5 text-blue-600" />;
      default: return <ArrowUpDown className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'EXPENSE': return 'text-red-600';
      case 'INCOME': return 'text-green-600';
      case 'TRANSFER': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes.padStart(2, '0')} ${period}`;
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Transactions</h1>
          <p className="text-sm text-gray-500">Automate your recurring income and expenses</p>
        </div>
        <Link
          to="/scheduled/add"
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" /> Add Scheduled Transaction
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex justify-evenly gap-2 bg-gray-100 rounded-full p-1 sm:w-fit mb-6">
        {tabs.map((tab, index) => {
          const active = activeTab === index;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(index);
                setCurrentPage(0); // reset pagination when switching tabs
              }}
              className={`w-full px-4 py-2 rounded-full text-sm font-medium transition ${active
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Loading / Empty / Data */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="p-10 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {tabs[activeTab].toLowerCase()} scheduled transactions
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {activeTab === 0
              ? 'Set up your first scheduled transaction to automate finances'
              : 'No completed scheduled transactions yet'}
          </p>
          {activeTab === 0 && (
            <Link
              to="/scheduled/add"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              <Plus className="w-4 h-4" /> Add Scheduled Transaction
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col justify-between hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  {transaction.category ? (
                    <CategoryIcon
                      icon={transaction.category.icon}
                      color={transaction.category.color}
                    />
                  ) : (
                    getTransactionIcon(transaction.type)
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{transaction.description}</h3>
                    <p className="text-xs text-gray-500">
                      {SCHEDULED_TRANSACTION_TYPES[transaction.type]}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`font-semibold ${getAmountColor(transaction.type)}`}>
                    {transaction.type === 'EXPENSE' ? '-' : transaction.type === 'INCOME' ? '+' : ''}
                    {formatCurrency(transaction.amount)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/scheduled/edit/${transaction.id}`}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setTransactionToDelete({ id: transaction.id, description: transaction.description })}
                      disabled={deleteTransaction.isPending}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div>Start: {formatDate(transaction.startDate)} at {formatTime(transaction.time)}</div>
                  <div>{FREQUENCY_OPTIONS[transaction.frequencyType]}</div>
                  {transaction.account && <div>From: {transaction.account.name}</div>}
                  {transaction.type === 'TRANSFER' && transaction.toAccount && (
                    <div>→ {transaction.toAccount.name}</div>
                  )}
                  {transaction.remainderDays && (
                    <div>{transaction.remainderDays} day(s) reminder</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-1 border rounded-lg bg-gray-50">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={!!transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={handleDeleteTransaction}
        title="Delete Scheduled Transaction"
        message={`Are you sure you want to delete "${transactionToDelete?.description}"?`}
        confirmText="Delete Transaction"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteTransaction.isPending}
      />
    </div>
  );
}

export default ScheduledTransactions;