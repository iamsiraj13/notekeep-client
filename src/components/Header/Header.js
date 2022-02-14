import React from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="primary" expand="md" className="">
      <Container direction="horizontal">
        <Navbar.Brand style={{ color: "#fff" }}>
          <Link to="/" style={{textDecoration:'none'}}>Note Keep</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form inline className="d-flex m-auto">
            <FormControl
              type="search"
              placeholder="Search"
              className="ms-2"
              aria-label="Search"
            />
            <Button variant="dark">Search</Button>
          </Form>
          <Nav
            className="m-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link style={{ color: "#fff" }}>
              <Link to="/mynotes" style={{ textDecoration: "none" }}>
                My Notes
              </Link>
            </Nav.Link>
            <DropdownButton
              variant="outline-secondary"
              title="Sirajul"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Profile</Dropdown.Item> 
              <Dropdown.Item href="#">Logout</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
