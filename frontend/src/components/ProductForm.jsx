import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function ProductForm({ product }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ?? "",
    brand: product?.brand || "",
    category: product?.category || "",
    countInStock: product?.countInStock ?? "",
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      let imageUrl = product?.image || "";

      if (image) {
        const imageData = new FormData();
        imageData.append("image", image);

        const uploadResp = await axios.post("/api/upload", imageData, {
          withCredentials: true,
        });

        imageUrl = uploadResp.data.image;
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        image: imageUrl,
      };

      if (product) {
        await axios.put(`/api/products/${product._id}`, productData, {
          withCredentials: true,
        });
      } else {
        await axios.post("/api/products", productData, {
          withCredentials: true,
        });
      }
      navigate("/admin/products");
    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
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
            required={!product}
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Saving...
            </>
          ) : product ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;
