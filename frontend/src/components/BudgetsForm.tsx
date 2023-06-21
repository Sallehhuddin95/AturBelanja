import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  addBudget,
  updateBudget,
  resetMonthlyBudgets,
  resetAddedBudget,
  resetEditedBudget,
} from "../features/budget/budgetSlice";
import { budgetCategories } from "../assets/constants";

function BudgetsForm(props: any) {
  const dispatch = useAppDispatch();
  const { action, allocation } = props;
  console.log("allocation: ", allocation);
  const { isSuccess } = useAppSelector((state) => state.budget.addedBudget);
  const { isSuccess: editSuccess } = useAppSelector(
    (state) => state.budget.editedBudget
  );

  const user = localStorage.getItem("user");
  const { id: userId } = JSON.parse(user || "{}");

  //get current month and year in Number format
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    month: currentMonth,
    year: currentYear,
    category: "Food",
    budget: "",
    note: "",
  });

  const [formTitle, setFormTitle] = useState<string>("");
  const [buttonTitle, setButtonTitle] = useState<string>("");

  const { month, year, category, note, budget } = formData;

  const handleClose = () => {
    setFormData({
      month: currentMonth,
      year: currentYear,
      category: "Food",
      budget: "",
      note: "",
    });

    props.onHide();
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    // const formattedPrice = parseFloat(price).toFixed(2);
    action === "add"
      ? dispatch(
          addBudget({
            userId,
            month,
            year,
            category,
            budget,
            note,
          })
        )
      : dispatch(
          updateBudget({
            id: allocation.id,
            userId,
            month,
            year,
            category,
            budget,
            note,
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
        setFormTitle("Add New Budget");
        setButtonTitle("Add");
        break;
      case "edit":
        setFormTitle("Edit Expense");
        setButtonTitle("Edit");
        setFormData({
          month: allocation.month,
          year: allocation.year,
          category: allocation.category,
          budget: allocation.budget,
          note: allocation.note,
        });
        break;
      default:
        setFormTitle("Add New Budget");
        setButtonTitle("Add");
        break;
    }
  }, [action, allocation]);

  useEffect(() => {
    if (isSuccess || editSuccess) {
      dispatch(resetMonthlyBudgets());
      dispatch(resetAddedBudget());
      dispatch(resetEditedBudget());
    }
  }, [isSuccess, dispatch, editSuccess]);

  return (
    <div>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="budgetMonth">
              <Form.Label>Month</Form.Label>
              <Form.Control
                type="number"
                name="budgetMonth"
                placeholder="Enter month"
                onChange={handleChange}
                value={month}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="budgetYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="budgetYear"
                placeholder="Enter year"
                onChange={handleChange}
                value={year}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="budgetCategory">
              <Form.Label>Category</Form.Label>

              <Form.Select
                id="category-select"
                typeof="text"
                name="category"
                value={category}
                onChange={handleChange}
                aria-label="Select category"
              >
                {budgetCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="budgetAllocation">
              <Form.Label>Allocation (RM)</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                placeholder="Enter allocation"
                onChange={handleChange}
                value={budget}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="budgetNote">
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

export default BudgetsForm;
