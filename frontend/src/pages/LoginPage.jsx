import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate("/admin/products");
      } else {
        navigate(redirect);
      }
    }
  }, [userInfo, redirect, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  const resp = await fetch("/api/auth/login", {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({email, password})
      // })
      // const data = await resp.json()
      // console.log(data)
      const resp = await axios.post("/api/auth/login", { email, password });
      dispatch(setCredentials(resp.data.user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FormContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="dark" className="my-2">
          Login
        </Button>
      </Form>
    </FormContainer>
  );
}

export default LoginPage;

// checkout page summary
// shipping address:adress, city, postal code, country
// 2 payment method: cod or esewa

// right shide: shhipping site

//place order also
