import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../header";
import NavBar from "../navBar";

function Layout() {
  return (
    <Container fluid className="app-background">
      <Row className="app-overall-size" style={{ marginRight: "0" }}>
        <Col sm={1} className="navBar-container px-0">
          <NavBar />
        </Col>
        <Col sm={11} style={{ padding: "0" }}>
          <Container
            fluid
            style={{
              background: "#E5E5E5",
              minHeight: "100%",
              padding: "0",
            }}
          >
            <Row>
              <Col>
                <Header />
              </Col>
            </Row>
            <Row>
              <Col>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <ToastContainer />
                <Outlet />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
