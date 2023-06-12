import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  deleteExpense,
  resetMonthlyExpense,
} from "../features/expense/expenseSlice";
import { deleteIncome } from "../features/income/incomeSlice";

function ConfirmationDialog(props: any) {
  const dispatch = useAppDispatch();
  const { isSuccess: delExpenseSuccess } = useAppSelector(
    (state) => state.expense.deletedExpense
  );
  const { isSuccess: delIncomeSuccess } = useAppSelector(
    (state) => state.income.deletedIncome
  );
  const [text, setText] = useState<string>("");
  const { action, id, itemType } = props;

  const handleClose = () => {
    props.onHide();
  };

  const handleYes = (e: any) => {
    e.preventDefault();
    itemType === "income"
      ? dispatch(deleteIncome({ id }))
      : itemType === "expense"
      ? dispatch(deleteExpense({ id }))
      : null;
    props.onHide();
  };

  useEffect(() => {
    switch (itemType) {
      case "income":
        setText("Income");
        break;
      case "expense":
        setText("Expense");
        break;

      default:
        break;
    }
  }, [itemType]);

  useEffect(() => {
    if (delExpenseSuccess) {
      dispatch(resetMonthlyExpense());
    }
    if (delIncomeSuccess) {
      dispatch(resetMonthlyExpense());
    }
  }, [delExpenseSuccess, delIncomeSuccess, dispatch]);

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete this {text.toLowerCase()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleYes}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationDialog;
