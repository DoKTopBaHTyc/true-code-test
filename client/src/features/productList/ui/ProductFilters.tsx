import { Button } from "@/shared/ui";

type Props = {
  q: string;
  onQChange: (v: string) => void;
  sortBy: string;
  onSortByChange: (v: string) => void;
  order: string;
  onOrderChange: (v: string) => void;
  limit: number | string;
  onLimitChange: (v: string) => void;
  onApply: () => void;
};

export function ProductFilters({
  q,
  onQChange,
  sortBy,
  onSortByChange,
  order,
  onOrderChange,
  limit,
  onLimitChange,
  onApply,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          placeholder="Поиск по товарам..."
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="title">Название</option>
          <option value="price">Цена</option>
          <option value="discountedPrice">Цена со скидкой</option>
          <option value="sku">Артикул</option>
        </select>
        <select
          value={order}
          onChange={(e) => onOrderChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
        <select
          value={String(limit)}
          onChange={(e) => onLimitChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="10">10 на странице</option>
          <option value="20">20 на странице</option>
          <option value="50">50 на странице</option>
        </select>
        <Button onClick={onApply}>Применить</Button>
      </div>
    </div>
  );
}
