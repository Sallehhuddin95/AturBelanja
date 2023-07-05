import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import imageExpense from "../assets/images/expense.jpg";
import imageIncome from "../assets/images/income.jpg";
import imageBudget from "../assets/images/budgeting.jpg";
import imageAnalytic from "../assets/images/analytics.jpg";
import { useAppSelector } from "../app/hook";
import { Link, useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.user.loginUser);
  const { user } = useAppSelector((state) => state.user.getUser);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container>
      <h2 className="my-3">
        {isLoggedIn && user
          ? `Welcome, ${user.name}`
          : "Welcome to Atur Belanja"}
      </h2>
      <main className="flex-grow">
        <section>
          <Row>
            <Col>
              {" "}
              <h3>Track Your Expenses and Incomes with Ease</h3>
              <p>
                Atur Belanja is a powerful tool that helps you stay on top of
                your financial activities. Whether you want to track your daily
                expenses, monitor your income sources, or analyze your spending
                patterns, our app provides you with the necessary features and
                insights to manage your money effectively
              </p>
              {!isLoggedIn && (
                <>
                  <p>
                    <strong>
                      Sign up today and start managing your finances!
                    </strong>
                  </p>
                  <Button variant="primary" size="lg" onClick={handleRegister}>
                    Register
                  </Button>
                </>
              )}
            </Col>
            <Col></Col>
          </Row>
          {isLoggedIn && (
            <Row className="mt-3">
              <Col>
                <h2>Track Your Expenses</h2>
                <p>
                  Easily keep track of your daily expenses and categorize them
                  for better financial management.
                </p>
                <Link to="/records">
                  <Button variant="primary">Go to Expenses</Button>
                </Link>
              </Col>
              <Col>
                <h2>Create a Budget</h2>
                <p>
                  Set a budget and monitor your spending to ensure you stay
                  within your financial goals.
                </p>
                <Link to="/budget">
                  <Button variant="primary">Go to Budgeting</Button>
                </Link>
              </Col>
            </Row>
          )}
        </section>
        <section className="mt-5">
          <h3>Key Features of Atur Belanja</h3>
          <div className="mt-4">
            <Row>
              <Col md={3} className="mb-3">
                <Card className="feature-card  p-2">
                  <Card.Img
                    variant="top"
                    src={imageExpense}
                    alt="Feature 1"
                    className="feature-image"
                  />
                  <a href="http://www.freepik.com">
                    Designed by vectorjuice / Freepik
                  </a>
                  <Card.Body>
                    <Card.Title>Expense Tracking</Card.Title>
                    <Card.Text>
                      Easily record your expenses, categorize them, and track
                      where your money is going.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className="feature-card p-2">
                  <Card.Img
                    variant="top"
                    src={imageIncome}
                    alt="Feature 2"
                    className="feature-image"
                  />
                  <a href="http://www.freepik.com">Designed by Freepik</a>
                  <Card.Body>
                    <Card.Title>Income Management</Card.Title>
                    <Card.Text>
                      Keep track of your various income sources and stay
                      informed about your total earnings.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className="feature-card p-2">
                  <Card.Img
                    variant="top"
                    src={imageBudget}
                    alt="Feature 2"
                    className="feature-image"
                  />
                  <a href="http://www.freepik.com">
                    Designed by macrovector_official / Freepik
                  </a>
                  <Card.Body>
                    <Card.Title>Budgeting</Card.Title>

                    <Card.Text>
                      Set monthly budgets for different expense categories and
                      receive notifications when you exceed your limits.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className="feature-card p-2">
                  <Card.Img
                    variant="top"
                    src={imageAnalytic}
                    alt="Feature 2"
                    className="feature-image"
                  />
                  <a href="https://www.freepik.com/free-photo/businesswoman-using-tablet-analysis-graph-company-finance-strategy-statistics-success-concept-planning-future-office-room_16068533.htm#query=analytic&position=1&from_view=search&track=sph">
                    Image by our-team
                  </a>{" "}
                  <Card.Body>
                    <Card.Title>Reports and Insights</Card.Title>
                    <Card.Text>
                      Gain valuable insights through visual charts to understand
                      your spending habits and make informed financial
                      decisions.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </main>
    </Container>
  );
}

export default HomeScreen;
