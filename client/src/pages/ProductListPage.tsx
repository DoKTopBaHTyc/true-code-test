import { Link, useSearchParams } from "react-router-dom";
import { useProducts, useDeleteProduct } from "@/entities/product/hooks";
import { useMemo, useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setParams } from "@/features/productList/paramsSlice";
import type { ListParams } from "@/features/productList/paramsSlice";
import { ProductCard } from "@/shared/ui/ProductCard";
import { ProductFilters } from "@/features/productList/ui/ProductFilters";
import { Pagination } from "@/shared/ui";

export default function ProductListPage() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [qInput, setQInput] = useState(searchParams.get("q") || "");
  const [debouncedQ, setDebouncedQ] = useState(qInput);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sortBy =
    (searchParams.get("sortBy") as ListParams["sortBy"]) || "title";
  const order = (searchParams.get("order") as ListParams["order"]) || "asc";

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(qInput), 400);
    return () => clearTimeout(t);
  }, [qInput]);

  const params = useMemo(
    () => ({ page, limit, q: debouncedQ, sortBy, order }),
    [page, limit, debouncedQ, sortBy, order]
  );

  useEffect(() => {
    dispatch(setParams(params));
  }, [dispatch, params]);

  const { data, isLoading, error } = useProducts(params);
  const deleteProduct = useDeleteProduct();

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProduct.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  const applyFilters = () => {
    setSearchParams({
      page: "1",
      limit: String(limit),
      q: qInput,
      sortBy,
      order,
    });
  };

  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto p-6 animate-pulse space-y-6">
        <div className="h-10 w-64 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-4 space-y-3"
            >
              <div className="h-48 bg-gray-200 rounded-lg" />
              <div className="h-6 bg-gray-200 rounded w-2/3" />
              <div className="h-6 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h2 className="text-red-800 font-semibold text-lg">
            Ошибка при загрузке товаров
          </h2>
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Заголовок и кнопка */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Товары</h1>
        <Link
          to="/products/new"
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Добавить товар
        </Link>
      </div>

      <ProductFilters
        q={qInput}
        onQChange={setQInput}
        sortBy={sortBy}
        onSortByChange={(v) =>
          setSearchParams({
            page: "1",
            limit: String(limit),
            q: qInput,
            sortBy: v,
            order,
          })
        }
        order={order}
        onOrderChange={(v) =>
          setSearchParams({
            page: "1",
            limit: String(limit),
            q: qInput,
            sortBy,
            order: v,
          })
        }
        limit={limit}
        onLimitChange={(v) =>
          setSearchParams({
            page: "1",
            limit: v,
            q: qInput,
            sortBy,
            order,
          })
        }
        onApply={applyFilters}
      />

      {/* Карточки товаров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data?.items?.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            deleting={deletingId === p.id}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Пагинация */}
      {data && data.total > 0 && (
        <Pagination
          currentPage={data.page}
          totalPages={Math.ceil(data.total / data.limit)}
          onPageChange={(newPage) =>
            setSearchParams({
              page: String(newPage),
              limit: String(limit),
              q: qInput,
              sortBy,
              order,
            })
          }
        />
      )}

      {!data?.items?.length && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Товары не найдены
          </h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
}
