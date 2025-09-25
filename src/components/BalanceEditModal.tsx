import { useState, useEffect } from 'react';
import { X, DollarSign, Calculator } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Account } from '../types/account';
import { useFormatters } from '../hooks/useFormatters';
import CalculatorModal from './CalculatorModal';

interface BalanceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account;
  onSubmit: (data: {
    type: string;
    txnDate: string;
    txnTime: string;
    amount: number;
    description: string;
    accountId: string;
  }) => void;
  isPending?: boolean;
}

interface FormData {
  newBalance: number;
  description: string;
}

export default function BalanceEditModal({
  isOpen,
  onClose,
  account,
  onSubmit,
  isPending = false
}: BalanceEditModalProps) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const { formatCurrency } = useFormatters();
  
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      newBalance: account.currentBalance || 0,
      description: ''
    }
  });

  const watchedValues = watch();
  const currentBalance = account.currentBalance || 0;
  const adjustmentAmount = watchedValues.newBalance - currentBalance;

  useEffect(() => {
    if (isOpen) {
      setValue('newBalance', account.currentBalance || 0);
      setValue('description', '');
    }
  }, [isOpen, account.currentBalance, setValue]);

  const handleFormSubmit = (data: FormData) => {
    const adjustmentData = {
      type: "1", // Adjustment type
      txnDate: new Date().toISOString().split('T')[0],
      txnTime: new Date().toTimeString().slice(0, 8), // HH:MM:SS format
      amount: Math.abs(adjustmentAmount),
      description: data.description || `Balance adjustment: ${formatCurrency(currentBalance)} → ${formatCurrency(data.newBalance)}`,
      accountId: account.id
    };

    onSubmit(adjustmentData);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAmountChange = (amount: number) => {
    setValue('newBalance', amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Edit Balance
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Info */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {account.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{account.name}</p>
              <p className="text-sm text-gray-500">
                Current Balance: {formatCurrency(currentBalance)}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* New Balance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="newBalance" className="block text-sm font-medium text-gray-700">
                New Balance
              </label>
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(true)}
                className="text-indigo-600 hover:text-indigo-700 text-xs flex items-center gap-1"
              >
                <Calculator className="w-3 h-3" />
                Calculator
              </button>
            </div>
            <input
              {...register('newBalance', {
                required: 'New balance is required',
                min: { value: 0, message: 'Balance cannot be negative' }
              })}
              type="number"
              step="0.01"
              id="newBalance"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            {errors.newBalance && (
              <p className="mt-1 text-xs text-red-600">{errors.newBalance.message}</p>
            )}
          </div>

          {/* Adjustment Preview */}
          {adjustmentAmount !== 0 && (
            <div className={`p-3 rounded-lg border ${
              adjustmentAmount > 0 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <p className="text-sm font-medium text-gray-700">
                Adjustment: {adjustmentAmount > 0 ? '+' : ''}{formatCurrency(adjustmentAmount)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This will {adjustmentAmount > 0 ? 'increase' : 'decrease'} your account balance
              </p>
            </div>
          )}

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={3}
              placeholder="Enter reason for balance adjustment"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> This will create an adjustment transaction to correct your account balance. 
              Use this feature to sync your actual balance with the app.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isPending || adjustmentAmount === 0}
            className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Adjusting...' : 'Adjust Balance'}
          </button>
        </div>

        {/* Calculator Modal */}
        <CalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          onAmountChange={handleAmountChange}
          currentAmount={watchedValues.newBalance || 0}
        />
      </div>
    </div>
  );
}