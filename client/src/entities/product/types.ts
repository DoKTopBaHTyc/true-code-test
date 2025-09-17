export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  sku: string;
  photoPath?: string | null;
};
