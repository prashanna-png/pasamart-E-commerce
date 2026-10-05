/* eslint-disable react-hooks/set-state-in-effect */
import Product from "../components/Product.jsx";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

function HomePage() {
  // product is varisble
  // setproduct is to modify
  //state ma kei change vayesi aebsite me auto re-render garxa
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
  },[]);

  return (
    <>
      <Container>
        <h2>Latest Product</h2>
      </Container>
      {/* <Product product={products[0]} /> */}

      <Container>
        <Row>
          {products.map((product) => (
            <Col key={product.name} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
