import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { expenseCategories, paymentMethods } from "../assets/dummyData";

function ExpensesForm() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    expDate: new Date().toISOString().substring(0, 10),
    details: "",
    category: expenseCategories[0],
    price: "",
    paymentMethod: paymentMethods[0],
  });

  const { expDate, details, category, price, paymentMethod } = formData;

  const handleClose = () => {
    setShow(false);
    setFormData({
      expDate: new Date().toISOString().substring(0, 10),
      details: "",
      category: expenseCategories[0],
      price: "",
      paymentMethod: paymentMethods[0],
    });
  };
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    console.log("Add button clicked");
    handleClose();
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  return (
    <div>
      {" "}
      <Button variant="outline-dark" size="sm" onClick={handleShow}>
        Add New
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your new expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="expenseDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="expDate"
                placeholder="Enter date"
                onChange={handleChange}
                value={expDate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="expenseDetails">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                name="details"
                placeholder="Enter details"
                onChange={handleChange}
                value={details}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="expenseCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                id="category-select"
                name="category"
                value={category}
                onChange={handleChange}
                aria-label="Select category"
              >
                {expenseCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="expensePrice">
              <Form.Label>Price (RM)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Price"
                min="0"
                pattern="[0-9]+"
                onChange={handleChange}
                value={price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="paymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                id="method-select"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handleChange}
                aria-label="Select payment method"
              >
                {paymentMethods.map((met, index) => (
                  <option key={index} value={met}>
                    {met}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExpensesForm;
