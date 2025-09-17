import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="font-bold text-2xl text-gray-800 hover:text-gray-900 transition-colors"
          >
            Магазин
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Каталог
            </Link>
            <Link
              to="/products/new"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow font-medium transition-all"
            >
              Добавить товар
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
