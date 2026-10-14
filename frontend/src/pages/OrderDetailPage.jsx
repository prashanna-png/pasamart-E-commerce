import { Link, useParams } from "react-router-dom";
import { ListGroup, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

function OrderDetailPage() {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const fetchOrderById = async () => {
    setIsLoading(true);

    try {
      const resp = await axios.get("/api/orders/" + id);
      console.log(resp);
      setOrder(resp.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderById();
  }, []);



  const handlePayment = async () => {
    const res = await axios.get(`/api/orders/${order._id}/getpaymentdetails`);

    const detail = res.data;

    const form = document.createElement("form");

    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    form.method = "POST";

    for (let key in detail) {
      const input = document.createElement("input");

      input.type = "hidden";
      input.id = key;
      input.name = key;
      input.value = detail[key];

      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <h1>Order {order._id}</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div style={{ lineHeight: "20px" }}>
                  <p>
                    <strong>Name:</strong> {order?.user?.fullName}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${order?.user?.email}`}>
                      {order?.user?.email}
                    </a>
                  </p>

                  <p>
                    <strong>Address:</strong> {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.postalCode},{" "}
                    {order.shippingAddress?.country}
                  </p>
                </div>

                <p>
                  <strong>Delivery Status:</strong>{" "}
                  {order.isDelivered
                    ? `Delivered at ${order.deliveredAt}`
                    : "Not Delivered!"}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {order.paymentMethod === "cod" ? "Cash On Delivery" : "eSewa"}
                </p>

                <p>
                  <strong>Payment Status:</strong>{" "}
                  {order.isPaid ? `Paid at ${order.paidAt}` : "Not Paid!"}
                </p>
              </ListGroup.Item>

              {order?.orderedItems && (
                <ListGroup.Item>
                  <ListGroup>
                    {order.orderedItems.map((item) => (
                      <ListGroup.Item key={item.product}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} fluid rounded />
                          </Col>

                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            Rs. {item.price} × {item.quantity} = Rs.
                            {(item.price * item.quantity).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>

          {/* Order Summary */}
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Order Summary</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>Rs. {order.itemsPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Shipping</Col>
                    <Col>Rs. {order.shippingPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Tax</Col>
                    <Col>Rs. {order.taxPrice}</Col>
                  </Row>

                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>Rs. {order.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {order.paymentMethod === "esewa" && !userInfo?.isAdmin && (
                    <Button variant="dark" onClick={handlePayment}>
                      Pay via eSewa
                    </Button>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default OrderDetailPage;
