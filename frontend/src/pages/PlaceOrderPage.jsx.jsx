import { Card, Col, Image, ListGroup, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutStep";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";
import axios from "axios";

function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const placeOrderHandler = async () => {
    try {
      const res = await axios.post("/api/orders", {
        orderedItems: cart.cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.qty,
          product: item._id,
        })),
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemPrice,
        shippingPrice: cart.shippingCharge,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        paymentMethod: cart.paymentMethod,
      });
      alert(res.data.message);

      dispatch(clearCart());

      navigate("/order/" + res.data.orderId);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <h1>Order</h1>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city},{cart.shippingAddress.postal},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment</h3>
              <p>
                <strong>Method: </strong>{" "}
                {cart.paymentMethod == "cod" ? "Cash On Delviery" : "E-Sewa"}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                          style={{
                            height: "80px",
                            width: "80px",
                            objectFit: "cover",
                          }}
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        Rs. {item.price} X {item.qty} = Rs. {item.price * item.qty}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Item Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>Rs. {cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>Rs. {cart.shippingCharge}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>Rs. {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>Rs. {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="dark" onClick={placeOrderHandler}>
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderPage;
