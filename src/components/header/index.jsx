import "./style.scss";
import useUser from "../../hooks/userUser";
function Header() {
  const { title } = useUser();
  return (
    <div className="header">
      <h1>{title ? title : "Produtos"}</h1>
    </div>
  );
}

export default Header;
