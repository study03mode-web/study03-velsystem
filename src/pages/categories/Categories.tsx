import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  useCategoriesByType,
  useDefaultCategory,
  useDeleteCategory,
} from '../../hooks/useCategories';
import CategoryIcon from '../../components/CategoryIcon';
import DefaultCategoryModal from '../../components/DefaultCategoryModal';
import ConfirmationModal from '../../components/ConfirmationModal';

const tabs = ['Expense', 'Income'];

function Categories() {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const currentType = activeTab === 0 ? 1 : 2;

  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useCategoriesByType(currentType);
  const {
    data: defaultCategory,
    isLoading: defaultLoading,
  } = useDefaultCategory(currentType);
  const deleteCategory = useDeleteCategory();

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory.mutateAsync(categoryToDelete.id);
        setCategoryToDelete(null);
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">
            Organize your expenses and income
          </p>
        </div>
        <Link
          to="/categories/add"
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex justify-evenly gap-2 bg-gray-100 rounded-full p-1 sm:w-fit mb-4">
        {tabs.map((tab, index) => {
          const active = activeTab === index;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 w-full py-2 rounded-full text-sm font-medium transition ${active
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Default Category */}
      {defaultLoading ? (
        <div className="bg-gray-200 rounded-xl shadow p-4 mb-6 animate-pulse h-16" />
      ) : (
        defaultCategory && (
          <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CategoryIcon
                icon={defaultCategory.icon}
                color={defaultCategory.color}
              />
              <div>
                <h2 className="font-medium text-gray-900">
                  {defaultCategory.name}
                </h2>
                <p className="text-xs text-gray-500">
                  Default {tabs[activeTab]}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600 flex items-center gap-1"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        )
      )}

      {/* Categories */}
      {categoriesLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="p-10 text-center">
          <CategoryIcon
            icon="utensils"
            color="gray"
            size="lg"
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No categories yet
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Create your first category to start organizing your{' '}
            {tabs[activeTab].toLowerCase()}s
          </p>
          <Link
            to="/categories/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <CategoryIcon icon={category.icon} color={category.color} />
                <div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-xs text-gray-500">
                    {category.type === 1 ? 'Expense' : 'Income'} •{' '}
                    {category.color}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {category.deletable ? (
                  <>
                    <Link
                      to={`/categories/edit/${category.id}`}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() =>
                        setCategoryToDelete({
                          id: category.id,
                          name: category.name,
                        })
                      }
                      disabled={deleteCategory.isPending}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <span className="text-gray-300 text-sm">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Default Category Modal */}
      <DefaultCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        type={currentType}
        currentDefault={defaultCategory}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Category"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteCategory.isPending}
      />
    </div>
  );
}

export default Categories;