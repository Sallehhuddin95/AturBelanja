import React, { useEffect, useState } from "react";
import { FormContainer } from "../components";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  loginUser,
  getUser,
  resetLogoutUser,
} from "../features/user/userSlice";

function LoginScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useAppSelector(
    (state) => state.user.loginUser
  );
  const { user } = useAppSelector((state) => state.user.getUser);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

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
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/records");
      //get user profile
      dispatch(getUser(user?.id));
      dispatch(resetLogoutUser());
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [isSuccess, navigate, dispatch, user]);

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="username"
            placeholder="Enter email or username"
            onChange={handleChange}
            value={username}
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
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <Link to="/register">Don't have an account? Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
