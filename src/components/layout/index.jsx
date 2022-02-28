import { Outlet } from "react-router-dom";
import NavBar from "../navBar";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../header";
import { UserProvider } from "../../context/userContext";
function Layout() {
  return (
    <UserProvider>
      <Container fluid className="app-background">
        <Row className="app-overall-size">
          <Col sm={1} className="navBar-container px-0">
            <NavBar />
          </Col>
          <Col sm={11} style={{ padding: "0" }}>
            <Container
              fluid
              style={{
                background: "#E5E5E5",
                minHeight: "100vh",
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
                  <Outlet />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}

export default Layout;
