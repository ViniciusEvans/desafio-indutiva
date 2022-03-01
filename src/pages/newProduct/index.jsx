import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import useUser from "../../hooks/userUser";
import "./style.scss";

function NewProducts() {
  const { notify, addOrEdit } = useUser();
  const [validated, setValidated] = useState(false);
  const [notSend, setNotSend] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
    image: "",
    description: "",
  });
  const [errorText, setErrorText] = useState({
    title: "",
    amount: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (addOrEdit[0] === "edit") {
      handleGetById();
      return;
    }
  }, []);

  useEffect(() => {
    const verify = validationStepTwo();
    if (!verify) {
      setNotSend(true);
      return;
    }
    setNotSend(false);
  }, [errorText]);

  async function handleEdit() {
    if (notSend) {
      return;
    }
    const body = {
      product: {
        title: formValues.title,
        image: formValues.image,
        amount: formValues.amount,
        description: formValues.description,
      },
    };
    try {
      const response = await fetch(
        "https://db-indutiva.herokuapp.com/updateProducts/" + addOrEdit[1],
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      if (data.error) {
        notify(data.error, "error");
      }
      notify(data.success, "success");
    } catch (error) {
      notify(error.message, "error");
    }
  }

  async function handleGetById() {
    try {
      const response = await fetch(
        "https://db-indutiva.herokuapp.com/getProductsbyId/" + addOrEdit[1],
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      setFormValues({
        title: data[0].title,
        amount: data[0].amount,
        image: data[0].image,
        description: data[0].description,
      });
    } catch (error) {
      notify(error.message, "error");
    }
  }

  async function handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    if (addOrEdit[0] === "edit") {
      validationEdit();
      handleEdit();
      return;
    }
    const verifiy = validationStepTwo();
    if (!verifiy) {
      return;
    }
    const body = {
      product: {
        title: formValues.title,
        image: formValues.image,
        amount: formValues.amount,
        description: formValues.description,
      },
    };
    try {
      const response = await fetch(
        "https://db-indutiva.herokuapp.com/createProducts",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      notify(data.success, "success");
    } catch (error) {
      notify(error.error, "error");
    }
  }

  function handleChange(value, objAcess) {
    setFormValues({ ...formValues, [objAcess]: value });
  }
  function validationStepOne(e) {
    if (e.target.id === "validationTitle") {
      if (!e.target.value) {
        setErrorText({ ...errorText, title: "invalidTrue" });
        return;
      } else {
        setErrorText({ ...errorText, title: "validTrue" });
      }
    }
    if (e.target.id === "validationImage") {
      if (!e.target.value) {
        setErrorText({ ...errorText, image: "invalidTrue" });
        return;
      } else {
        setErrorText({ ...errorText, image: "validTrue" });
      }
    }
    if (e.target.id === "validationAmount") {
      if (!e.target.value) {
        setErrorText({ ...errorText, amount: "invalidTrue" });
        return;
      } else if (e.target.value < 0) {
        setErrorText({ ...errorText, amount: "invalidTrueMin" });
        return;
      } else {
        setErrorText({ ...errorText, amount: "validTrue" });
      }
    }
    if (e.target.id === "validationDescription") {
      if (!e.target.value) {
        setErrorText({ ...errorText, description: "invalidTrue" });
        return;
      } else {
        setErrorText({ ...errorText, description: "validTrue" });
      }
    }
  }
  function validationStepTwo() {
    const keys = Object.keys(errorText);
    const filtered = keys.filter((e) => errorText[e] !== "validTrue");
    if (filtered.length > 0) {
      return false;
    }
    return true;
  }

  function validationEdit() {
    const keys = Object.keys(formValues);
    let errors = {};
    keys.forEach((key) => {
      if (key === "title") {
        if (!formValues.title) {
          errors = { ...errors, title: "invalidTrue" };
        } else {
          errors = { ...errors, title: "validTrue" };
        }
      }
      if (key === "image") {
        if (!formValues.image) {
          errors = { ...errors, image: "invalidTrue" };
        } else {
          errors = { ...errors, image: "validTrue" };
        }
      }
      if (key === "amount") {
        if (!formValues.amount) {
          errors = { ...errors, amount: "invalidTrue" };
        } else if (formValues.amount < 0) {
          errors = { ...errors, amount: "invalidTrueMin" };
        } else {
          errors = { ...errors, amount: "validTrue" };
        }
      }
      if (key === "description") {
        if (!formValues.description) {
          errors = { ...errors, description: "invalidTrue" };
        } else {
          errors = { ...errors, description: "validTrue" };
        }
      }
    });
    setErrorText({ ...errorText, ...errors });
  }

  return (
    <Form noValidate validated={validated}>
      <Row>
        <Form.Group as={Col} md="6" controlId="validationTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            required
            isInvalid={errorText.title === "invalidTrue" ? true : false}
            isValid={errorText.title === "validTrue" ? true : false}
            type="text"
            placeholder="Insira o título..."
            value={formValues.title}
            onChange={(e) => {
              handleChange(e.target.value, "title");
              validationStepOne(e);
            }}
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
            isInvalid={errorText.image === "invalidTrue" ? true : false}
            isValid={errorText.image === "validTrue" ? true : false}
            type="text"
            placeholder="Insira o link para a imagem..."
            value={formValues.image}
            onChange={(e) => {
              handleChange(e.target.value, "image");
              validationStepOne(e);
            }}
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
              isInvalid={
                errorText.amount === "invalidTrue"
                  ? true
                  : errorText.amount === "invalidTrueMin"
                  ? true
                  : false
              }
              isValid={errorText.amount === "validTrue" ? true : false}
              type="Number"
              placeholder="Insira o valor..."
              aria-describedby="inputGroupPrepend"
              required
              value={formValues.amount}
              onChange={(e) => {
                handleChange(e.target.value, "amount");
                validationStepOne(e);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errorText.amount === "invalidTrue"
                ? "Insira o valor"
                : "O valor mínimo é zero"}
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
          controlId="validationDescription"
        >
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            required
            isInvalid={errorText.description === "invalidTrue" ? true : false}
            isValid={errorText.description === "validTrue" ? true : false}
            as="textarea"
            rows={3}
            style={{ height: "20rem" }}
            value={formValues.description}
            onChange={(e) => {
              handleChange(e.target.value, "description");
              validationStepOne(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Insira uma descrição do produto
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">Ok</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Button onClick={handleSubmit} as={Col} md="2" type="submit">
          Submit form
        </Button>
      </Row>
    </Form>
  );
}

export default NewProducts;
