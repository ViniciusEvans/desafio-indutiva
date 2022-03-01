import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import "./style.scss";

function NewProducts() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col} md="6" controlId="validationTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Insira o título..."
            defaultValue=""
          />
          <Form.Control.Feedback type="invalid">
            Insira um título
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">Ok</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="6" controlId="validationImage">
          <Form.Label>Imagem</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Insira o link para a imagem..."
            defaultValue=""
          />
          <Form.Control.Feedback type="invalid">
            Insira um link
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">Ok</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="6" controlId="validationAmount">
          <Form.Label>Valor</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
            <Form.Control
              type="Number"
              placeholder="Insira o valor..."
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Insira o valor
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Ok</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group
          as={Col}
          md="6"
          className="mb-3"
          controlId="descriptionTextArea"
        >
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            style={{ height: "20rem" }}
          />
          <Form.Control.Feedback type="invalid">
            Insira uma descrição do produto
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">Ok</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Button as={Col} md="2" type="submit">
          Submit form
        </Button>
      </Row>
    </Form>
  );
}

export default NewProducts;
