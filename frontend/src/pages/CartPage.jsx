import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  Image,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function CartPage() {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleQtyUpdate = (e, item) => {
    dispatch(addToCart({ ...item, qty: Number(e.target.value) }));
  };

  return (
    <Row>
      <Col md={8}>
        {cartItems.length == 0 ? (
          <h3>
            Cart is empty. <Link to="/">Go Back</Link>
          </h3>
        ) : (
          <>
            <h2>Cart Items</h2>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          handleQtyUpdate(e, item);
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="danger"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.reduce((acc, x) => acc + x.qty, 0)}) Items
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>${totalPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="btn btn-dark" to="/login?redirect=/shipping">
                Proceed to Checkout
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;
