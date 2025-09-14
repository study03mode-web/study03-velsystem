import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  useCreateMonthlyBudget,
  useCreateYearlyBudget,
  useUpdateMonthlyBudget,
  useUpdateYearlyBudget,
  useBudgetAnalysis
} from '../../hooks/useBudgets';
import { useCategoriesByType } from '../../hooks/useCategories';
import { CreateMonthlyBudgetData, CreateYearlyBudgetData, CategoryLimit } from '../../types/budget';
import CategorySelectModal from '../../components/CategorySelectModal';
import CategoryIcon from '../../components/CategoryIcon';
import { formatCurrency } from '../../utils/formatters';
import MonthYearPicker from '../../components/MonthYearPicker';
import YearPicker from '../../components/YearPicker';

const tabs = ['Monthly', 'Yearly'];

interface FormData {
  type: 'monthly' | 'yearly';
  year: number;
  month?: number;
  totalLimit: number;
  selectedCategories: string[];
  categoryLimits: { [categoryId: string]: number };
}

function BudgetForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = Boolean(id);
  const budgetType = searchParams.get('type') as 'monthly' | 'yearly' || 'monthly';
  const [activeTab, setActiveTab] = useState(budgetType === 'monthly' ? 0 : 1);
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const { data: categories = [] } = useCategoriesByType(1); // Expense categories
  const { data: budgetData } = useBudgetAnalysis(id || '', budgetType);
  const createMonthlyBudget = useCreateMonthlyBudget();
  const createYearlyBudget = useCreateYearlyBudget();
  const updateMonthlyBudget = useUpdateMonthlyBudget();
  const updateYearlyBudget = useUpdateYearlyBudget();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      type: budgetType,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      totalLimit: 0,
      selectedCategories: [],
      categoryLimits: {}
    }
  });

  const watchedValues = watch();
  const remainingBudget = watchedValues.totalLimit - Object.values(watchedValues.categoryLimits || {}).reduce((sum, limit) => sum + (limit || 0), 0);

  // Load existing budget data for editing
  useEffect(() => {
    if (isEditing && budgetData) {
      setValue('year', budgetData.year);
      if (budgetData.month) setValue('month', budgetData.month);
      setValue('totalLimit', budgetData.budget);

      const categoryIds = budgetData.categories.map(cat => cat.categoryId);
      setSelectedCategories(categoryIds);
      setValue('selectedCategories', categoryIds);

      const limits: { [key: string]: number } = {};
      budgetData.categories.forEach(cat => {
        limits[cat.categoryId] = cat.limit;
      });
      setValue('categoryLimits', limits);
    }
  }, [isEditing, budgetData, setValue]);

  // Update form type when tab changes
  useEffect(() => {
    const newType = activeTab === 0 ? 'monthly' : 'yearly';
    setValue('type', newType);
  }, [activeTab, setValue]);

  const handleCategorySelection = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    setValue('selectedCategories', categoryIds);

    // Reset category limits for unselected categories
    const currentLimits = watchedValues.categoryLimits || {};
    const newLimits: { [key: string]: number } = {};
    categoryIds.forEach(id => {
      newLimits[id] = currentLimits[id] || 0;
    });
    setValue('categoryLimits', newLimits);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      handleCategorySelection([]);
    } else {
      handleCategorySelection(categories.map(cat => cat.id));
    }
    setSelectAll(!selectAll);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const categoryLimits: CategoryLimit[] = selectedCategories.map(categoryId => ({
        categoryId,
        categoryLimit: data.categoryLimits[categoryId] || 0
      }));

      if (data.type === 'monthly') {
        const budgetData: CreateMonthlyBudgetData = {
          year: data.year,
          month: data.month!,
          totalLimit: data.totalLimit,
          categoryLimits
        };

        if (isEditing && id) {
          await updateMonthlyBudget.mutateAsync({ id, data: budgetData });
        } else {
          await createMonthlyBudget.mutateAsync(budgetData);
        }
      } else {
        const budgetData: CreateYearlyBudgetData = {
          year: data.year,
          totalLimit: data.totalLimit,
          categoryLimits
        };

        if (isEditing && id) {
          await updateYearlyBudget.mutateAsync({ id, data: budgetData });
        } else {
          await createYearlyBudget.mutateAsync(budgetData);
        }
      }
    } catch (error) {
      console.error('Failed to save budget:', error);
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/budgets');
    } else {
      setStep(1);
    }
  };

  const isPending = createMonthlyBudget.isPending || createYearlyBudget.isPending ||
    updateMonthlyBudget.isPending || updateYearlyBudget.isPending;

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          {step === 1 ? 'Back to Budgets' : 'Back to Budget Details'}
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Budget' : step === 1 ? 'Create Budget' : 'Set Category Limits'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {isEditing
            ? 'Update budget details'
            : step === 1
              ? 'Set up your budget parameters'
              : 'Optionally set limits for individual categories'
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
            <span className="text-xs sm:text-sm text-gray-600">Budget Details</span>
            <span className="text-xs sm:text-sm text-gray-600">Category Limits</span>
          </div>
        </div>
      )}

      <form className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Step 1: Budget Details */}
        {(step === 1 || isEditing) && (
          <>
            {/* Budget Type */}
            {!isEditing && (
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4">
                  Budget Type
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
            )}

            {/* Budget Period */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              {activeTab === 0 ? (
                <MonthYearPicker
                  month={watchedValues.month || new Date().getMonth() + 1}
                  year={watchedValues.year}
                  onMonthChange={(month) => setValue('month', month)}
                  onYearChange={(year) => setValue('year', year)}
                  label="Budget Period"
                  required
                />
              ) : (
                <YearPicker
                  year={watchedValues.year}
                  onYearChange={(year) => setValue('year', year)}
                  label="Budget Year"
                  required
                />
              )}
              {(errors.month || errors.year) && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {errors.month?.message || errors.year?.message}
                </p>
              )}
            </div>

            {/* Total Budget Limit */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <label htmlFor="totalLimit" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                What is your total budget limit?
              </label>
              <input
                {...register('totalLimit', {
                  required: 'Budget limit is required',
                  min: { value: 1, message: 'Budget must be greater than 0' }
                })}
                type="number"
                step="0.01"
                id="totalLimit"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
              {errors.totalLimit && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.totalLimit.message}</p>
              )}
            </div>

            {/* Included Categories */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Included Categories
                  </label>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {selectedCategories.length === categories.length
                      ? 'All categories'
                      : `${selectedCategories.length} categories included in your budget`
                    }
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm flex items-center"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Change
                </button>
              </div>

              {selectedCategories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                  {selectedCategories.map(categoryId => {
                    const category = categories.find(cat => cat.id === categoryId);
                    if (!category) return null;
                    return (
                      <div key={categoryId} className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 bg-gray-50 rounded-lg">
                        <CategoryIcon icon={category.icon} color={category.color} size="sm" />
                        <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                          {category.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                  No categories selected
                </div>
              )}
            </div>
          </>
        )}

        {/* Step 2: Category Limits */}
        {(step === 2 || isEditing) && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                Set category-wise limits (Optional)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Set limits on categories within your budget, if you want
              </p>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Total Budget:</span>
                  <span className="font-medium">{formatCurrency(watchedValues.totalLimit)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm mt-1">
                  <span className="text-gray-600">Remaining:</span>
                  <span className={`font-medium ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                   {formatCurrency(remainingBudget)}
                  </span>
                </div>
              </div>
            </div>

            {selectedCategories.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {selectedCategories.map(categoryId => {
                  const category = categories.find(cat => cat.id === categoryId);
                  if (!category) return null;
                  return (
                    <div key={categoryId} className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                      <CategoryIcon icon={category.icon} color={category.color} />
                      <div className="flex-1">
                        <p className="text-sm sm:text-base font-medium text-gray-900">{category.name}</p>
                      </div>
                      <div className="w-24 sm:w-32">
                        <input
                          {...register(`categoryLimits.${categoryId}`, {
                            min: { value: 0, message: 'Limit cannot be negative' }
                          })}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8 text-xs sm:text-sm text-gray-500">
                No categories selected for budget limits
              </div>
            )}
          </div>
        )}

        {/* Error Messages */}
        {(createMonthlyBudget.error || createYearlyBudget.error ||
          updateMonthlyBudget.error || updateYearlyBudget.error) && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-red-600">
                Failed to save budget. Please try again.
              </div>
            </div>
          )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {step === 1 ? (
            <button
              type="button"
              onClick={isEditing ?handleSubmit(onSubmit):handleNext}
              disabled={isPending || selectedCategories.length === 0 || !watchedValues.totalLimit || watchedValues.totalLimit <= 0}
              className="flex-1 bg-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Saving...' : isEditing ? 'Update Budget' :'Next: Set Category Limits'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="flex-1 bg-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
            >
              {isPending ? 'Saving...' : isEditing ? 'Update Budget' : 'Create Budget'}
            </button>
          )}
          <button
            type="button"
            onClick={handleBack}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
          >
            {step === 1 || isEditing ? 'Cancel' : 'Back'}
          </button>
        </div>
      </form>

      {/* Category Selection Modal */}
      <CategorySelectModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onSelect={() => { }} // Not used in this context
        title="Select Categories for Budget"
        multiSelect={true}
        selectedCategories={selectedCategories}
        onMultiSelect={handleCategorySelection}
        showSelectAll={true}
        onSelectAll={handleSelectAll}
        selectAll={selectAll}
      />
    </div>
  );
}

export default BudgetForm;