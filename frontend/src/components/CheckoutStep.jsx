import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="justify-content-center mb-4">
      <Nav>
        <Nav.Item>
          {step1 ? (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Login</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <Nav.Link as={Link} to="/shipping">
              Shipping
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <Nav.Link as={Link} to="/payment">
              Payment
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <Nav.Link as={Link} to="/placeorder">
              Order
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Checkout</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default CheckoutSteps;
