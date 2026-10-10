import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    countInStock: "",
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = new FormData();
      imageData.append("image", image);

      const uploadResp = await axios.post("/api/upload", imageData, {
        withCredentials: true,
      });

      const productData = {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        image: uploadResp.data.image,
      };

      const productResp = await axios.post("/api/products", productData, {
        withCredentials: true,
      });

      console.log(productResp.data.message);
      navigate("/admin/products");
    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Error:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={formData.description}
            onChange={handleChange}
            as="textarea"
            rows={3}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Product
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;
