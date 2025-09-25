import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

interface DebtAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    type: string;
    txnDate: string;
    txnTime: string;
    amount: number;
    description: string;
  }) => void;
  isPending?: boolean;
}

interface FormData {
  date: string;
  time: string;
  amount: number;
  description: string;
}

export default function DebtAdjustmentModal({
  isOpen,
  onClose,
  onSubmit,
  isPending = false
}: DebtAdjustmentModalProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      amount: 0,
      description: ''
    }
  });

  const watchedValues = watch();

  const handleFormSubmit = (data: FormData) => {
    onSubmit({
      type: "7", // Adjustment type
      txnDate: data.date,
      txnTime: data.time + ':00', // Add seconds
      amount: data.amount,
      description: data.description
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Debt Adjustment
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <DatePicker
                value={watchedValues.date}
                onChange={(date) => setValue('date', date)}
                label="Date"
                required
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <TimePicker
                value={watchedValues.time}
                onChange={(time) => setValue('time', time)}
                label="Time"
                required
              />
              {errors.time && (
                <p className="mt-1 text-xs text-red-600">{errors.time.message}</p>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Amount
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              id="description"
              rows={3}
              placeholder="Enter adjustment description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> Adjustments are used to correct debt amounts without affecting account balances. 
              This is useful for interest calculations, penalties, or other debt modifications.
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
            disabled={isPending}
            className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Creating...' : 'Create Adjustment'}
          </button>
        </div>
      </div>
    </div>
  );
}