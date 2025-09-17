import { useParams, Link } from "react-router-dom";
import { useProduct } from "../entities/product/hooks";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке</p>;
  if (!product) return <p>Товар не найден</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Цена: {product.price}₽</p>
      {product.photoPath && (
        <img
          src={`${import.meta.env.VITE_API_URL || "http://localhost:3001"}${product.photoPath}`}
          alt={product.title}
          width="200"
        />
      )}
      <p>
        <Link to={`/products/${product.id}/edit`}>Редактировать</Link>
      </p>
    </div>
  );
}
