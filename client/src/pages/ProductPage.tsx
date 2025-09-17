import { useParams, Link } from "react-router-dom";
import { useProduct } from "@/entities/product/hooks";
import { buildUploadUrl } from "@/shared/lib/apiClient";
import { LoadingSpinner } from "@/shared/ui";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);

  if (isLoading) return <LoadingSpinner />;
  if (error || !product)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-600">
        Товар не найден
        <div className="mt-4">
          <Link
            to="/products"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Вернуться к списку
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        {product.photoPath ? (
          <img
            src={buildUploadUrl(product.photoPath)}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        ) : (
          <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
            Нет фото
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>
        </div>
        <div className="mt-4">
          {product.discountedPrice ? (
            <div className="flex gap-2 items-baseline">
              <span className="text-gray-400 line-through">
                {product.price}₽
              </span>
              <span className="text-blue-600 font-bold">
                {product.discountedPrice}₽
              </span>
            </div>
          ) : (
            <span className="text-blue-600 font-bold">{product.price}₽</span>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <Link
            to={`/products/${product.id}/edit`}
            className="flex-1 bg-green-500 text-white py-2 rounded text-center hover:bg-green-600 transition"
          >
            Редактировать
          </Link>
          <Link
            to="/"
            className="flex-1 bg-gray-200 py-2 rounded text-center hover:bg-gray-300 transition"
          >
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
}
