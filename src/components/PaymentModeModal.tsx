import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CreatePaymentModeData, PAYMENT_MODE_TYPES, PaymentModeType } from '../types/account';

interface PaymentModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
  onPaymentModeAdded: (paymentMode: CreatePaymentModeData) => void;
  isPending?: boolean;
}

export default function PaymentModeModal({ 
  isOpen, 
  onClose, 
  onPaymentModeAdded,
  isPending = false
}: PaymentModeModalProps) {
  const [selectedType, setSelectedType] = useState<PaymentModeType>('1');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePaymentModeData>({
    defaultValues: { name: '', type: 1 }
  });

  const onSubmit = (data: CreatePaymentModeData) => {
    const paymentModeData = { ...data, type: selectedType as unknown as 1 | 2 | 3 | 4 };
    onPaymentModeAdded(paymentModeData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setSelectedType('1');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add Payment Mode</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 overflow-y-auto">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Mode Name
            </label>
            <input
              {...register('name', { required: 'Payment mode name is required' })}
              type="text"
              id="name"
              placeholder="Enter payment mode name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              autoFocus
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode Type</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(PAYMENT_MODE_TYPES).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedType(value as PaymentModeType)}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedType === value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedType || isPending}
              className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              {isPending ? 'Adding...' : 'Add Payment Mode'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}