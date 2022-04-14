import React from "react";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Col,
  Container,
  Row,
} from "reactstrap";

const HeaderComponent = () => {
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <Row>
            <Col>
              <h1>NuCamp</h1>
              <h2>a better way to camp</h2>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Navbar dark stick="top">
        <div className="container">
          <NavbarBrand href="/">NuCamp</NavbarBrand>
        </div>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
