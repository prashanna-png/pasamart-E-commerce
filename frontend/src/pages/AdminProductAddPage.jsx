import { Container } from "react-bootstrap";
import ProductForm from "../components/ProductForm";

function AdminProductAddPage() {
  return (
    <Container className="my-4">
      <h2>Add Product</h2>
      <ProductForm />
    </Container>
  );
}

export default AdminProductAddPage;
