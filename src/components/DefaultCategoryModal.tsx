import { useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import { Category } from "../types/category";
import { useSetDefaultCategory } from "../hooks/useCategories";
import CategoryIcon from "./CategoryIcon";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const setDefaultCategory = useSetDefaultCategory();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(currentDefault ?? null);
      setSearchTerm("");
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
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
      console.error("Failed to set default category:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Default {type === 1 ? "Expense" : "Income"} Category
          </h2>
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
              ref={searchInputRef}
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Category List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              disabled={setDefaultCategory.isPending}
              className={`w-full flex items-center gap-2 p-2.5 rounded-lg border text-sm transition-colors ${
                currentDefault?.id === category.id
                  ? "border-indigo-500 bg-indigo-50"
                  : selectedCategory?.id === category.id
                  ? "border-indigo-400 bg-indigo-100"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              } disabled:opacity-50`}
            >
              <CategoryIcon icon={category.icon} color={category.color} size="sm" />
              <span className="font-medium text-gray-900 truncate">
                {category.name}
              </span>
              {currentDefault?.id === category.id && (
                <span className="ml-auto text-xs text-indigo-600 font-medium">
                  Current
                </span>
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
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={onClose}
            disabled={setDefaultCategory.isPending}
            className="flex-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
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
            className="flex-1 px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {setDefaultCategory.isPending ? "Saving..." : "Set Default"}
          </button>
        </div>
      </div>
    </div>
  );
}