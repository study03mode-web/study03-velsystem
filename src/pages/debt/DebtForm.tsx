import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreateDebt, useUpdateDebt, useDebt } from '../../hooks/useDebts';
import { useAccounts } from '../../hooks/useAccounts';
import { CreateDebtData } from '../../types/debt';
import AccountSelectModal from '../../components/AccountSelectModal';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';

interface FormData {
  personName: string;
  dueDate: string;
  additionalDetail: string;
  type: '1' | '2';
  date: string;
  amount: number;
  description: string;
  accountId: string;
  paymentModeId?: string;
  recordType: '1' | '2';
}

function DebtForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = Boolean(id);
  const [step, setStep] = useState(1);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const debtType = location.state?.debtType as '1' | '2' | undefined;

  const { data: debt, isLoading: debtLoading } = useDebt(id || '');
  const { data: accounts = [] } = useAccounts();
  const createDebt = useCreateDebt();
  const updateDebt = useUpdateDebt();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      personName: '',
      dueDate: '',
      additionalDetail: '',
      type: debtType || '1',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      description: '',
      accountId: '',
      paymentModeId: '',
      recordType: debtType || '1'
    }
  });

  const watchedType = watch('type');
  const watchedValues = watch();
  const selectedAccount = accounts.find(acc => acc.id === watchedValues.accountId);
  const selectedPaymentMode = selectedAccount?.linkedPaymentModes?.find(pm => pm.id === watchedValues.paymentModeId);
  // Load existing debt data for editing
  useEffect(() => {
    if (isEditing && debt) {
      setValue('personName', debt.personName);
      setValue('dueDate', debt.dueDate);
      setValue('additionalDetail', debt.additionalDetail);
      setValue('type', debt.type);
      setValue('recordType', debt.type);
    }
  }, [isEditing, debt, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const debtData: CreateDebtData = {
        personName: data.personName,
        dueDate: data.dueDate,
        additionalDetail: data.additionalDetail,
        type: data.type,
        record: {
          date: data.date,
          amount: data.amount,
          description: data.description,
          accountId: data.accountId,
          paymentModeId: data.paymentModeId,
          type: data.recordType
        }
      };

      if (isEditing && id) {
        await updateDebt.mutateAsync({ id, data: debtData });
      } else {
        await createDebt.mutateAsync(debtData);
      }
    } catch (error) {
      console.error('Failed to save debt:', error);
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/debts');
    } else {
      setStep(1);
    }
  };

  const isPending = createDebt.isPending || updateDebt.isPending;

  if (isEditing && debtLoading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-32 sm:w-48 mb-4 sm:mb-6"></div>
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 sm:p-6">
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
      <div className="mb-6 sm:mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          {step === 1 ? 'Back to Debts' : 'Back to Debt Details'}
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Debt' : step === 1 ? 'Create Debt' : 'Add Initial Transaction'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {isEditing
            ? 'Update debt details'
            : step === 1
              ? 'Enter debt information'
              : 'Add the initial transaction for this debt'
          }
        </p>
      </div>

      {/* Progress Indicator */}
      {!isEditing && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'
              }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs sm:text-sm text-gray-600">Debt Details</span>
            <span className="text-xs sm:text-sm text-gray-600">Initial Transaction</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Step 1: Debt Details */}
        {(step === 1 || isEditing) && (
          <>
            {/* Debt Type */}
            {!isEditing && (
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4">
                  Debt Type
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setValue('type', '1');
                      setValue('recordType', '1');
                    }}
                    className={`flex-1 text-xs sm:text-sm font-medium rounded-lg py-2 transition-all duration-200 ${watchedType === '1'
                      ? "bg-white shadow text-black"
                      : "text-gray-500 hover:text-black"
                      }`}
                  >
                    Lending
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setValue('type', '2');
                      setValue('recordType', '2');
                    }}
                    className={`flex-1 text-xs sm:text-sm font-medium rounded-lg py-2 transition-all duration-200 ${watchedType === '2'
                      ? "bg-white shadow text-black"
                      : "text-gray-500 hover:text-black"
                      }`}
                  >
                    Borrowing
                  </button>
                </div>
              </div>
            )}

            {/* Person Name */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <label htmlFor="personName" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Person Name
              </label>
              <input
                {...register('personName', { required: 'Person name is required' })}
                type="text"
                id="personName"
                placeholder="Enter person's name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
              {errors.personName && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.personName.message}</p>
              )}
            </div>

            {/* Due Date */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <DatePicker
                value={watchedValues.dueDate}
                onChange={(date) => setValue('dueDate', date)}
                label="Due Date"
                required
                minDate={new Date().toISOString().split('T')[0]}
              />
              {errors.dueDate && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.dueDate.message}</p>
              )}
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <label htmlFor="additionalDetail" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                {...register('additionalDetail')}
                id="additionalDetail"
                rows={3}
                placeholder="Enter additional details (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
            </div>
          </>
        )}

        {/* Step 2: Initial Transaction */}
        {(step === 2 || isEditing) && (
          <>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Add Initial Transaction</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Date */}
                <div>
                  <DatePicker
                    value={watchedValues.date}
                    onChange={(date) => setValue('date', date)}
                    label="Date"
                    required
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    {...register('amount', {
                      required: 'Amount is required',
                      min: { value: 0.01, message: 'Amount must be greater than 0' }
                    })}
                    type="number"
                    step="0.01"
                    id="amount"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  />
                  {errors.amount && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.amount.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 sm:mt-6">
                <label htmlFor="description" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  id="description"
                  rows={3}
                  placeholder="Enter transaction description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                />
                {errors.description && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Account */}
              <div className="mt-4 sm:mt-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Account
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsAccountModalOpen(true)}
                    className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm flex items-center"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Change
                  </button>
                </div>

                {selectedAccount ? (
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm sm:text-base font-medium">
                        {selectedAccount.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{selectedAccount.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500 capitalize">{selectedAccount.type}</p>
                    </div>
                  </div>
                  
                  {/* Payment Mode Selection */}
                  {selectedAccount.linkedPaymentModes && selectedAccount.linkedPaymentModes.length > 0 && (
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Payment Mode (Optional)
                      </label>
                      {selectedPaymentMode ? (
                        <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-blue-100">
                            <span className="text-blue-600 text-xs sm:text-sm font-medium">PM</span>
                          </div>
                          <div>
                            <p className="text-sm sm:text-base font-medium text-gray-900">{selectedPaymentMode.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{selectedPaymentMode.type}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedAccount.linkedPaymentModes.map((paymentMode) => (
                            <button
                              key={paymentMode.id}
                              type="button"
                              onClick={() => setValue('paymentModeId', paymentMode.id)}
                              className="p-2 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                              <p className="text-xs sm:text-sm font-medium text-gray-900">{paymentMode.name}</p>
                              <p className="text-xs text-gray-500">{paymentMode.type}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  </div>
                ) : (
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-500">
                    No account selected
                  </div>
                )}

                {errors.accountId && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.accountId.message}</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Error Messages */}
        {(createDebt.error || updateDebt.error) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-red-600">
              Failed to save debt. Please try again.
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {!isEditing && step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors text-sm sm:text-base font-medium"
            >
              Next: Add Transaction
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
            >
              {isPending ? 'Saving...' : isEditing ? 'Update Debt' : 'Create Debt'}
            </button>
          )}
          <button
            type="button"
            onClick={handleBack}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
        </div>
      </form>
      <AccountSelectModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        accounts={accounts}
        onSelect={(account) => {
          setValue('accountId', account.id);
          setValue('paymentModeId', '');
        }}
        onPaymentModeSelect={(paymentModeId) => setValue('paymentModeId', paymentModeId)}
        selectedAccount={selectedAccount}
        selectedPaymentModeId={watchedValues.paymentModeId}
        title="Select Account"
        showPaymentModes={true}
      />
    </div>
  );
}

export default DebtForm;