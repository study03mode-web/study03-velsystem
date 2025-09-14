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
  Banknote,
  CircleDollarSign,
  CreditCard,
  CheckCircle2,
  MinusCircle,
  PlusCircle,
  Coins,
} from 'lucide-react';
import {
  useDebt,
  useDebtRecords,
  usePaidRecords,
  useReceivedRecords,
  useDeleteDebtRecord,
} from '../../../hooks/useDebts';
import { DEBT_RECORD_TYPES } from '../../../types/debt';
import DebtRecordTypeModal from '../../../components/DebtRecordTypeModal';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useFormatters } from '../../../hooks/useFormatters';

const tabs = ['All', 'Paid', 'Received'];

function DebtRecords() {
  const { debtId } = useParams<{ debtId: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(6);
  const [isRecordTypeModalOpen, setIsRecordTypeModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<{ id: string; description: string } | null>(null);

  const { data: debt } = useDebt(debtId || '');
  const { data: allRecords } = useDebtRecords(debtId || '', currentPage, pageSize);
  const { data: paidRecords } = usePaidRecords(debtId || '', currentPage, pageSize);
  const { data: receivedRecords } = useReceivedRecords(debtId || '', currentPage, pageSize);
  const deleteRecord = useDeleteDebtRecord();
  const { formatCurrency } = useFormatters();

  const getCurrentData = () => {
    switch (activeTab) {
      case 1: return paidRecords;
      case 2: return receivedRecords;
      default: return allRecords;
    }
  };

  const records = getCurrentData()?.content || [];
  const totalPages = getCurrentData()?.totalPages || 0;

  const handleDeleteRecord = async () => {
    if (recordToDelete) {
      await deleteRecord.mutateAsync(recordToDelete.id);
      setRecordToDelete(null);
    }
  };

  const getRecordIcon = (type: string) => {
    if (type === '1') return <TrendingDown className="w-5 h-5 text-red-600" />;
    if (type === '2') return <TrendingUp className="w-5 h-5 text-green-600" />;
    return <DollarSign className="w-5 h-5 text-gray-600" />;
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
        <button
          onClick={() => setIsRecordTypeModalOpen(true)}
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Record
        </button>
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
              {formatCurrency(80)}
              {/* {formatCurrency(summary.totalPayable)} */}
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
              {formatCurrency(80)}
              {/* {formatCurrency(summary.totalReceivable)} */}
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

      {/* Records */}
      {
        records.length === 0 ? (
          <div className="p-10 text-center">
            <Coins className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No records yet</h3>
            <p className="text-sm text-gray-500 mb-6">Add your first debt record</p>
            <button
              onClick={() => setIsRecordTypeModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
            >
              <Plus className="w-4 h-4" />
              Add Record
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  {getRecordIcon(record.type)}
                  <div>
                    <h3 className="font-medium text-gray-900">{record.description}</h3>
                    <p className="text-xs text-gray-500">
                      {DEBT_RECORD_TYPES[record.type]} • {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/debts/${debtId}/records/edit/${record.id}`}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setRecordToDelete({ id: record.id, description: record.description })}
                    disabled={deleteRecord.isPending}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }

      {/* Pagination */}
      {
        totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-3 text-sm text-gray-600">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              className="px-3 py-1 rounded-md border hover:bg-gray-50 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              className="px-3 py-1 rounded-md border hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )
      }

      {/* Modals */}
      <DebtRecordTypeModal
        isOpen={isRecordTypeModalOpen}
        onClose={() => setIsRecordTypeModalOpen(false)}
        debtId={debtId}
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