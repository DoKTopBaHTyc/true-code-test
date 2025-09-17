import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/features/productForm/ProductForm";

export default function ProductCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Назад
        </button>
        <h1 className="text-2xl font-bold">Создать товар</h1>
      </div>
      <ProductForm onSuccess={() => navigate("/")} />
    </div>
  );
}
