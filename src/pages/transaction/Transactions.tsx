import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  Building2,
  Banknote,
} from 'lucide-react';
import { useTransactions, useDeleteTransaction } from '../../hooks/useTransactions';
import { TRANSACTION_TYPES } from '../../types/transaction';
import { useFormatters } from '../../hooks/useFormatters';
import CategoryIcon from '../../components/CategoryIcon';
import ConfirmationModal from '../../components/ConfirmationModal';

function Transactions() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(6);
  const [transactionToDelete, setTransactionToDelete] = useState<{ id: string; description: string } | null>(null);

  const { data: transactionsData, isLoading } = useTransactions(currentPage, pageSize);
  const deleteTransaction = useDeleteTransaction();
  const { formatCurrency } = useFormatters();

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

  const getTransactionIcon = (type: number) => {
    switch (type) {
      case 1: return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 2: return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 3: return <ArrowUpDown className="w-5 h-5 text-blue-600" />;
      default: return <ArrowUpDown className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAmountColor = (type: number) => {
    switch (type) {
      case 1: return 'text-red-600';
      case 2: return 'text-green-600';
      case 3: return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getAccountIcon = (type: number) => {
    switch (type) {
      case 1: return <Building2 className="w-4 h-4 text-blue-600" />;
      case 2: return <Wallet className="w-4 h-4 text-green-600" />;
      case 3: return <CreditCard className="w-4 h-4 text-purple-600" />;
      case 4: return <Banknote className="w-4 h-4 text-yellow-600" />;
      default: return <Building2 className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const formattedDate = new Date(date).toLocaleDateString();
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const minute = parseInt(minutes);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const formattedTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    return { date: formattedDate, time: formattedTime };
  };

  const transactions = transactionsData?.content || [];
  const totalPages = transactionsData?.totalPages || 0;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-sm text-gray-500 mt-1">Track all your financial transactions</p>
        </div>
        <Link
          to="/transactions/add"
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" /> Add Transaction
        </Link>
      </div>

      {/* Transactions List */}
      {isLoading ? (
        <div className="animate-pulse grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-30 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          <ArrowUpDown className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
          <p className="text-sm text-gray-500 mb-4">Start tracking your finances by adding your first transaction</p>
          <Link
            to="/transactions/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" /> Add Transaction
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transactions.map(txn => {
            const { date, time } = formatDateTime(txn.txnDate, txn.txnTime);
            return (
              <div key={txn.id} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  {txn.category ? (
                    <CategoryIcon icon={txn.category.icon} color={txn.category.color} />
                  ) : (
                    <div className={`rounded-full flex items-center justify-center w-10 h-10 bg-gray-200`}>
                    {getTransactionIcon(txn.type)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{txn.description}</h3>
                    <p className="text-xs text-gray-500">
                      {txn.category?.name ? `${txn.category.name} • ${TRANSACTION_TYPES[txn.type]}` : TRANSACTION_TYPES[txn.type]}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`font-semibold ${getAmountColor(txn.type)}`}>
                    {txn.type === 1 ? '-' : txn.type === 2 ? '+' : ''}
                    {formatCurrency(txn.amount)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/transactions/edit/${txn.id}`}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setTransactionToDelete({ id: txn.id, description: txn.description })}
                      disabled={deleteTransaction.isPending}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div>{date} at {time}</div>
                  {txn.account && (
                    <div className="truncate flex items-center gap-1">
                      {getAccountIcon(txn.account.type)} <span>{txn.account.name}</span>
                    </div>
                  )}
                  {txn.fromAccount && txn.toAccount && txn.type === 3 && (
                    <div className="truncate flex items-center gap-1">
                      {getAccountIcon(txn.fromAccount.type)} <span>{txn.fromAccount.name}</span>
                      → {getAccountIcon(txn.toAccount.type)} <span>{txn.toAccount.name}</span>
                    </div>
                  )}
                  {txn.tags && txn.tags.length > 0 && (
                    <div className="truncate text-gray-400 text-xs">Tags: {txn.tags.map(t => t.name).join(', ')}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 border rounded-lg bg-gray-50">{currentPage + 1} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={!!transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={handleDeleteTransaction}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${transactionToDelete?.description}" transaction?`}
        confirmText="Delete Transaction"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteTransaction.isPending}
      />
    </div>
  );
}

export default Transactions;