import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  CreditCard,
  Wallet,
  Building2,
  Banknote,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  useAccounts,
  useAccountSummary,
  useDeleteAccount,
} from '../../hooks/useAccounts';
import { useFormatters } from '../../hooks/useFormatters';
import ConfirmationModal from '../../components/ConfirmationModal';

function Accounts() {
  const [showBalance, setShowBalance] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: allAccounts = [], isLoading: allAccountsLoading } = useAccounts();
  const { data: summary, isLoading: summaryLoading } = useAccountSummary();
  const deleteAccount = useDeleteAccount();
  const { formatCurrency } = useFormatters();

  const handleDeleteAccount = async () => {
    if (accountToDelete) {
      try {
        await deleteAccount.mutateAsync(accountToDelete.id);
        setAccountToDelete(null);
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  const formatCurrencyWithVisibility = (amount: number) =>
    showBalance ? formatCurrency(amount) : '****';

  const getAccountIcon = (type: number) => {
    switch (type) {
      case 1:
        return <Building2 className="w-5 h-5" />;
      case 2:
        return <Wallet className="w-5 h-5" />;
      case 3:
        return <CreditCard className="w-5 h-5" />;
      case 4:
        return <Banknote className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const getAccountTypeColor = (type: number) => {
    switch (type) {
      case 1:
        return 'bg-blue-100 text-blue-700';
      case 2:
        return 'bg-green-100 text-green-700';
      case 3:
        return 'bg-purple-100 text-purple-700';
      case 4:
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAccountTypeName = (type: number) => {
    switch (type) {
      case 1:
        return 'Bank Account';
      case 2:
        return 'Wallet';
      case 3:
        return 'Credit Card';
      case 4:
        return 'Cash';
      default:
        return 'Account';
    }
  };

  if (allAccountsLoading || summaryLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  // Group accounts by type
  const groupedAccounts = allAccounts.reduce(
    (acc: Record<number, any[]>, account) => {
      acc[account.type] = acc[account.type] || [];
      acc[account.type].push(account);
      return acc;
    },
    {}
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="text-sm text-gray-500">
            Manage your bank accounts, wallets, and credit cards
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            * Transaction-based balance, actual may vary.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            {showBalance ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showBalance ? 'Hide Balance' : 'Show Balance'}
          </button>
          <Link
            to="/accounts/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Account
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Wallet className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Available Balance</h3>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrencyWithVisibility(summary?.availableAmount || 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-full">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Available Credit</h3>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrencyWithVisibility(summary?.availableCredit || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Accounts List - grouped by type */}
      {Object.keys(groupedAccounts).length === 0 ? (
        <div className="p-10 text-center text-gray-500">No accounts yet</div>
      ) : (
        Object.entries(groupedAccounts).map(([type, accounts]) => (
          <div key={type} className="mb-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {getAccountTypeName(Number(type))}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-full ${getAccountTypeColor(account.type)}`}
                      >
                        {getAccountIcon(account.type)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {account.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {getAccountTypeName(account.type)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                     <Link
                       to={`/accounts/detail/${account.id}`}
                       className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                     >
                       <Eye className="w-4 h-4" />
                     </Link>
                      <Link
                        to={`/accounts/edit/${account.id}`}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() =>
                          setAccountToDelete({ id: account.id, name: account.name })
                        }
                        disabled={deleteAccount.isPending}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {account.type === 3 ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Available:</span>
                          <span className="font-medium">
                            {formatCurrencyWithVisibility(
                              account.currentAvailableLimit || 0
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Limit:</span>
                          <span className="font-medium">
                            {formatCurrencyWithVisibility(
                              account.totalCreditLimit || 0
                            )}
                          </span>
                        </div>
                        {account.paymentDueDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Due Date:</span>
                            <span className="font-medium">
                              {new Date(account.paymentDueDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex gap-2 text-sm">
                        <span className="text-gray-600">Balance:</span>
                        <span className="font-medium">
                          {formatCurrencyWithVisibility(account.currentBalance || 0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!accountToDelete}
        onClose={() => setAccountToDelete(null)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message={`Are you sure you want to delete "${accountToDelete?.name}" account? This action cannot be undone and may affect your transaction history.`}
        confirmText="Delete Account"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteAccount.isPending}
      />
    </div>
  );
}

export default Accounts;