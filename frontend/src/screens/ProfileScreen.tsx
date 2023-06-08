import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Form, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../app/hook";
import {
  updateUser,
  resetUpdateUser,
  getUser,
} from "../features/user/userSlice";

function ProfileScreen() {
  const dispatch = useAppDispatch();

  //get current user info
  const { user } = useAppSelector((state) => state.user.getUser);
  const { isSuccess } = useAppSelector((state) => state.user.updateUser);
  const [imageLink, setImageLink] = useState<string>("");

  const [formData, setFormData] = useState({
    userId: user?.id,
    name: user?.name,
    password: "********",
  });

  const { name, password } = formData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //if password is *********, pass empty string
    const passwordToSend = password === "********" ? "" : password;
    dispatch(updateUser({ ...formData, password: passwordToSend }));
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      // get user profile
      dispatch(getUser(user?.id));

      //update user info in local storage
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...currentUser,
        name: name,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      //reset update user state
      dispatch(resetUpdateUser());
    }
  }, [isSuccess, dispatch, name, user?.id]);

  return (
    <Container>
      <h3 className="text-center">Profile</h3>
      <Row className="mt-5">
        <Col md={3}>
          <h4>Profile Picture</h4>
          {imageLink ? (
            <Image src={imageLink} roundedCircle />
          ) : (
            <FaUserCircle size={70} />
          )}
        </Col>
        <Col md={9}>
          <h4>My Info</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user?.email}
                placeholder="Enter your email"
                readOnly
                style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
              />
            </Form.Group>

            {/* <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write a short bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Change Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileScreen;
