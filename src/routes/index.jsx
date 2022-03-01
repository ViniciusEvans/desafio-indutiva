import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Products from "../pages/products";
import { UserProvider } from "../context/userContext";
import NewProducts from "../pages/newProduct";
function Rotas() {
  return (
    <UserProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route path="" element={<Products />} />
          <Route path="new-products" element={<NewProducts />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default Rotas;
