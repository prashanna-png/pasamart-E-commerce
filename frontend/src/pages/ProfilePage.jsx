import { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../slices/authSlice";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(userInfo?.fullName || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const updateData = {
        fullName,
        email,
      };

      if (password) {
        updateData.password = password;
      }

      const { data } = await axios.put(
        `/api/auth/update/${userInfo._id}`,
        updateData,
        { withCredentials: true },
      );

      // Keep Redux and localStorage synchronized.
      dispatch(setCredentials(data.user || data));

      setPassword("");
      setConfirmPassword("");
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to update profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="mb-4">My Profile</h1>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess("")}>
              {success}
            </Alert>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <hr className="my-4" />

            <h5 className="mb-3">Change Password</h5>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="dark"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
