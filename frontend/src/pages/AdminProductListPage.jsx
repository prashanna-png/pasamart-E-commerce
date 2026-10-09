/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";

function AdminProductListPage() {
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

  const deleteHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/api/products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h2>Manage Products</h2>
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>Product</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      {" "}
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AdminProductListPage;
