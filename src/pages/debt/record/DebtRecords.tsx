import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  MinusCircle,
  PlusCircle,
  Coins,
  ChevronLeft,
  ChevronRight,
  Settings,
} from 'lucide-react';
import {
  useDebt,
  useAllDebtTransactions,
  usePaidDebtTransactions,
  useReceivedDebtTransactions,
  useAdjustmentDebtTransactions,
  useDeleteDebtRecord,
  useDebtTransactionSummary,
  useCreateAdjustmentDebtTransaction,
} from '../../../hooks/useDebts';
import { DEBT_TRANSACTION_TYPES } from '../../../types/debt';
import DebtRecordTypeModal from '../../../components/DebtRecordTypeModal';
import DebtAdjustmentModal from '../../../components/DebtAdjustmentModal';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useFormatters } from '../../../hooks/useFormatters';

const tabs = ['All', 'Paid', 'Received', 'Adjustment'];

function DebtRecords() {
  const { debtId } = useParams<{ debtId: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [isRecordTypeModalOpen, setIsRecordTypeModalOpen] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<{ id: string; description: string } | null>(null);
  const { data: summary } = useDebtTransactionSummary(debtId || '');
  const { data: debt } = useDebt(debtId || '');

  // Only fetch data for the active tab to avoid unnecessary API calls
  const { data: allTransactions, isLoading: allLoading } = useAllDebtTransactions(debtId || '', currentPage, pageSize, activeTab === 0);
  const { data: paidTransactions, isLoading: paidLoading } = usePaidDebtTransactions(debtId || '', currentPage, pageSize, activeTab === 1);
  const { data: receivedTransactions, isLoading: receivedLoading } = useReceivedDebtTransactions(debtId || '', currentPage, pageSize, activeTab === 2);
  const { data: adjustmentTransactions, isLoading: adjustmentLoading } = useAdjustmentDebtTransactions(debtId || '', currentPage, pageSize, activeTab === 3);

  const deleteRecord = useDeleteDebtRecord();
  const createAdjustment = useCreateAdjustmentDebtTransaction(debtId || '');
  const { formatCurrency } = useFormatters();

  const getCurrentData = () => {
    switch (activeTab) {
      case 1: return { data: paidTransactions, isLoading: paidLoading };
      case 2: return { data: receivedTransactions, isLoading: receivedLoading };
      case 3: return { data: adjustmentTransactions, isLoading: adjustmentLoading };
      default: return { data: allTransactions, isLoading: allLoading };
    }
  };

  const { data: currentData, isLoading } = getCurrentData();
  const transactions = currentData?.content || [];
  const totalPages = currentData?.totalPages || 0;

  const handleDeleteRecord = async () => {
    if (recordToDelete) {
      await deleteRecord.mutateAsync(recordToDelete.id);
      setRecordToDelete(null);
    }
  };

  const handleAdjustmentSubmit = async (data: {
    type: string;
    txnDate: string;
    txnTime: string;
    amount: number;
    description: string;
  }) => {
    try {
      await createAdjustment.mutateAsync(data);
      setIsAdjustmentModalOpen(false);
    } catch (error) {
      console.error('Failed to create adjustment:', error);
    }
  };
  const getTransactionIcon = (type: number) => {
    if (type === 5) return <TrendingDown className="w-5 h-5 text-red-600" />;
    if (type === 6) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (type === 7) return <DollarSign className="w-5 h-5 text-blue-600" />;
    return <DollarSign className="w-5 h-5 text-gray-600" />;
  };

  const getAmountColor = (type: number) => {
    if (type === 5) return 'text-red-600';
    if (type === 6) return 'text-green-600';
    if (type === 7) return 'text-blue-600';
    return 'text-gray-600';
  };

  const formatDateTime = (date: string, time: string) => {
    const formattedDate = new Date(date).toLocaleDateString();
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const formattedTime = `${displayHour}:${minutes.padStart(2, '0')} ${period}`;
    return { date: formattedDate, time: formattedTime };
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/debts')}
        className="mb-2 flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Debts
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Debt Records</h1>
          <p className="text-sm text-gray-500">
            {debt ? `With ${debt.personName}` : 'Track your debt activity'}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setIsAdjustmentModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl shadow hover:bg-blue-700 transition"
          >
            <Settings className="w-4 h-4" />
            Adjustment
          </button>
          <button
            onClick={() => setIsRecordTypeModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Record
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3 w-full">
          <div className="p-3 bg-red-100 rounded-full">
            < MinusCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Payable</p>
            <p className="text-xl font-semibold text-red-600">
              {formatCurrency(summary?.totalPaid ?? 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3 w-full">
          <div className="p-3 bg-green-100 rounded-full">
            <PlusCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Receivable</p>
            <p className="text-xl font-semibold text-green-600">
              {formatCurrency(summary?.totalReceived ?? 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3 w-full">
          <div className="p-3 bg-indigo-100 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Received</p>
            <p className="text-xl font-semibold text-indigo-600">
              {formatCurrency(80)}
              {/* {formatCurrency(summary.totalReceived)} */}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-evenly gap-2 bg-gray-100 rounded-full p-1 sm:w-fit mb-6">
        {tabs.map((tab, i) => {
          const active = activeTab === i;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(i);
                setCurrentPage(0);
              }}
              className={`px-4 w-full py-2 rounded-full text-sm font-medium transition ${active
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Transactions */}
      {isLoading ? (
        <div className="animate-pulse grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="p-10 text-center">
          <Coins className="w-10 h-10 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No {tabs[activeTab].toLowerCase()} transactions</h3>
          <p className="text-sm text-gray-500 mb-6">
            {activeTab === 0
              ? 'No debt transactions found'
              : `No ${tabs[activeTab].toLowerCase()} transactions found`
            }
          </p>
          <div className="flex justify-center gap-2">
            {activeTab === 3 && (
              <button
                onClick={() => setIsAdjustmentModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
              >
                <Settings className="w-4 h-4" />
                Add Adjustment
              </button>
            )}
            <button
              onClick={() => setIsRecordTypeModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
            >
              <Plus className="w-4 h-4" />
              Add Record
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transactions.map((transaction) => {
            const { date, time } = formatDateTime(transaction.txnDate, transaction.txnTime);
            return (
              <div
                key={transaction.id}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <h3 className="font-medium text-gray-900 truncate">{transaction.description}</h3>
                    <p className="text-xs text-gray-500">
                      {DEBT_TRANSACTION_TYPES[transaction.type as keyof typeof DEBT_TRANSACTION_TYPES]} • {date} at {time}
                    </p>
                    {transaction.debt && (
                      <p className="text-xs text-gray-400">
                        With {transaction.debt.personName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${getAmountColor(transaction.type)}`}>
                      {transaction.type === 5 ? '-' : transaction.type === 6 ? '+' : ''}
                      {formatCurrency(transaction.amount)}
                    </p>
                    {transaction.account && (
                      <p className="text-xs text-gray-500">{transaction.account.name}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {transaction.type !== 7 && (
                      <Link
                        to={`/debts/${debtId}/records/edit/${transaction.id}`}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    )}
                    <button
                      onClick={() => setRecordToDelete({ id: transaction.id, description: transaction.description })}
                      disabled={deleteRecord.isPending}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-500">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage >= totalPages - 1}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Modals */}
      <DebtRecordTypeModal
        isOpen={isRecordTypeModalOpen}
        onClose={() => setIsRecordTypeModalOpen(false)}
        debtId={debtId || ''}
      />
      <DebtAdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        onSubmit={handleAdjustmentSubmit}
        isPending={createAdjustment.isPending}
      />
      <ConfirmationModal
        isOpen={!!recordToDelete}
        onClose={() => setRecordToDelete(null)}
        onConfirm={handleDeleteRecord}
        title="Delete Record"
        message={`Are you sure you want to delete "${recordToDelete?.description}"?`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteRecord.isPending}
      />
    </div >
  );
}

export default DebtRecords;