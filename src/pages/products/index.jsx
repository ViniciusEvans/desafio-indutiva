import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Modal, Table } from "react-bootstrap";
import deleteIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import useUser from "../../hooks/userUser";
import "./style.scss";

function Products() {
  const { setAddOrEdit, notify } = useUser();
  const [products, setProducts] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetProducts();
    setAddOrEdit("");
  }, [toggle]);

  function formatToCurrency(inputNumber) {
    const convertedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(inputNumber);
    return convertedValue;
  }
  async function handleGetProducts() {
    try {
      const response = await fetch(
        "https://db-indutiva.herokuapp.com/getProducts",
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      setProducts(data);
      setToggle(!toggle);
    } catch (error) {
      notify(error.message, "error");
    }
  }

  function handleEditProduct(id) {
    setAddOrEdit(["edit", id]);
    navigate("/new-products");
  }

  async function handleDeleteProduct(id) {
    try {
      const response = await fetch(
        "https://db-indutiva.herokuapp.com/deleteProducts/" + id,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      setToggle(!toggle);
      setTimeout(() => setDeleteModal(false), 2000);
      if (data.error) {
        notify(data.error, "error");
      }
      notify(data.success, "success");
    } catch (error) {
      notify(error.error, "error");
    }
  }
  return (
    <Container>
      <Table striped hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Título</th>
            <th>imagem</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <img src={item.image} />
              </td>
              <td>{formatToCurrency(item.amount)}</td>
              <td>{item.description}</td>
              <td>
                <img
                  onClick={() => handleEditProduct(item.id)}
                  src={editIcon}
                  alt="edit"
                />
              </td>
              <td>
                <img
                  onClick={() => {
                    setDeleteModal(true);
                    setId(item.id);
                  }}
                  src={deleteIcon}
                  alt="delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        size="sm"
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Você quer deletar esse produto?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            className="btn btn-confirm"
            onClick={() => handleDeleteProduct(id)}
          >
            sim
          </button>
          <button
            className="btn btn-cancel"
            onClick={() => setDeleteModal(false)}
          >
            não
          </button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Products;
