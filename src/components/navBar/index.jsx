import { NavLink } from "react-router-dom";
import newProductsIcon from "../../assets/newProductsIcon.svg";
import productsIcon from "../../assets/productsIcon.svg";

function NavBar() {
  const stylesheet = { display: "flex", flexDirection: "column" };
  return (
    <div className="navbar" style={stylesheet}>
      <div className="link-1">
        <NavLink to={"new-products"}>
          <img src={newProductsIcon} alt="new product" />
        </NavLink>
      </div>
      <div className="link-1">
        <NavLink to={"products"}>
          <img src={productsIcon} alt="products" />
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
