import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { expenseCategories, paymentMethods } from "../assets/dummyData";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../features/expense/expenseSlice";

function ExpensesForm(props: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addedExpense } = useAppSelector((state) => state.expense);
  const { action } = props;
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    expDate: new Date().toISOString().substring(0, 10),
    detail: "",
    category: expenseCategories[0],
    note: "",
    price: "",
    paymentMethod: paymentMethods[0],
  });

  const [formTitle, setFormTitle] = useState<string>("");

  const { expDate, detail, category, note, price, paymentMethod } = formData;

  const handleClose = () => {
    setShow(false);
    setFormData({
      expDate: new Date().toISOString().substring(0, 10),
      detail: "",
      category: expenseCategories[0],
      note: "",
      price: "",
      paymentMethod: paymentMethods[0],
    });

    // Refresh the page
    window.location.reload();
  };
  const handleShow = () => setShow(true);
  const handleAdd = (e: any) => {
    e.preventDefault();
    // console.log("Add button clicked");
    const formattedPrice = parseFloat(price).toFixed(2);
    dispatch(
      addExpense({
        date: expDate,
        detail,
        category,
        note,
        price: formattedPrice,
        payment: paymentMethod,
      })
    );

    handleClose();
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
    switch (action) {
      case "add":
        setFormTitle("Add New Expense");
        break;
      case "edit":
        setFormTitle("Edit Expense");
        break;
      default:
        setFormTitle("Add New Expense");
        break;
    }
  }, [action]);

  return (
    <div>
      {" "}
      <Button variant="outline-dark" size="sm" onClick={handleShow}>
        Add New
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
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
              <Form.Label>Detail</Form.Label>
              <Form.Control
                type="text"
                name="detail"
                placeholder="Enter detail"
                onChange={handleChange}
                value={detail}
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
            <Form.Group className="mb-3" controlId="expenseNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="text"
                name="note"
                placeholder="Enter note"
                onChange={handleChange}
                value={note}
              />
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
