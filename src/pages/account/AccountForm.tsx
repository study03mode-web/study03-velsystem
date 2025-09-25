import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Building2, Wallet, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  useCreateBankAccount,
  useCreateWallet,
  useCreateCreditCard,
  useUpdateBankAccount,
  useUpdateWallet,
  useUpdateCreditCard,
  useAccount
} from '../../hooks/useAccounts';
import {
  CreateBankAccountData,
  CreateWalletData,
  CreateCreditCardData,
  CreatePaymentModeData,
  PAYMENT_MODE_TYPES
} from '../../types/account';
import PaymentModeModal from '../../components/PaymentModeModal';

const tabs = ['Bank Account', 'Wallet', 'Credit Card'];

interface FormData {
  name: string;
  currentBalance?: number;
  currentAvailableLimit?: number;
  totalCreditLimit?: number;
  billingCycleStartDate?: string;
  paymentDueDate?: string;
}

function AccountForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState(0);
  const [paymentModes, setPaymentModes] = useState<CreatePaymentModeData[]>([]);
  const [isPaymentModeModalOpen, setIsPaymentModeModalOpen] = useState(false);

  const { data: account, isLoading: accountLoading } = useAccount(id || '');
  const createBankAccount = useCreateBankAccount();
  const createWallet = useCreateWallet();
  const createCreditCard = useCreateCreditCard();
  const updateBankAccount = useUpdateBankAccount();
  const updateWallet = useUpdateWallet();
  const updateCreditCard = useUpdateCreditCard();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      currentBalance: undefined,
      currentAvailableLimit: undefined,
      totalCreditLimit: undefined,
      billingCycleStartDate: '',
      paymentDueDate: ''
    }
  });

  // Load existing account data for editing
  useEffect(() => {
    if (isEditing && account) {
      setValue('name', account.name);

      if (account.type === 1) {
        setActiveTab(0);
        setValue('currentBalance', account.currentBalance || 0);
        if (account.linkedPaymentModes) {
          setPaymentModes(account.linkedPaymentModes.map(pm => ({
            name: pm.name,
            type: pm.type
          })));
        }
      } else if (account.type === 2) {
        setActiveTab(1);
        setValue('currentBalance', account.currentBalance || undefined);
      } else if (account.type === 3) {
        setActiveTab(2);
        setValue('currentAvailableLimit', account.currentAvailableLimit || undefined);
        setValue('totalCreditLimit', account.totalCreditLimit || undefined);
        setValue('billingCycleStartDate', account.billingCycleStartDate || '');
        setValue('paymentDueDate', account.paymentDueDate || '');
      }
    }
  }, [isEditing, account, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && id) {
        // Update existing account
        if (activeTab === 0) {
          await updateBankAccount.mutateAsync({
            id,
            data: {
              name: data.name,
              currentBalance: data.currentBalance,
              linkedPaymentModes: paymentModes
            }
          });
        } else if (activeTab === 1) {
          await updateWallet.mutateAsync({
            id,
            data: {
              name: data.name,
              currentBalance: data.currentBalance
            }
          });
        } else if (activeTab === 2) {
          await updateCreditCard.mutateAsync({
            id,
            data: {
              name: data.name,
              currentAvailableLimit: data.currentAvailableLimit,
              totalCreditLimit: data.totalCreditLimit,
              billingCycleStartDate: data.billingCycleStartDate,
              paymentDueDate: data.paymentDueDate
            }
          });
        }
      } else {
        // Create new account
        if (activeTab === 0) {
          const bankData: CreateBankAccountData = {
            name: data.name,
            currentBalance: data.currentBalance || 0,
            linkedPaymentModes: paymentModes
          };
          await createBankAccount.mutateAsync(bankData);
        } else if (activeTab === 1) {
          const walletData: CreateWalletData = {
            name: data.name,
            currentBalance: data.currentBalance || 0
          };
          await createWallet.mutateAsync(walletData);
        } else if (activeTab === 2) {
          const creditCardData: CreateCreditCardData = {
            name: data.name,
            currentAvailableLimit: data.currentAvailableLimit || 0,
            totalCreditLimit: data.totalCreditLimit || 0,
            billingCycleStartDate: data.billingCycleStartDate || '',
            paymentDueDate: data.paymentDueDate || ''
          };
          await createCreditCard.mutateAsync(creditCardData);
        }
      }
    } catch (error) {
      console.error('Failed to save account:', error);
    }
  };

  const handlePaymentModeAdded = (paymentMode: CreatePaymentModeData) => {
    const newPaymentMode = {
      name: paymentMode.name,
      type: paymentMode.type
    };
    setPaymentModes(prev => [...prev, newPaymentMode]);
  };

  const removePaymentMode = (index: number) => {
    setPaymentModes(prev => prev.filter((_, i) => i !== index));
  };

  // Helper to get icon and color based on payment mode type
  const getPaymentModeIconAndColor = (type: string) => {
    switch (type) {
      case '1': // UPI
        return { icon: <Smartphone className="w-4 h-4 text-white" />, color: 'bg-green-500' };
      case '2': // Debit Card
        return { icon: <CreditCard className="w-4 h-4 text-white" />, color: 'bg-blue-500' };
      case '3': // Cheque
        return { icon: <Banknote className="w-4 h-4 text-white" />, color: 'bg-yellow-500' };
      case '4': // Internet Banking
        return { icon: <Wallet className="w-4 h-4 text-white" />, color: 'bg-purple-500' };
      default:
        return { icon: <CreditCard className="w-4 h-4 text-white" />, color: 'bg-gray-500' };
    }
  };

  const getAccountIcon = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: return <Building2 className="w-5 h-5" />;
      case 1: return <Wallet className="w-5 h-5" />;
      case 2: return <CreditCard className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  const getAccountColor = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: return 'bg-blue-500';
      case 1: return 'bg-green-500';
      case 2: return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const isPending =
    createBankAccount.isPending || createWallet.isPending || createCreditCard.isPending ||
    updateBankAccount.isPending || updateWallet.isPending || updateCreditCard.isPending;

  if (isEditing && accountLoading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-32 sm:w-48 mb-4 sm:mb-6"></div>
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 sm:p-6">
                <div className="h-4 sm:h-6 bg-gray-200 rounded w-24 sm:w-32 mb-3 sm:mb-4"></div>
                <div className="h-8 sm:h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <button
          onClick={() => navigate('/accounts')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-2 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Accounts
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Account' : 'Add Account'}
        </h1>
        <p className="text-sm text-gray-500">
          {isEditing ? 'Update account details' : 'Create a new account for tracking your finances'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Account Type Selection */}
        {!isEditing && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Type</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {tabs.map((tab, index) => {
                const active = activeTab === index;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`flex-1 text-sm font-medium rounded-lg py-2 transition-all duration-200 ${active
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Account Name */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Account Details</h3>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Account Name
            </label>
            <input
              {...register('name', { required: 'Account name is required' })}
              type="text"
              id="name"
              placeholder="Enter account name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Bank Account Fields */}
        {activeTab === 0 && (
          <>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Balance Information</h3>
              <div>
                <label htmlFor="currentBalance" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Balance
                </label>
                <input
                  {...register('currentBalance', {
                    required: 'Current balance is required',
                    min: { value: 0, message: 'Balance cannot be negative' }
                  })}
                  type="number"
                  step="0.01"
                  id="currentBalance"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.currentBalance && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentBalance.message}</p>
                )}
              </div>
            </div>

            {/* Linked Payment Modes */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Payment Modes</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {paymentModes.length === 0
                      ? 'No payment modes added yet'
                      : `${paymentModes.length} payment mode(s) linked to this account`
                    }
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPaymentModeModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </button>
              </div>

              {paymentModes.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {paymentModes.map((mode, index) => {
                    const { icon, color } = getPaymentModeIconAndColor(mode.type);
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-lg ${color} shadow`}>
                            {icon}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{mode.name}</p>
                            <p className="text-xs text-gray-500">{PAYMENT_MODE_TYPES[mode.type]}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePaymentMode(index)}
                          className="p-2 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove payment mode"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 bg-gray-50">
                  <Smartphone className="w-12 h-12 mb-3 text-gray-400" />
                  <p className="text-sm font-medium text-gray-600">No payment modes added yet</p>
                  <p className="text-xs text-gray-400 mt-1">Click "Add Payment Mode" to get started</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Wallet Fields */}
        {activeTab === 1 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Balance Information</h3>
            <div>
              <label htmlFor="currentBalance" className="block text-sm font-medium text-gray-700 mb-1">
                Current Balance
              </label>
              <input
                {...register('currentBalance', {
                  required: 'Current balance is required',
                  min: { value: 0, message: 'Balance cannot be negative' }
                })}
                type="number"
                step="0.01"
                id="currentBalance"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.currentBalance && (
                <p className="mt-1 text-sm text-red-600">{errors.currentBalance.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Credit Card Fields */}
        {activeTab === 2 && (
          <>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Credit Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="currentAvailableLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Available Limit
                  </label>
                  <input
                    {...register('currentAvailableLimit', {
                      required: 'Available limit is required',
                      min: { value: 0, message: 'Limit cannot be negative' }
                    })}
                    type="number"
                    step="0.01"
                    id="currentAvailableLimit"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.currentAvailableLimit && (
                    <p className="mt-1 text-sm text-red-600">{errors.currentAvailableLimit.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="totalCreditLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Credit Limit
                  </label>
                  <input
                    {...register('totalCreditLimit', {
                      required: 'Total credit limit is required',
                      min: { value: 0, message: 'Limit cannot be negative' }
                    })}
                    type="number"
                    step="0.01"
                    id="totalCreditLimit"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.totalCreditLimit && (
                    <p className="mt-1 text-sm text-red-600">{errors.totalCreditLimit.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Billing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="billingCycleStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Cycle Start Date
                  </label>
                  <input
                    {...register('billingCycleStartDate', { required: 'Billing cycle start date is required' })}
                    type="date"
                    id="billingCycleStartDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.billingCycleStartDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.billingCycleStartDate.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="paymentDueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Due Date
                  </label>
                  <input
                    {...register('paymentDueDate', { required: 'Payment due date is required' })}
                    type="date"
                    id="paymentDueDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.paymentDueDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.paymentDueDate.message}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Preview */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview</h3>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className={`p-3 rounded-full ${getAccountColor(activeTab)}`}>
              {getAccountIcon(activeTab)}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {watch('name') || 'Account Name'}
              </p>
              <p className="text-sm text-gray-500">
                {tabs[activeTab]}
                {activeTab === 0 && paymentModes.length > 0 && ` • ${paymentModes.length} payment mode(s)`}
              </p>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        {(createBankAccount.error || createWallet.error || createCreditCard.error ||
          updateBankAccount.error || updateWallet.error || updateCreditCard.error) && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="text-sm text-red-600">
                Failed to save account. Please try again.
              </div>
            </div>
          )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isPending ? 'Saving...' : isEditing ? 'Update Account' : 'Create Account'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/accounts')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Payment Mode Modal */}
      <PaymentModeModal
        isOpen={isPaymentModeModalOpen}
        onClose={() => setIsPaymentModeModalOpen(false)}
        accountId="" // Not needed for form creation
        onPaymentModeAdded={handlePaymentModeAdded}
      />
    </div>
  );
}

export default AccountForm;