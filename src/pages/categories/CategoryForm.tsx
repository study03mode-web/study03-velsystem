import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreateCategory, useUpdateCategory, useCategory } from '../../hooks/useCategories';
import { CATEGORY_COLORS, CATEGORY_ICONS, colorMap, iconTitle } from '../../types/category';
import CategoryIcon from '../../components/CategoryIcon';

const tabs = ['Expense', 'Income'];

interface FormData {
  name: string;
  type: number;
  color: string;
  icon: string;
}

function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedColor, setSelectedColor] = useState('indigo');
  const [selectedIcon, setSelectedIcon] = useState('coffee');

  const { data: category, isLoading: categoryLoading } = useCategory(id || '');
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      type: 1,
      color: 'indigo',
      icon: 'coffee'
    }
  });

  const watchedType = watch('type');

  // Load existing category data for editing
  useEffect(() => {
    if (isEditing && category) {
      if (category) {
        setValue('name', category.name);
        setValue('type', category.type);
        setValue('color', category.color);
        setValue('icon', category.icon);
        setActiveTab(category.type === 1 ? 0 : 1);
        setSelectedColor(category.color);
        setSelectedIcon(category.icon);
      }
    }
  }, [isEditing, category, setValue]);

  // Update form type when tab changes
  useEffect(() => {
    const newType = activeTab === 0 ? 1 : 2;
    setValue('type', newType);
  }, [activeTab, setValue]);

  // Update form values when selections change
  useEffect(() => {
    setValue('color', selectedColor);
  }, [selectedColor, setValue]);

  useEffect(() => {
    setValue('icon', selectedIcon);
  }, [selectedIcon, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && id) {
        await updateCategory.mutateAsync({ id, data });
      } else {
        await createCategory.mutateAsync(data);
      }
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const isPending = createCategory.isPending || updateCategory.isPending;

  if (isEditing && categoryLoading) {
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
          onClick={() => navigate('/categories')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          Back to Categories
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Category' : 'Add Category'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {isEditing ? 'Update category details' : 'Create a new category for your expenses or income'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Category Name */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            {...register('name', { required: 'Category name is required' })}
            type="text"
            id="name"
            placeholder="Enter category name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          />
          {errors.name && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Category Type */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4">
            Category Type
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1 w-full mx-auto sm:mx-0">
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

        {/* Color Selection */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4">
            Color
          </label>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-3">
            {CATEGORY_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`relative w-8 h-8 sm:w-10 sm:h-10 p-1 rounded-full border-2 transition-all ${selectedColor === color
                    ? `${colorMap[selectedColor]} scale-105 sm:scale-110`
                    : 'border-gray-300 hover:border-gray-400'
                  }`}
              >
                <div className={`${colorMap[color]} rounded-full flex items-center justify-center w-full h-full border-0`}>
                </div>
                {selectedColor === color && (
                  <Check className="absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 text-white m-auto" />
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 capitalize">
            Selected: {selectedColor}
          </p>
        </div>

        {/* Icon Selection */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4">
            Icon
          </label>
          <div className="space-y-4 sm:space-y-6">
            {Object.entries(CATEGORY_ICONS).map(([group, icons]) => (
              <div key={group}>
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3 flex items-center">
                  <span className="mr-1 sm:mr-2 text-sm sm:text-base">{iconTitle[group]}</span>
                  {group}
                </h3>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-1.5 sm:gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`p-0.5 sm:p-1 rounded-full mx-auto border-2 transition-all ${selectedIcon === icon
                          ? `${colorMap[selectedColor]} bg-indigo-50`
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <CategoryIcon
                        icon={icon}
                        color={selectedColor}
                        size="sm"
                        className="mx-auto"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4">
            Preview
          </label>
          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <CategoryIcon icon={selectedIcon} color={selectedColor} />
            <div>
              <p className="text-sm sm:text-base font-medium text-gray-900">
                {watch('name') || 'Category Name'}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {watchedType === 1 ? 'Expense' : 'Income'} • {selectedColor}
              </p>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        {(createCategory.error || updateCategory.error) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-red-600">
              {createCategory.error?.message || updateCategory.error?.message || 'Failed to save category'}
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
            {isPending ? 'Saving...' : isEditing ? 'Update Category' : 'Create Category'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/categories')}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;