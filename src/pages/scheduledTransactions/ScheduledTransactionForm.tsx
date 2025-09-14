import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calculator as CalculatorIcon, RefreshCw, Bell } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  useCreateScheduledTransaction,
  useUpdateScheduledTransaction,
  useScheduledTransaction
} from '../../hooks/useScheduledTransactions';
import {
  useCategoriesByType,
  useDefaultCategory
} from '../../hooks/useCategories';
import {
  useAccounts,
  useDefaultPaymentMode
} from '../../hooks/useAccounts';
import { CreateScheduledTransactionData, FrequencyType, EndType, FREQUENCY_OPTIONS, EARLY_REMINDER_OPTIONS, END_TYPE_OPTIONS } from '../../types/scheduledTransaction';
import CalculatorModal from '../../components/CalculatorModal';
import CategorySelectModal from '../../components/CategorySelectModal';
import AccountSelectModal from '../../components/AccountSelectModal';
import FrequencyModal from '../../components/FrequencyModal';
import EarlyReminderModal from '../../components/EarlyReminderModal';
import CategoryIcon from '../../components/CategoryIcon';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';

const tabs = ['Expense', 'Income', 'Transfer'];

interface FormData {
  startDate: string;
  startTime: string;
  amount: number;
  description: string;
  frequencyType: FrequencyType;
  frequencyInterval: number;
  endType: EndType;
  occurrence: number;
  remainderDays: number;
  tags: string[];
  categoryId?: string;
  accountId?: string;
  paymentModeId?: string;
  fromAccountId?: string;
  toAccountId?: string;
  fromPaymentModeId?: string;
  toPaymentModeId?: string;
}

function ScheduledTransactionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const defaultTags = ['subscription', 'recurring', 'monthly', 'bills', 'salary', 'rent', 'utilities', 'insurance'];
  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isToAccountModalOpen, setIsToAccountModalOpen] = useState(false);
  const [isFromAccountModalOpen, setIsFromAccountModalOpen] = useState(false);
  const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);
  const [isEarlyReminderModalOpen, setIsEarlyReminderModalOpen] = useState(false);

  const { data: transaction, isLoading: transactionLoading } = useScheduledTransaction(id || '');
  const createTransaction = useCreateScheduledTransaction();
  const updateTransaction = useUpdateScheduledTransaction();

  // Get categories and accounts
  const currentType = activeTab === 0 ? 1 : activeTab === 1 ? 2 : 1; // For transfer, use expense categories
  const { data: categories = [] } = useCategoriesByType(currentType);
  const { data: defaultCategory } = useDefaultCategory(currentType);
  const { data: accounts = [] } = useAccounts();
  const { data: defaultPaymentMode } = useDefaultPaymentMode();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      startDate: new Date().toISOString().split('T')[0],
      startTime: '00:00:00',
      amount: 0,
      description: '',
      frequencyType: 'NONE',
      frequencyInterval: 1,
      endType: 'NONE',
      occurrence: 1,
      remainderDays: 0,
      tags: [],
      categoryId: '',
      accountId: '',
      paymentModeId: '',
      fromAccountId: '',
      toAccountId: '',
      fromPaymentModeId: '',
      toPaymentModeId: ''
    }
  });

  const watchedValues = watch();
  const selectedCategory = categories.find(cat => cat.id === watchedValues.categoryId);
  const selectedAccount = accounts.find(acc => acc.id === watchedValues.accountId);
  const selectedFromAccount = accounts.find(acc => acc.id === watchedValues.fromAccountId);
  const selectedToAccount = accounts.find(acc => acc.id === watchedValues.toAccountId);
  const selectedPaymentMode = selectedAccount?.linkedPaymentModes?.find(pm => pm.id === watchedValues.paymentModeId);

  // Load existing transaction data for editing
  useEffect(() => {
    if (isEditing && transaction) {
      const transactionType = transaction.type;
      setActiveTab(transactionType === 'EXPENSE' ? 0 : transactionType === 'INCOME' ? 1 : 2);
      setValue('startDate', transaction.startDate);
      setValue('startTime', transaction.time);
      setValue('amount', transaction.amount);
      setValue('description', transaction.description);
      setValue('frequencyType', transaction.frequencyType);
      setValue('frequencyInterval', transaction.frequencyInterval);
      setValue('endType', transaction.endType);
      setValue('occurrence', transaction.occurrence);
      setValue('remainderDays', transaction.remainderDays || 0);
      setValue('tags', transaction.tags?.map(tag => tag.name) || []);
      setValue('categoryId', transaction.category?.id || '');
      setValue('accountId', transaction.account?.id || '');
      setValue('paymentModeId', transaction.paymentMode?.id || '');
      setValue('fromAccountId', transaction.fromAccount?.id || '');
      setValue('toAccountId', transaction.toAccount?.id || '');
      setValue('fromPaymentModeId', transaction.fromPaymentMode?.id || '');
      setValue('toPaymentModeId', transaction.toPaymentMode?.id || '');
    }
  }, [isEditing, transaction, setValue]);

  // Set defaults when not editing
  useEffect(() => {
    if (!isEditing) {
      if (defaultCategory && activeTab !== 2) {
        setValue('categoryId', defaultCategory.id);
      }

      if (defaultPaymentMode) {
        setValue('accountId', defaultPaymentMode.id);
      }
    }
  }, [defaultCategory, defaultPaymentMode, activeTab, isEditing, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const transactionData: CreateScheduledTransactionData = {
        startDate: data.startDate,
        startTime: data.startTime,
        amount: data.amount,
        description: data.description,
        frequencyType: data.frequencyType,
        frequencyInterval: data.frequencyInterval,
        endType: data.endType,
        occurrence: data.occurrence,
        remainderDays: data.remainderDays,
        tags: data.tags,
        categoryId: activeTab === 2 ? undefined : data.categoryId,
        accountId: activeTab === 2 ? undefined : data.accountId,
        paymentModeId: activeTab === 2 ? undefined : data.paymentModeId,
        fromAccountId: activeTab === 2 ? data.fromAccountId : undefined,
        toAccountId: activeTab === 2 ? data.toAccountId : undefined,
        fromPaymentModeId: activeTab === 2 ? data.fromPaymentModeId : undefined,
        toPaymentModeId: activeTab === 2 ? data.toPaymentModeId : undefined
      };

      const transactionType = activeTab === 0 ? 'expense' : activeTab === 1 ? 'income' : 'transfer';

      if (isEditing && id) {
        await updateTransaction.mutateAsync({
          id,
          data: transactionData,
          transactionType
        });
      } else {
        await createTransaction.mutateAsync({
          ...transactionData,
          transactionType
        });
      }
    } catch (error) {
      console.error('Failed to save scheduled transaction:', error);
    }
  };

  const handleAmountChange = (amount: number) => {
    setValue('amount', amount);
  };

  const toggleTag = (tag: string) => {
    const currentTags = watch('tags');
    if (currentTags.includes(tag)) {
      setValue('tags', currentTags.filter(t => t !== tag));
    } else {
      setValue('tags', [...currentTags, tag]);
    }
  };

  const addNewTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !watch('tags').includes(trimmedTag)) {
      setValue('tags', [...watch('tags'), trimmedTag]);
    }
    setNewTag('');
  };

  const isPending = createTransaction.isPending || updateTransaction.isPending;

  if (isEditing && transactionLoading) {
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
          onClick={() => navigate('/scheduled')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          Back to Scheduled Transactions
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Scheduled Transaction' : 'Add Scheduled Transaction'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {isEditing ? 'Update scheduled transaction details' : 'Create a recurring financial transaction'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Transaction Type Tabs */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4">
            Transaction Type
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {tabs.map((tab, index) => {
              const active = activeTab === index;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 text-xs sm:text-sm font-medium rounded-lg py-2 transition-all duration-200 ${active
                    ? "bg-white shadow text-black"
                    : "text-gray-500 hover:text-black"
                    }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <DatePicker
              value={watchedValues.startDate}
              onChange={(date) => setValue('startDate', date)}
              label="Start Date"
              required
              minDate={new Date().toISOString().split('T')[0]}
            />
            {errors.startDate && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <TimePicker
              value={watchedValues.startTime}
              onChange={(time) => setValue('startTime', time + ':00')}
              label="Start Time"
              required
            />
            {errors.startTime && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.startTime.message}</p>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="amount" className="block text-sm sm:text-base font-medium text-gray-700">
              Amount
            </label>
            <button
              type="button"
              onClick={() => setIsCalculatorOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm flex items-center"
            >
              <CalculatorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Calculator
            </button>
          </div>
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

        {/* Category (for Expense and Income) */}
        {activeTab !== 2 && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <label className="block text-sm sm:text-base font-medium text-gray-700">
                Category
              </label>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(true)}
                className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm flex items-center"
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Change
              </button>
            </div>

            {selectedCategory ? (
              <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <CategoryIcon icon={selectedCategory.icon} color={selectedCategory.color} />
                <span className="text-sm sm:text-base font-medium text-gray-900">{selectedCategory.name}</span>
              </div>
            ) : (
              <div className="p-2 sm:p-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-500">
                No category selected
              </div>
            )}
          </div>
        )}

        {/* Account (for Expense and Income) */}
        {activeTab !== 2 && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
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

                {/* Payment Mode for non-transfer transactions */}
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
          </div>
        )}

        {/* Transfer Accounts */}
        {activeTab === 2 && (
          <div className="space-y-4 sm:space-y-6">
            {/* From Account */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  From Account
                </label>
                <button
                  type="button"
                  onClick={() => setIsFromAccountModalOpen(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm flex items-center"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Change
                </button>
              </div>

              {selectedFromAccount ? (
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm sm:text-base font-medium">
                      {selectedFromAccount.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">{selectedFromAccount.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 capitalize">{selectedFromAccount.type}</p>
                  </div>
                </div>
              ) : (
                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-500">
                  No account selected
                </div>
              )}
            </div>

            {/* To Account */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  To Account
                </label>
                <button
                  type="button"
                  onClick={() => setIsToAccountModalOpen(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm flex items-center"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Change
                </button>
              </div>

              {selectedToAccount ? (
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm sm:text-base font-medium">
                      {selectedToAccount.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">{selectedToAccount.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 capitalize">{selectedToAccount.type}</p>
                  </div>
                </div>
              ) : (
                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-500">
                  No account selected
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
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

        {/* Tags */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
            Tags <span className="text-xs sm:text-sm text-gray-500">(optional)</span>
          </label>
          <div className="flex flex-col gap-2">
            {/* Input to add new tag */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNewTag())}
                placeholder="Add a new tag"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={addNewTag}
                className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-indigo-700 text-sm sm:text-base"
              >
                Add
              </button>
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {watch('tags')?.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm border bg-indigo-600 text-white border-indigo-600"
                >
                  {tag} ×
                </button>
              ))}
            </div>

            {/* Default Tags */}
            {watch('tags').length < defaultTags.length && (
              <div className="flex flex-wrap gap-2">
                {defaultTags
                  .filter(tag => !watch('tags').includes(tag))
                  .slice(0, 3)
                  .map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm border bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    >
                      + {tag}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Frequency */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <label className="block text-sm sm:text-base font-medium text-gray-700">
              Frequency
            </label>
            <button
              type="button"
              onClick={() => setIsFrequencyModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm flex items-center"
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Change
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className="text-sm sm:text-base font-medium text-gray-900">
                {FREQUENCY_OPTIONS[watchedValues.frequencyType]}
                {watchedValues.frequencyType !== 'NONE' && watchedValues.frequencyInterval > 1 && 
                  ` (every ${watchedValues.frequencyInterval} ${watchedValues.frequencyType.toLowerCase()}s)`
                }
              </span>
            </div>
            
            {watchedValues.endType !== 'NONE' && (
              <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-600">
                  {END_TYPE_OPTIONS[watchedValues.endType]}
                  {watchedValues.endType === 'OCCURRENCE' && ` (${watchedValues.occurrence} times)`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Early Reminder */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <label className="block text-sm sm:text-base font-medium text-gray-700">
              Early Reminder
            </label>
            <button
              type="button"
              onClick={() => setIsEarlyReminderModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm flex items-center"
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Change
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            <span className="text-sm sm:text-base font-medium text-gray-900">
              {EARLY_REMINDER_OPTIONS.find(option => option.value === watchedValues.remainderDays)?.label || 'None'}
            </span>
          </div>
        </div>

        {/* Error Messages */}
        {(createTransaction.error || updateTransaction.error) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-red-600">
              Failed to save scheduled transaction. Please try again.
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
            {isPending ? 'Saving...' : isEditing ? 'Update Scheduled Transaction' : 'Create Scheduled Transaction'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/scheduled')}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Modals */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onAmountChange={handleAmountChange}
        currentAmount={watchedValues.amount || 0}
      />

      <CategorySelectModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onSelect={(category) => setValue('categoryId', category.id)}
        selectedCategory={selectedCategory}
        title={`Select ${tabs[activeTab]} Category`}
      />

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

      <AccountSelectModal
        isOpen={isFromAccountModalOpen}
        onClose={() => setIsFromAccountModalOpen(false)}
        accounts={accounts}
        onSelect={(account) => {
          setValue('fromAccountId', account.id);
          setValue('fromPaymentModeId', '');
        }}
        onPaymentModeSelect={(paymentModeId) => setValue('fromPaymentModeId', paymentModeId)}
        selectedAccount={selectedFromAccount}
        selectedPaymentModeId={watchedValues.fromPaymentModeId}
        title="Select From Account"
        showPaymentModes={true}
      />

      <AccountSelectModal
        isOpen={isToAccountModalOpen}
        onClose={() => setIsToAccountModalOpen(false)}
        accounts={accounts}
        onSelect={(account) => {
          setValue('toAccountId', account.id);
          setValue('toPaymentModeId', '');
        }}
        onPaymentModeSelect={(paymentModeId) => setValue('toPaymentModeId', paymentModeId)}
        selectedAccount={selectedToAccount}
        selectedPaymentModeId={watchedValues.toPaymentModeId}
        title="Select Destination Account"
        excludeAccountId={watchedValues.fromAccountId}
        showPaymentModes={true}
      />

      <FrequencyModal
        isOpen={isFrequencyModalOpen}
        onClose={() => setIsFrequencyModalOpen(false)}
        currentFrequency={watchedValues.frequencyType}
        currentEndType={watchedValues.endType}
        currentInterval={watchedValues.frequencyInterval}
        currentOccurrence={watchedValues.occurrence}
        onUpdate={(frequency, endType, interval, occurrence) => {
          setValue('frequencyType', frequency);
          setValue('endType', endType);
          setValue('frequencyInterval', interval);
          setValue('occurrence', occurrence);
        }}
      />

      <EarlyReminderModal
        isOpen={isEarlyReminderModalOpen}
        onClose={() => setIsEarlyReminderModalOpen(false)}
        currentReminder={watchedValues.remainderDays}
        onUpdate={(reminder) => setValue('remainderDays', reminder)}
      />
    </div>
  );
}

export default ScheduledTransactionForm;