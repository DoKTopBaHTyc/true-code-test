export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  sku: string;
  photoPath?: string | null;
};

export type ProductListParams = {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: "title" | "price" | "discountedPrice" | "sku";
  order?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
};
