import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../entities/product/hooks";
import { ProductForm } from "../features/productForm/ProductForm";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useProduct(id);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Product not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Product</h1>
      <ProductForm product={data} onSuccess={() => navigate("/")} />
    </div>
  );
}
