import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { incomeCategories, incomePaymentMethods } from "../assets/dummyData";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  addIncome,
  editIncome,
  resetMonthlyIncome,
  resetEditedIncome,
} from "../features/income/incomeSlice";

function IncomesForm(props: any) {
  const dispatch = useAppDispatch();
  const { isSuccess: addIncomeSuccess } = useAppSelector(
    (state) => state.income.addedIncome
  );
  const { isSuccess: editIncomeSuccess } = useAppSelector(
    (state) => state.income.editedIncome
  );
  const user = localStorage.getItem("user");
  const { id: userId } = JSON.parse(user || "{}");
  const { action, income } = props;
  const [formData, setFormData] = useState({
    incDate: new Date().toISOString().substring(0, 10),
    category: incomeCategories[0],
    note: "",
    amount: "",
    paymentMethod: incomePaymentMethods[0],
  });

  const [formTitle, setFormTitle] = useState<string>("");
  const [buttonTitle, setButtonTitle] = useState<string>("");

  const { incDate, category, note, amount, paymentMethod } = formData;

  const handleClose = () => {
    setFormData({
      incDate: new Date().toISOString().substring(0, 10),
      category: incomeCategories[0],
      note: "",
      amount: "",
      paymentMethod: incomePaymentMethods[0],
    });

    props.onHide();
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    const formattedPrice = parseFloat(amount).toFixed(2);
    action === "add"
      ? dispatch(
          addIncome({
            date: incDate,
            category,
            note,
            amount: formattedPrice,
            payment: paymentMethod,
            userId,
          })
        )
      : dispatch(
          editIncome({
            id: income.id,
            date: incDate,
            category,
            note,
            amount: formattedPrice,
            payment: paymentMethod,
            userId,
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
  };

  useEffect(() => {
    switch (action) {
      case "add":
        setFormTitle("Add New Income");
        setButtonTitle("Add");
        break;
      case "edit":
        setFormTitle("Edit Income");
        setButtonTitle("Edit");
        setFormData({
          incDate: income.date,
          category: income.category,
          note: income.note,
          amount: income.amount.toString(),
          paymentMethod: income.payment,
        });
        break;
      default:
        setFormTitle("Add New Income");
        setButtonTitle("Add");
        break;
    }
  }, [action, income]);

  useEffect(() => {
    if (addIncomeSuccess || editIncomeSuccess) {
      dispatch(resetMonthlyIncome());
      dispatch(resetEditedIncome());
    }
  }, [addIncomeSuccess, editIncomeSuccess, dispatch]);

  return (
    <div>
      {" "}
      {/* <Button variant="outline-dark" size="sm" onClick={handleShow}>
          Add New
        </Button> */}
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="incomeDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="incDate"
                placeholder="Enter date"
                onChange={handleChange}
                value={incDate}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="incomeCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                id="category-select"
                name="category"
                value={category}
                onChange={handleChange}
                aria-label="Select category"
              >
                {incomeCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="incomeAmount">
              <Form.Label>Amount (RM)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Amount"
                min="0"
                pattern="[0-9]+"
                onChange={handleChange}
                value={amount}
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
                {incomePaymentMethods.map((met, index) => (
                  <option key={index} value={met}>
                    {met}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="incomeNote">
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
            {buttonTitle}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default IncomesForm;
