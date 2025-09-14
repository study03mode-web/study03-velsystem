import { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { Category } from '../types/category';
import CategoryIcon from './CategoryIcon';

interface CategorySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSelect: (category: Category) => void;
  selectedCategory?: Category;
  title: string;
  multiSelect?: boolean;
  selectedCategories?: string[];
  onMultiSelect?: (categoryIds: string[]) => void;
  showSelectAll?: boolean;
  onSelectAll?: () => void;
  selectAll?: boolean;
}

export default function CategorySelectModal({ 
  isOpen, 
  onClose, 
  categories, 
  onSelect,
  selectedCategory,
  title,
  multiSelect = false,
  selectedCategories = [],
  onMultiSelect,
  showSelectAll = false,
  onSelectAll,
  selectAll = false
}: CategorySelectModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCategory = (category: Category) => {
    if (multiSelect && onMultiSelect) {
      const isSelected = selectedCategories.includes(category.id);
      if (isSelected) {
        onMultiSelect(selectedCategories.filter(id => id !== category.id));
      } else {
        onMultiSelect([...selectedCategories, category.id]);
      }
    } else {
      onSelect(category);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md max-h-[85vh] sm:max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-3 sm:p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
          </div>
          {showSelectAll && multiSelect && (
            <button
              onClick={onSelectAll}
              className="mt-2 sm:mt-3 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {selectAll ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="space-y-1.5 sm:space-y-2">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSelectCategory(category)}
                className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-lg border transition-colors ${
                  (multiSelect ? selectedCategories.includes(category.id) : selectedCategory?.id === category.id)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CategoryIcon icon={category.icon} color={category.color} size="sm" />
                  <span className="text-sm sm:text-base font-medium text-gray-900 truncate">{category.name}</span>
                </div>
                {multiSelect ? (
                  selectedCategories.includes(category.id) && (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  )
                ) : (
                  selectedCategory?.id === category.id && (
                    <span className="text-xs sm:text-sm text-indigo-600 font-medium">Selected</span>
                  )
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

        {multiSelect && (
          <div className="p-3 sm:p-4 border-t">
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium"
              >
                Done ({selectedCategories.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}