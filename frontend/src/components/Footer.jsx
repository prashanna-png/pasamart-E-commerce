import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer} className="footer">
      <div style={styles.container}>
        {/* Column 1: Brand / about */}
        <div style={styles.col}>
          <h3 style={styles.brand}>HimalayanShop</h3>
          <p style={styles.text}>
            Authentic Himalayan products, delivered to your doorstep.
          </p>
        </div>

        {/* Column 2: Shop links */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Shop</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/" style={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" style={styles.link}>
                All Products
              </Link>
            </li>
            <li>
              <Link to="/cart" style={styles.link}>
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Account links */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Account</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/profile" style={styles.link}>
                My Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Contact</h4>
          <ul style={styles.list}>
            <li style={styles.text}>Kathmandu, Nepal</li>
            <li style={styles.text}>support@himalayanshop.com</li>
            <li style={styles.text}>+977 98XXXXXXXX</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={styles.bottom}>
        <p style={styles.copy}>© {year} HimalayanShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#1f2937",
    color: "#e5e7eb",
    marginTop: "3rem",
    paddingTop: "2rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  brand: {
    color: "#f97316",
    marginBottom: "0.5rem",
    fontSize: "1.4rem",
  },
  heading: {
    color: "#ffffff",
    marginBottom: "0.75rem",
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  text: {
    color: "#9ca3af",
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#9ca3af",
    textDecoration: "none",
    fontSize: "0.9rem",
    lineHeight: 2,
    transition: "color 0.2s",
  },
  bottom: {
    borderTop: "1px solid #374151",
    padding: "1rem 1.5rem",
    textAlign: "center",
  },
  copy: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#9ca3af",
  },
};

export default Footer;
