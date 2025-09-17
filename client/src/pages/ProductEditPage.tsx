import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "@/entities/product/hooks";
import { ProductForm } from "@/features/productForm/ProductForm";
import { LoadingSpinner } from "@/shared/ui";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useProduct(id);

  if (isLoading) return <LoadingSpinner />;

  if (error || !data)
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-red-600">
        Товар не найден
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Вернуться к списку
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Назад
        </button>
        <h1 className="text-2xl font-bold">Редактировать товар</h1>
      </div>
      <ProductForm product={data} onSuccess={() => navigate("/")} />
    </div>
  );
}
