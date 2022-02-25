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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link,useHistory } from "react-router-dom"; 
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const username = userInfo?.name.split(" ")[0];

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  

  return (
    <Navbar bg="primary" expand="md" className="">
      <Container direction="horizontal">
        <Navbar.Brand style={{ color: "#fff" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Note Keep
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form inline className="d-flex m-auto">
            <FormControl
              type="search"
              placeholder="Search"
              className="ms-2"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button variant="dark" type="submit">Search</Button>
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
            {userInfo && (
              <DropdownButton
                variant="outline-secondary"
                title={username}
                id="input-group-dropdown-1"
              >
                 <Dropdown.Item ><Link to="/profile">Profile</Link></Dropdown.Item> 
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </DropdownButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
