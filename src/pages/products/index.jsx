import { useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import "./style.scss";

function Products() {
  const [products, setProducts] = useState([]);
  function formatToCurrency(inputNumber) {
    const convertedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(inputNumber);
    return convertedValue;
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
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <img src={item.img} />
              </td>
              <td>{item.amount}</td>
              <td>{item.desc}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Products;
