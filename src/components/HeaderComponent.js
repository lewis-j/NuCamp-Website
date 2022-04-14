import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Col,
  Container,
  Row,
} from "reactstrap";

import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
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
      <Navbar dark stick="top" expand="md">
        <div className="container">
          <NavbarBrand className="mr-auto" href="/" />
          <img
            src="/assets/images/logo.png"
            width="30"
            height="30"
            alt="NuCamp Logo"
          />
          <NavbarToggler
            onClick={() => {
              setIsNavOpen(!isNavOpen);
            }}
          />
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <i className="fa fa-home fa-lg" /> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/directory">
                  <i className="fa fa-list fa-lg" /> Directory
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/aboutus">
                  <i className="fa fa-info fa-lg" /> About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/contactus">
                  <i className="fa fa-address-card fa-lg" /> Contact
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
