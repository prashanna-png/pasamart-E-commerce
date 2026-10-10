import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
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
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="md">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} alt="logo" />
            Pasamart
          </Navbar.Brand>
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
                    <Badge bg="success" pill>
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              )}

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.fullName}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
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
