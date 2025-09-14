import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CreatePaymentModeData, PAYMENT_MODE_TYPES, PaymentModeType } from '../types/account';

interface PaymentModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
  onPaymentModeAdded: (paymentMode: CreatePaymentModeData) => void;
}

export default function PaymentModeModal({ 
  isOpen, 
  onClose, 
  onPaymentModeAdded 
}: PaymentModeModalProps) {
  const [selectedType, setSelectedType] = useState<PaymentModeType>('1');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePaymentModeData>({
    defaultValues: {
      name: '',
      type: 1
    }
  });

  const onSubmit = (data: CreatePaymentModeData) => {
    const paymentModeData = {
      ...data,
      type: selectedType as unknown as 1 | 2 | 3 | 4
    };
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Add Payment Mode
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Payment Mode Name
            </label>
            <input
              {...register('name', { required: 'Payment mode name is required' })}
              type="text"
              id="name"
              placeholder="Enter payment mode name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
            {errors.name && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
              Payment Mode Type
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {Object.entries(PAYMENT_MODE_TYPES).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedType(value as PaymentModeType)}
                  className={`p-2 sm:p-3 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
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


          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Add Payment Mode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}