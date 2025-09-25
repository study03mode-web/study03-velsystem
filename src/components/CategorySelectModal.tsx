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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          {showSelectAll && multiSelect && (
            <button
              onClick={onSelectAll}
              className="mt-2 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition"
            >
              {selectAll ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>

        {/* Category List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredCategories.map(category => (
            <button
              key={category.id}
              onClick={() => handleSelectCategory(category)}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-sm transition-colors ${
                multiSelect
                  ? selectedCategories.includes(category.id)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  : selectedCategory?.id === category.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <CategoryIcon icon={category.icon} color={category.color} size="sm" />
                <span className="text-gray-900 font-medium truncate">{category.name}</span>
              </div>
              {multiSelect ? (
                selectedCategories.includes(category.id) && (
                  <Check className="w-4 h-4 text-indigo-600" />
                )
              ) : (
                selectedCategory?.id === category.id && (
                  <span className="text-indigo-600 text-xs font-medium">Selected</span>
                )
              )}
            </button>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-6 text-sm text-gray-500">
              No categories found for "{searchTerm}"
            </div>
          )}
        </div>

        {/* Footer */}
        {multiSelect && (
          <div className="p-4 border-t flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              Done ({selectedCategories.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}