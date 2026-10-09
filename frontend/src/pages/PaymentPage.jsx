import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Col, Form, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutStep";
import { savePaymentMethod } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const { paymentMethod: savedPaymentMethod } = useSelector(
    (state) => state.cart,
  );
  const [paymentMethod, setPaymentMethod] = useState(
    savedPaymentMethod || "cod",
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h2>Payment Method</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="Cash on Delivery"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod == "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="E-Sewa"
                id="esewa"
                name="paymentMethod"
                value="esewa"
                checked={paymentMethod == "esewa"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button type="submit" variant="dark" className="my-2">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default PaymentPage;
