import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeCredentials } from "../slices/authSlice";
import axios from "axios";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const resp = await axios.post("/api/auth/logout");
      dispatch(removeCredentials());
      navigate("/login");
      console.log(resp.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        collapseOnSelect
        expand="md"
        sticky="top"
        className="py-3"
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <span className="fw-bold fs-4">
              <MdLocalGroceryStore />
              Pasa<span style={{ color: "#F59E0B" }}>mart</span>
            </span>
          </Navbar.Brand>

          <Form
            className="d-flex mx-auto"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "40%",
              maxWidth: "600px",
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>

          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              {userInfo?.isAdmin ? (
                <Nav.Link as={NavLink} to="/admin/products">
                  Manage Products
                </Nav.Link>
              ) : (
                <Nav.Link as={NavLink} to="/cart">
                  <FaShoppingCart /> Cart{" "}
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg=""
                      style={{ backgroundColor: "#F59E0B", color: "#000" }}
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.fullName}>
                  <NavDropdown.Item as={NavLink} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  <FaUser /> Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
