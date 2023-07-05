import React, { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { resetLoginUser, logoutUser } from "../features/user/userSlice";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSelector((state) => state.user.loginUser);
  const { user } = useAppSelector((state) => state.user.getUser);

  const dispatch = useAppDispatch();
  const { isSuccess: logoutSuccess } = useAppSelector(
    (state) => state.user.logoutUser
  );

  const handleLogout = () => {
    dispatch(logoutUser("logout"));
    localStorage.removeItem("user");
  };

  const handleLocation = () => {
    localStorage.setItem("location", location.pathname);
  };

  useEffect(() => {
    if (logoutSuccess) {
      navigate("/login");
      dispatch(resetLoginUser());
      window.location.reload();
    }
  }, [logoutSuccess, dispatch, navigate]);

  return (
    <header
      id="header"
      className="w-100 top-0 position-sticky fs-4 fw-semibold p-3 bg-dark  text-white"
    >
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavLink to="/" className="navbar-brand">
            Atur Belanja
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <SearchBox /> */}
            <Nav className="ms-auto">
              {user && isLoggedIn ? (
                <>
                  <NavLink to="/records" className="nav-link">
                    Records
                  </NavLink>
                  <NavLink to="/budget" className="nav-link">
                    Budgeting
                  </NavLink>
                  <NavLink to="/dashboard" className="nav-link">
                    Insights
                  </NavLink>
                  <NavDropdown title={user.name} id="username">
                    <NavLink to="/profile" className="dropdown-item">
                      Profile
                    </NavLink>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={handleLocation}
                >
                  <i className="fas fa-user"></i>Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
