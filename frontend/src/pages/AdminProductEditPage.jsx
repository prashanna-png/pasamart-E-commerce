import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductForm from "../components/ProductForm";
import axios from "axios";


function AdminProductEditPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await axios.get(`/api/products/${id}`);
        setProduct(resp.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    fetchProduct();
  }, [id]);
  return (
    <Container className="my-4">
      <h2>Edit Product</h2>
      {product && <ProductForm product={product} />}
    </Container>
  );
}

export default AdminProductEditPage;
