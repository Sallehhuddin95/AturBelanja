import React, { useEffect, useState } from "react";
import { FormContainer } from "../components";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { registerUser, reset } from "../features/user/userSlice";

function RegisterScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useAppSelector(
    (state) => state.user.registerUser
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    console.log(formData);
    e.preventDefault();
    dispatch(reset());
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [navigate, isSuccess]);

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
            value={name}
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={email}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={password}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            value={confirmPassword}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <Link to="/login">Already have an account? Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
