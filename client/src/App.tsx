import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListPage from "@/pages/ProductListPage";
import ProductPage from "@/pages/ProductPage";
import ProductCreatePage from "@/pages/ProductCreatePage";
import ProductEditPage from "@/pages/ProductEditPage";
import Layout from "@/shared/ui/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products/new" element={<ProductCreatePage />} />
          <Route path="/products/:id/edit" element={<ProductEditPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
