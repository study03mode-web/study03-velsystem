import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  User,
  ChevronLeft,
  ChevronRight,
  HandCoins,
  TrendingUp,
  TrendingDown,
  Eye,
  PiggyBank,
  Scale,
} from 'lucide-react';
import {
  useDebts,
  useLendingDebts,
  useBorrowingDebts,
  useDeleteDebt
} from '../../hooks/useDebts';
import { DEBT_TYPES } from '../../types/debt';
import DebtTypeModal from '../../components/DebtTypeModal';
import { useFormatters } from '../../hooks/useFormatters';
import ConfirmationModal from '../../components/ConfirmationModal';

const tabs = ['All', 'Lending', 'Borrowing'];

function Debts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [isDebtTypeModalOpen, setIsDebtTypeModalOpen] = useState(false);
  const [debtToDelete, setDebtToDelete] = useState<{ id: string; name: string } | null>(null);

  const { data: allDebts, isLoading: allLoading } = useDebts(currentPage, pageSize);
  const { data: lendingDebts, isLoading: lendingLoading } = useLendingDebts(currentPage, pageSize);
  const { data: borrowingDebts, isLoading: borrowingLoading } = useBorrowingDebts(currentPage, pageSize);
  const deleteDebt = useDeleteDebt();
  const { formatCurrency } = useFormatters();

  const getCurrentData = () => {
    switch (activeTab) {
      case 1:
        return { data: lendingDebts, isLoading: lendingLoading };
      case 2:
        return { data: borrowingDebts, isLoading: borrowingLoading };
      default:
        return { data: allDebts, isLoading: allLoading };
    }
  };

  const { data: currentData, isLoading } = getCurrentData();
  const debts = currentData?.content || [];
  const totalPages = currentData?.totalPages || 0;

  const handleDeleteDebt = async () => {
    if (debtToDelete) {
      try {
        await deleteDebt.mutateAsync(debtToDelete.id);
        setDebtToDelete(null);
      } catch (error) {
        console.error('Failed to delete debt:', error);
      }
    }
  };

  const handleDebtTypeSelect = (type: '1' | '2') => {
    navigate('/debts/add', { state: { debtType: type } });
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  const getDebtTypeColor = (type: '1' | '2') => {
    return type == '1'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700'
  }

  const getDebtTypeIcon = (type: '1' | '2') => {
    return type == '1'
      ? <TrendingUp className="w-5 h-5" />
      : <TrendingDown className="w-5 h-5" />
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Debts</h1>
          <p className="text-sm text-gray-500 mt-1">Track money you've lent and borrowed</p>
        </div>
        <button
          onClick={() => setIsDebtTypeModalOpen(true)}
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" /> Add Debt
        </button>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Total Lent */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-tr from-indigo-200 to-indigo-400">
            <HandCoins className="w-6 h-6 text-indigo-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total Lent</span>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(0)}
              {/* {formatCurrency(summary?.totalPayable ?? 0)} */}
            </span>
          </div>
        </div>

        {/* Total Borrowed */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-tr from-orange-200 to-orange-400">
            <PiggyBank className="w-6 h-6 text-orange-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total Borrowed</span>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(0)}
              {/* {formatCurrency(summary?.totalReceivable ?? 0)} */}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-evenly gap-2 bg-gray-100 rounded-full p-1 sm:w-fit mb-4">
        {tabs.map((tab, index) => {
          const active = activeTab === index
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(index)
                setCurrentPage(0)
              }}
              className={`px-4 w-full py-2 rounded-full text-sm font-medium transition ${active ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Debts List */}
      {debts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {debts.map((debt) => (
            <div
              key={debt.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${getDebtTypeColor(debt.type)}`}>
                  {getDebtTypeIcon(debt.type)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{debt.personName}</h3>
                  <p className="text-xs text-gray-500">
                    {DEBT_TYPES[debt.type]} • Due {formatDate(debt.dueDate)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-gray-900">
                  {formatCurrency(debt.remainingAmount || 0)}
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/debts/${debt.id}/records`}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/debts/edit/${debt.id}`}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setDebtToDelete({ id: debt.id, name: debt.personName })}
                    disabled={deleteDebt.isPending}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <Scale className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No debts found</h3>
          <p className="mt-1 text-sm text-gray-500">Start by adding a new debt record</p>
          <div className="mt-4">
            <button
              onClick={() => setIsDebtTypeModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
            >
              <Plus className="w-4 h-4" /> Add Debt
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {debts.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-500">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <DebtTypeModal
        isOpen={isDebtTypeModalOpen}
        onClose={() => setIsDebtTypeModalOpen(false)}
        onSelect={handleDebtTypeSelect}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!debtToDelete}
        onClose={() => setDebtToDelete(null)}
        onConfirm={handleDeleteDebt}
        title="Delete Debt"
        message={`Are you sure you want to delete debt with "${debtToDelete?.name}"? This action cannot be undone and will also delete all associated records.`}
        confirmText="Delete Debt"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteDebt.isPending}
      />
    </div>
  );
}

export default Debts;
