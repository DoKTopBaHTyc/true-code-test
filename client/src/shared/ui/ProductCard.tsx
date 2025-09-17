import { Link } from "react-router-dom";
import type { Product } from "@/shared/api/types";
import { buildUploadUrl } from "@/shared/lib/apiClient";
import { Button } from "@/shared/ui";

type ProductCardProps = {
  product: Product;
  deleting?: boolean;
  onDelete?: (id: string) => void;
};

export function ProductCard({ product, deleting, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden">
      <Link to={`/products/${product.id}`} className="block">
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          {product.photoPath ? (
            <img
              src={buildUploadUrl(product.photoPath)}
              alt={product.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Нет изображения
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            {product.discountedPrice ? (
              <>
                <span className="text-gray-400 line-through">
                  {product.price.toLocaleString()}₽
                </span>
                <span className="text-blue-600 font-bold">
                  {product.discountedPrice.toLocaleString()}₽
                </span>
              </>
            ) : (
              <span className="text-blue-600 font-bold">
                {product.price.toLocaleString()}₽
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 flex gap-2">
        <Link
          to={`/products/${product.id}`}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 text-center"
        >
          Просмотр
        </Link>
        <Button
          onClick={() => onDelete?.(product.id)}
          disabled={deleting}
          loading={deleting}
          variant="danger"
          size="sm"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
