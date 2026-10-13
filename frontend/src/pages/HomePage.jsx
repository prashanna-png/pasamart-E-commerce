/* eslint-disable react-hooks/set-state-in-effect */
import Product from "../components/Product.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <Container>
      <h2 className="my-4">Latest Products</h2>

      {products.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {selectedCategory !== "All" && (
        <h5 className="text-muted mb-3">
          {selectedCategory} ({filteredProducts.length})
        </h5>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredProducts.map((p) => (
          <Col key={p._id}>
            <Product product={p} />
          </Col>
        ))}
      </Row>

      {filteredProducts.length === 0 && products.length > 0 && (
        <p className="text-center text-muted my-5">
          No products in this category.
        </p>
      )}
    </Container>
  );
}

export default HomePage;
