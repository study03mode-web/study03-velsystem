import { useEffect, useRef, useState } from 'react';
import { X, Search } from 'lucide-react';
import { Category } from '../types/category';
import { useSetDefaultCategory } from '../hooks/useCategories';
import CategoryIcon from './CategoryIcon';

interface DefaultCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  type: number;
  currentDefault?: Category;
}

export default function DefaultCategoryModal({
  isOpen,
  onClose,
  categories,
  type,
  currentDefault,
}: DefaultCategoryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const setDefaultCategory = useSetDefaultCategory();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filtered categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pre-select currentDefault when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(currentDefault ?? null);
      setSearchTerm('');
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100); // Focus search input
    }
  }, [isOpen, currentDefault]);

  const handleSubmit = async () => {
    if (!selectedCategory || selectedCategory.id === currentDefault?.id) {
      onClose();
      return;
    }

    try {
      await setDefaultCategory.mutateAsync({ id: selectedCategory.id, type });
      onClose();
    } catch (error) {
      console.error('Failed to set default category:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md max-h-[85vh] sm:max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Select Default {type === 1 ? 'Expense' : 'Income'} Category
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 sm:p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Category List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="space-y-1.5 sm:space-y-2">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                disabled={setDefaultCategory.isPending}
                className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border transition-colors ${
                  currentDefault?.id === category.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : selectedCategory?.id === category.id
                    ? 'border-indigo-400 bg-indigo-100'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } disabled:opacity-50`}
              >
                <CategoryIcon icon={category.icon} color={category.color} size="sm" />
                <span className="text-sm sm:text-base font-medium text-gray-900 truncate">{category.name}</span>
                {currentDefault?.id === category.id && (
                  <span className="ml-auto text-xs sm:text-sm text-indigo-600 font-medium">Current</span>
                )}
              </button>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-xs sm:text-sm text-gray-500">
              No categories found matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-3 sm:p-4 border-t">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
              disabled={setDefaultCategory.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                !selectedCategory ||
                setDefaultCategory.isPending ||
                selectedCategory.id === currentDefault?.id
              }
              className="flex-1 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium disabled:opacity-50"
            >
              {setDefaultCategory.isPending ? 'Saving...' : 'Set Default'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
