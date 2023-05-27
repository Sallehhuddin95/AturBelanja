import React, { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { resetLoginUser, logoutUser } from "../features/user/userSlice";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user.loginUser);

  const dispatch = useAppDispatch();
  const { isSuccess: logoutSuccess } = useAppSelector(
    (state) => state.user.logoutUser
  );

  const handleLogout = () => {
    dispatch(logoutUser("logout"));
    localStorage.removeItem("userInfo");
  };

  const handleLocation = () => {
    localStorage.setItem("location", location.pathname);
  };

  useEffect(() => {
    if (logoutSuccess) {
      navigate("/login");
      dispatch(resetLoginUser());
      // window.location.reload();
    }
  }, [logoutSuccess, dispatch, navigate]);

  return (
    <header className="w-100 top-0 position-sticky fs-4 fw-semibold p-3 bg-dark  text-white">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Atur Belanja</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <SearchBox /> */}
            <Nav className="ms-auto">
              <LinkContainer to="/records">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Records
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login" onClick={handleLocation}>
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
