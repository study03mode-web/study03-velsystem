import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
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
import MonthYearPicker from '../../components/MonthYearPicker';
import YearPicker from '../../components/YearPicker';
import { useFormatters } from '../../hooks/useFormatters';

const tabs = ['Monthly', 'Yearly'];

interface FormData {
  type: 'monthly' | 'yearly';
  year: number;
  month?: number;
  totalLimit: number;
  selectedCategories: string[];
  categoryLimits: { [categoryId: string]: number | undefined };
}

export default function BudgetForm() {
  const { formatCurrency } = useFormatters();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = Boolean(id);
  const budgetType = (searchParams.get('type') as 'monthly' | 'yearly') || 'monthly';
  const [activeTab, setActiveTab] = useState(budgetType === 'monthly' ? 0 : 1);
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const { data: categories = [] } = useCategoriesByType(1);
  const { data: budgetData } = useBudgetAnalysis(id || '');
  const createMonthlyBudget = useCreateMonthlyBudget();
  const createYearlyBudget = useCreateYearlyBudget();
  const updateMonthlyBudget = useUpdateMonthlyBudget();
  const updateYearlyBudget = useUpdateYearlyBudget();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      type: budgetType,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      totalLimit: undefined,
      selectedCategories: [],
      categoryLimits: {}
    }
  });

  const watchedValues = watch();
  const remainingBudget = Math.max(
    0,
    Number(watchedValues.totalLimit || 0) -
    Object.values(watchedValues.categoryLimits ?? {}).reduce(
      (sum: number, limit) => sum + Number(limit ?? 0),
      0
    )
  );

  // Populate form when editing
  useEffect(() => {
    if (isEditing && budgetData) {
      setValue('year', budgetData.year);
      if (budgetData.month) setValue('month', budgetData.month);
      setValue('totalLimit', budgetData.totalLimit);

      const categoryIds = budgetData.categories.map(cat => cat.categoryId);
      setSelectedCategories(categoryIds);
      setValue('selectedCategories', categoryIds);

      const limits: { [key: string]: number } = {};
      budgetData.categories.forEach(cat => {
        limits[cat.categoryId] = cat.limit;
      });
      setValue('categoryLimits', limits);

      setSelectAll(categoryIds.length === categories.length);
    }
  }, [isEditing, budgetData, setValue, categories.length]);

  // Select all categories by default if not editing
  useEffect(() => {
    if (!isEditing && categories.length > 0 && selectedCategories.length === 0) {
      const allCategoryIds = categories.map(cat => cat.id);
      setSelectedCategories(allCategoryIds);
      setValue('selectedCategories', allCategoryIds);

      // Leave categoryLimits empty so inputs show empty
      setValue('categoryLimits', {});

      setSelectAll(true);
    }
  }, [categories, setValue, isEditing, selectedCategories.length]);

  // Update type when tab changes
  useEffect(() => {
    const newType = activeTab === 0 ? 'monthly' : 'yearly';
    setValue('type', newType);
  }, [activeTab, setValue]);

  // Handle category selection
  const handleCategorySelection = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    setValue('selectedCategories', categoryIds);

    const currentLimits = watchedValues.categoryLimits || {};
    const newLimits: { [key: string]: number | undefined } = {};
    categoryIds.forEach(id => {
      if (currentLimits[id] !== undefined) {
        newLimits[id] = currentLimits[id];
      }
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

  const handleNext = () => setStep(2);
  const handleBack = () => step === 1 ? navigate('/budgets') : setStep(1);
  const isPending = createMonthlyBudget.isPending || createYearlyBudget.isPending ||
    updateMonthlyBudget.isPending || updateYearlyBudget.isPending;

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {step === 1 ? 'Back to Budgets' : 'Back to Budget Details'}
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Budget' : step === 1 ? 'Create Budget' : 'Set Category Limits'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isEditing
              ? 'Update budget details'
              : step === 1
                ? 'Set up your budget parameters'
                : 'Optionally set limits for individual categories'}
          </p>
        </div>
        {isEditing && (
          <Link
            to="/budgets"
            className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Edit className="w-4 h-4" /> Manage Budgets
          </Link>
        )}
      </div>

      {/* Tabs */}
      {!isEditing && step === 1 && (
        <div className="flex justify-evenly gap-2 bg-gray-100 rounded-full p-1 sm:w-fit mb-4">
          {tabs.map((tab, index) => {
            const active = activeTab === index;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${active ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}

      <form className="space-y-4">
        {/* Step 1 */}
        {(step === 1 || isEditing) && (
          <div className="grid gap-6">
            <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4">
              {activeTab === 0 ? (
                <MonthYearPicker
                  month={watchedValues.month || new Date().getMonth() + 1}
                  year={watchedValues.year}
                  onMonthChange={month => setValue('month', month)}
                  onYearChange={year => setValue('year', year)}
                  label="Budget Period"
                  required
                />
              ) : (
                <YearPicker
                  year={watchedValues.year}
                  onYearChange={year => setValue('year', year)}
                  label="Budget Year"
                  required
                />
              )}
              {(errors.month || errors.year) && <p className="text-red-600 text-xs">{errors.month?.message || errors.year?.message}</p>}
            </div>

            <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Total Budget Limit</label>
              <input
                {...register('totalLimit', {
                  required: 'Budget limit is required',
                  min: { value: 1, message: 'Budget must be greater than 0' }
                })}
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.totalLimit && <p className="text-red-600 text-xs">{errors.totalLimit.message}</p>}
            </div>

            <div className="bg-white rounded-xl shadow p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Included Categories</label>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedCategories.length === categories.length ? 'All categories' : `${selectedCategories.length} categories included`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-xs flex items-center"
                >
                  <Edit className="w-4 h-4 mr-1" /> Change
                </button>
              </div>

              {selectedCategories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {selectedCategories.map(id => {
                    const cat = categories.find(c => c.id === id);
                    if (!cat) return null;
                    return (
                      <div key={id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                        <CategoryIcon icon={cat.icon} color={cat.color} size="sm" />
                        <span className="text-xs font-medium text-gray-900 truncate">{cat.name}</span>
                      </div>
                    );
                  })}
                </div>
              ) : <div className="text-center text-gray-500 py-3 text-sm">No categories selected</div>}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {(step === 2 || isEditing) && (
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[120px] bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Total Budget</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(watchedValues.totalLimit)}</p>
              </div>
              <div className="flex-1 min-w-[120px] bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Remaining</p>
                <p className={`text-sm font-semibold text-green-600`}>
                  {formatCurrency(remainingBudget)}
                </p>
              </div>
            </div>

            {selectedCategories.length > 0 ? (
              <div className="grid gap-3">
                {selectedCategories.map(id => {
                  const cat = categories.find(c => c.id === id);
                  if (!cat) return null;
                  return (
                    <div key={id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <CategoryIcon icon={cat.icon} color={cat.color} />
                      <p className="flex-1 text-sm font-medium text-gray-900">{cat.name}</p>
                      <input
                        {...register(`categoryLimits.${id}`, { min: { value: 0, message: 'Limit cannot be negative' } })}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  );
                })}
              </div>
            ) : <div className="text-center py-6 text-gray-500 text-sm">No categories selected for budget limits</div>}
          </div>
        )}

        {/* Errors */}
        {(createMonthlyBudget.error || createYearlyBudget.error || updateMonthlyBudget.error || updateYearlyBudget.error) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
            Failed to save budget. Please try again.
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={step === 1 && !isEditing ? handleNext : handleSubmit(onSubmit)}
            disabled={isPending || (step === 1 && (!watchedValues.totalLimit || watchedValues.totalLimit <= 0))}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition"
          >
            {isPending ? 'Saving...' : step === 1 ? 'Next: Set Category Limits' : isEditing ? 'Update Budget' : 'Create Budget'}
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition text-sm font-medium"
          >
            {step === 1 || isEditing ? 'Cancel' : 'Back'}
          </button>
        </div>
      </form>

      {/* Category Modal */}
      <CategorySelectModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onSelect={() => { }}
        title="Select Categories for Budget"
        multiSelect
        selectedCategories={selectedCategories}
        onMultiSelect={handleCategorySelection}
        showSelectAll
        onSelectAll={handleSelectAll}
        selectAll={selectAll}
      />
    </div>
  );
}