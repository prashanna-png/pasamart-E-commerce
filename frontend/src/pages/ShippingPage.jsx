import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutStep";
import { saveShippingAddress } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address, city, postalCode, country);
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              name="city"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Postal</Form.Label>
            <Form.Control
              type="text"
              value={postalCode}
              name="postal"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              value={country}
              name="country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="dark">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingPage;
