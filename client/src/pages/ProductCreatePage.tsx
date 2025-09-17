import { ProductForm } from "../features/productForm/ProductForm";
import { useNavigate } from "react-router-dom";

export default function ProductCreatePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Product</h1>
      <ProductForm onSuccess={() => navigate("/")} />
    </div>
  );
}
