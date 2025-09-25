import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { 
  useCreatePaidDebtTransaction, 
  useCreateReceivedDebtTransaction,
  useUpdatePaidDebtTransaction,
  useUpdateReceivedDebtTransaction,
  useDebtRecord 
} from '../../../hooks/useDebts';
import { useAccounts, useDefaultPaymentMode } from '../../../hooks/useAccounts';
import { CreateDebtRecordData } from '../../../types/debt';
import AccountSelectModal from '../../../components/AccountSelectModal';
import DatePicker from '../../../components/DatePicker';
import TimePicker from '../../../components/TimePicker';

interface FormData {
  date: string;
  time: string;
  amount: number;
  description: string;
  accountId: string;
  paymentModeId?: string;
  type: '1' | '2';
}

function DebtRecordForm() {
  const { debtId, recordId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = Boolean(recordId);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const recordType = location.state?.recordType as '1' | '2' | undefined;

  const { data: record, isLoading: recordLoading } = useDebtRecord(recordId || '');
  const { data: accounts = [] } = useAccounts();
  const { data: defaultPaymentMode } = useDefaultPaymentMode();
  
  // Use appropriate mutation based on record type
  const createPaidRecord = useCreatePaidDebtTransaction();
  const createReceivedRecord = useCreateReceivedDebtTransaction();
  const updatePaidRecord = useUpdatePaidDebtTransaction();
  const updateReceivedRecord = useUpdateReceivedDebtTransaction();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      amount: 0,
      description: '',
      accountId: '',
      paymentModeId: '',
      type: recordType || '1'
    }
  });

  const watchedValues = watch();
  const selectedAccount = accounts.find(acc => acc.id === watchedValues.accountId);
  const selectedPaymentMode = selectedAccount?.linkedPaymentModes?.find(pm => pm.id === watchedValues.paymentModeId);

  // Load existing record data for editing
  useEffect(() => {
    if (isEditing && record) {
      setValue('date', record.date);
      if (record.time) {
        setValue('time', `${record.time.hour.toString().padStart(2, '0')}:${record.time.minute.toString().padStart(2, '0')}`);
      }
      setValue('amount', record.amount);
      setValue('description', record.description);
      setValue('accountId', record.accountId);
      setValue('paymentModeId', record.paymentModeId || '');
      setValue('type', record.type);
    }
  }, [isEditing, record, setValue]);

  // Set default account when not editing
  useEffect(() => {
    if (!isEditing && defaultPaymentMode) {
      setValue('accountId', defaultPaymentMode.id);
    }
  }, [defaultPaymentMode, isEditing, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const [hours, minutes] = data.time.split(':').map(Number);
      
      const recordData: CreateDebtRecordData = {
        date: data.date,
        time: {
          hour: hours,
          minute: minutes,
          second: 0,
          nano: 0
        },
        amount: data.amount,
        description: data.description,
        accountId: data.accountId,
        paymentModeId: data.paymentModeId,
        type: data.type
      };

      if (isEditing && recordId) {
        // Use appropriate update mutation based on record type
        if (data.type === '1') {
          await updatePaidRecord.mutateAsync({ id: recordId, data: recordData });
        } else {
          await updateReceivedRecord.mutateAsync({ id: recordId, data: recordData });
        }
      } else if (debtId) {
        // Use appropriate create mutation based on record type
        if (data.type === '1') {
          await createPaidRecord.mutateAsync({ debtId, data: recordData });
        } else {
          await createReceivedRecord.mutateAsync({ debtId, data: recordData });
        }
      }

      navigate(`/debts/${debtId}/records`);
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };

  const isPending = createPaidRecord.isPending || createReceivedRecord.isPending || 
                   updatePaidRecord.isPending || updateReceivedRecord.isPending;

  if (isEditing && recordLoading) {
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
          onClick={() => navigate(`/debts/${debtId}/records`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          Back to Records
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Record' : 'Add Record'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {isEditing ? 'Update record details' : 'Add a new debt record'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        {/* Record Type */}
        {!isEditing && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4">
              Record Type
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setValue('type', '1')}
                className={`flex-1 text-xs sm:text-sm font-medium rounded-lg py-2 transition-all duration-200 ${register('type').value === '1' || recordType === '1'
                    ? "bg-white shadow text-black"
                    : "text-gray-500 hover:text-black"
                  }`}
              >
                Money Paid
              </button>
              <button
                type="button"
                onClick={() => setValue('type', '2')}
                className={`flex-1 text-xs sm:text-sm font-medium rounded-lg py-2 transition-all duration-200 ${register('type').value === '2' || recordType === '2'
                    ? "bg-white shadow text-black"
                    : "text-gray-500 hover:text-black"
                  }`}
              >
                Money Received
              </button>
            </div>
          </div>
        )}

        {/* Date and Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
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

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <TimePicker
              value={watchedValues.time}
              onChange={(time) => setValue('time', time)}
              label="Time"
              required
            />
            {errors.time && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
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

        {/* Description */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label htmlFor="description" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            id="description"
            rows={3}
            placeholder="Enter record description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          />
          {errors.description && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Account */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
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
                          className={`p-2 text-left border rounded-lg transition-colors ${
                            watchedValues.paymentModeId === paymentMode.id
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
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

        {/* Error Messages */}
        {(createPaidRecord.error || createReceivedRecord.error || 
          updatePaidRecord.error || updateReceivedRecord.error) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-red-600">
              Failed to save record. Please try again.
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
          >
            {isPending ? 'Saving...' : isEditing ? 'Update Record' : 'Create Record'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/debts/${debtId}/records`)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Account Selection Modal */}
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

export default DebtRecordForm;