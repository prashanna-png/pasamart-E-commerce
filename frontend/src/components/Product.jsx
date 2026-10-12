import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Ratings";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded product-card">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="product-img" />
      </Link>

      <Card.Body>
        <Card.Title className="product-title">
          <Link
            to={`/products/${product._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>

        <Card.Text as="h4" style={{ color: "#B45309" }}>
          Rs.{product.price}
        </Card.Text>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} `} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
