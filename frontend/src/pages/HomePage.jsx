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
      {/* <Product product={products[1]} /> */}
      <Container>
        <Row>
          {products.map((p) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={p} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
