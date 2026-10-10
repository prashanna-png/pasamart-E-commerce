/* eslint-disable react-hooks/set-state-in-effect */
import Product from "../components/Product.jsx";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const resp = await fetch("/api/products");
      const data = await resp.json();
      setProducts(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h2>Latest Products</h2>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((p) => (
            <Col key={p._id}>
              <Product product={p} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
