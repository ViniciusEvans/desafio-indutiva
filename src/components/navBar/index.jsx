import { NavLink } from "react-router-dom";
import newProductsIcon from "../../assets/newProductsIcon.svg";
import productsIcon from "../../assets/productsIcon.svg";
import useUser from "../../hooks/userUser";
import "./style.scss";
function NavBar() {
  const { setTitle } = useUser();
  function handleSetTitle(title) {
    setTitle(title);
  }
  return (
    <div className="navbar">
      <div className="link link-1">
        <NavLink
          onClick={() => handleSetTitle("Cadastre novo produto")}
          to={"new-products"}
        >
          <img src={newProductsIcon} alt="new product" />
        </NavLink>
      </div>
      <div className="link link-2">
        <NavLink onClick={() => handleSetTitle("Produtos")} to={""}>
          <img src={productsIcon} alt="products" />
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
