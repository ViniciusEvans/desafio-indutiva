import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Products from "../pages/products";
import NewProducts from "../pages/newProduct";
function Rotas() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route path="" element={<Products />} />
        <Route path="new-products" element={<NewProducts />} />
      </Route>
    </Routes>
  );
}

export default Rotas;
