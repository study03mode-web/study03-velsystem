import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { useProducts, useCategories, useBrands } from '../hooks/useProducts';
import ProductFilters from '../components/shop/ProductFilters';
import ProductGrid from '../components/shop/ProductGrid';
import Pagination from '../components/shop/Pagination';
import { ProductFilters as ProductFiltersType} from '../types/products';

const Shop = React.memo(() => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filters, setFilters] = useState<ProductFiltersType>({
    page: 0,
    size: 12,
    sortBy: 'createdAt',
    direction: 'desc',
    status: 'ACTIVE'
  });

  // Use React Query hooks
  const { data: productsData, isLoading: loading } = useProducts(filters);
  
  const products = productsData?.data.content || [];
  const pagination = productsData?.data ? {
    currentPage: productsData.data.number,
    totalPages: productsData.data.totalPages,
    totalElements: productsData.data.totalElements,
    pageSize: productsData.data.size
  } : {
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 12
  };

  const handleFiltersChange = useCallback((newFilters: ProductFiltersType) => {
    setFilters(newFilters);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      keyword: searchTerm.trim() || undefined,
      page: 0
    }));
  }, [searchTerm]);

  const handleSortChange = useCallback((sortBy: string, direction: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      direction,
      page: 0
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      page: 0,
      size: 12,
      sortBy: 'createdAt',
      direction: 'desc',
      status: 'ACTIVE'
    });
    setSearchTerm('');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Shop Our Products
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Discover our wide range of technology solutions
          </p>
        </div>
      </section> */}

      {/* Search and Sort Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SortAsc size={20} className="text-gray-600" />
                <select
                  value={`${filters.sortBy}-${filters.direction}`}
                  onChange={(e) => {
                    const [sortBy, direction] = e.target.value.split('-');
                    handleSortChange(sortBy, direction);
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Products {pagination.totalElements > 0 && `(${pagination.totalElements})`}
                </h2>
              </div>
            </div>

            <ProductGrid products={products} loading={loading} />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalElements={pagination.totalElements}
                  pageSize={pagination.pageSize}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

Shop.displayName = 'Shop';

export default Shop;