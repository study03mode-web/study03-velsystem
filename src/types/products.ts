export interface Brand {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  status: number;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  status: number;
  sortOrder: number;
  children: Category[];
}

export interface OptionValue {
  id: string;
  value: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: OptionValue[];
}

export interface Specification {
  id: string;
  attributeName: string;
  attributeValue: string;
}

export interface SpecificationGroup {
  id: string;
  name: string;
  specifications: Specification[];
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface VariantOption {
  optionId: string;
  optionName: string;
  optionValue: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  options: VariantOption[];
  images: ProductImage[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: Brand;
  category: Category;
  status: string | null;
  options: ProductOption[];
  specificationGroups: SpecificationGroup[];
  variants: ProductVariant[];
}

export interface ProductsResponse {
  message: string;
  data: {
    content: Product[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      offset: number;
      unpaged: boolean;
      paged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
}

export interface ProductResponse {
  message: string;
  data: Product;
}

export interface CategoriesResponse {
  message: string;
  data: Category[];
}

export interface BrandsResponse {
  message: string;
  data: Brand[];
}

export interface ProductFilters {
  brandId?: string;
  categoryId?: string;
  keyword?: string;
  status?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: string;
  minPrice?: number;
  maxPrice?: number;
}