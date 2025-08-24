import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { Category, Brand, ProductFilters } from '../../types/product';
import { useCategories, useBrands } from '../../hooks/useProducts';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
}

const ProductFiltersComponent = React.memo(({ filters, onFiltersChange, onClearFilters }: ProductFiltersProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  // Use React Query hooks
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();
  
  const categories = categoriesData?.data || [];
  const brands = brandsData?.data || [];

  useEffect(() => {
    if (filters.brandId) {
      setSelectedBrands(new Set([filters.brandId]));
    }
  }, [filters.brandId]);


  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategorySelect = (categoryId: string) => {
    onFiltersChange({
      ...filters,
      categoryId: filters.categoryId === categoryId ? undefined : categoryId,
      page: 0
    });
  };

  const handleBrandToggle = (brandId: string) => {
    const newSelectedBrands = new Set(selectedBrands);
    if (newSelectedBrands.has(brandId)) {
      newSelectedBrands.delete(brandId);
    } else {
      newSelectedBrands.add(brandId);
    }
    setSelectedBrands(newSelectedBrands);
    
    // For now, we'll handle single brand selection
    const selectedBrandId = newSelectedBrands.size > 0 ? Array.from(newSelectedBrands)[0] : undefined;
    onFiltersChange({
      ...filters,
      brandId: selectedBrandId,
      page: 0
    });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status: filters.status === status ? undefined : status,
      page: 0
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    onFiltersChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
      page: 0
    });
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = filters.categoryId === category.id;

    return (
      <div key={category.id} className={`ml-${level * 4}`}>
        <div className="flex items-center py-2">
          {hasChildren && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="mr-2 p-1 hover:bg-gray-100 rounded"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          <button
            onClick={() => handleCategorySelect(category.id)}
            className={`flex-1 text-left px-2 py-1 rounded hover:bg-gray-100 transition-colors ${
              isSelected ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700'
            }`}
          >
            {category.name}
          </button>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {category.children.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const hasActiveFilters = filters.categoryId || filters.brandId || filters.status || filters.keyword;

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <X size={16} className="mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
        <div className="max-h-64 overflow-y-auto">
          {categories.map(category => renderCategory(category))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map(brand => (
            <label key={brand.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.has(brand.id)}
                onChange={() => handleBrandToggle(brand.id)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Status</h4>
        <div className="space-y-2">
          {['ACTIVE', 'INACTIVE'].map(status => (
            <label key={status} className="flex items-center">
              <input
                type="radio"
                name="status"
                checked={filters.status === status}
                onChange={() => handleStatusChange(status)}
                className="mr-2 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{status.toLowerCase()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => handlePriceRangeChange(priceRange.min, priceRange.max)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
          >
            Apply Price Filter
          </button>
        </div>
      </div>
    </div>
  );
});

ProductFiltersComponent.displayName = 'ProductFilters';

export default ProductFiltersComponent;