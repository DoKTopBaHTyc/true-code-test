import { Link, useSearchParams } from "react-router-dom";
import { useProducts, useDeleteProduct } from "../entities/product/hooks";
import { useMemo, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setParams } from "../features/productList/paramsSlice";
import type { ListParams } from "../features/productList/paramsSlice";

export default function ProductListPage() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const q = searchParams.get("q") || "";
  const sortBy =
    (searchParams.get("sortBy") as ListParams["sortBy"]) || "title";
  const order = (searchParams.get("order") as ListParams["order"]) || "asc";

  const params = useMemo(
    () => ({ page, limit, q, sortBy, order }),
    [page, limit, q, sortBy, order]
  );

  useEffect(() => {
    dispatch(setParams(params));
  }, [dispatch, params]);

  const { data, isLoading, error } = useProducts(params);
  const deleteProduct = useDeleteProduct();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке</p>;

  return (
    <div>
      <h1>Товары</h1>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Поиск..."
          value={q}
          onChange={(e) => {
            const v = e.target.value;
            setSearchParams({
              page: "1",
              limit: String(limit),
              q: v,
              sortBy,
              order,
            });
            dispatch(setParams({ page: 1, q: v }));
          }}
        />
        <select
          value={sortBy}
          onChange={(e) =>
            setSearchParams({
              page: "1",
              limit: String(limit),
              q,
              sortBy: e.target.value,
              order,
            })
          }
        >
          <option value="title">Название</option>
          <option value="price">Стоимость</option>
          <option value="discountedPrice">Со скидкой</option>
          <option value="sku">Артикул</option>
        </select>
        <select
          value={order}
          onChange={(e) =>
            setSearchParams({
              page: "1",
              limit: String(limit),
              q,
              sortBy,
              order: e.target.value,
            })
          }
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
        <Link to="/products/new" style={{ marginLeft: 12 }}>
          Добавить товар
        </Link>
      </div>
      <ul>
        {data?.items?.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.title}</Link> — {p.price}₽
            <button onClick={() => deleteProduct.mutate(p.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <button
          disabled={page <= 1}
          onClick={() =>
            setSearchParams({
              page: String(page - 1),
              limit: String(limit),
              q,
              sortBy,
              order,
            })
          }
        >
          Назад
        </button>
        <span style={{ margin: "0 8px" }}>
          Стр. {data?.page} из{" "}
          {data ? Math.ceil((data.total || 0) / (data.limit || 10)) : 1}
        </span>
        <button
          disabled={
            data
              ? page >= Math.ceil((data.total || 0) / (data.limit || 10))
              : true
          }
          onClick={() =>
            setSearchParams({
              page: String(page + 1),
              limit: String(limit),
              q,
              sortBy,
              order,
            })
          }
        >
          Вперед
        </button>
      </div>
    </div>
  );
}
