import React, { useRef, useState } from "react";
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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const rememberRef = useRef();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = (e) => {
    alert(
      `Username: ${usernameRef.current.value} Password: ${passwordRef.current.value} Remember: ${rememberRef.current.checked}`
    );
    toggleModal();
    e.preventDefault();
  };
  return (
    <>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                innerRef={usernameRef}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                innerRef={passwordRef}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="remember" innerRef={rememberRef} />
                Remember me
              </Label>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
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
            <span className="navbar-text ml-auto">
              <Button outline onClick={toggleModal}>
                <i className="fa fa-sign-in fa-lg" /> Login
              </Button>
            </span>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
