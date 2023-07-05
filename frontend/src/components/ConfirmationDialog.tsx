import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  deleteExpense,
  resetMonthlyExpense,
  resetDeletedExpense,
} from "../features/expense/expenseSlice";
import {
  deleteIncome,
  resetMonthlyIncome,
  resetDeletedIncome,
} from "../features/income/incomeSlice";
import {
  deleteBudget,
  resetMonthlyBudgets,
  resetDeletedBudget,
} from "../features/budget/budgetSlice";

function ConfirmationDialog(props: any) {
  const dispatch = useAppDispatch();
  const { isSuccess: delExpenseSuccess } = useAppSelector(
    (state) => state.expense.deletedExpense
  );
  const { isSuccess: delIncomeSuccess } = useAppSelector(
    (state) => state.income.deletedIncome
  );

  const { isSuccess: delBudgetSuccess } = useAppSelector(
    (state) => state.budget.deletedBudget
  );
  const [text, setText] = useState<string>("");
  const { action, id, itemType } = props;

  const handleClose = () => {
    props.onHide();
  };

  const handleYes = (e: any) => {
    e.preventDefault();

    if (itemType === "income") {
      dispatch(deleteIncome({ id }));
      dispatch(resetDeletedIncome());
      dispatch(resetMonthlyIncome());
    } else if (itemType === "expense") {
      dispatch(deleteExpense({ id }));
      dispatch(resetDeletedExpense());
      dispatch(resetMonthlyExpense());
    } else if (itemType === "budget") {
      dispatch(deleteBudget({ id }));
      dispatch(resetDeletedBudget());
      dispatch(resetMonthlyBudgets());
    } else {
      null;
    }

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
      case "budget":
        setText("Budget");
        break;
      default:
        break;
    }
  }, [itemType]);

  // useEffect(() => {
  //   if (delExpenseSuccess) {
  //     dispatch(resetDeletedExpense());
  //     dispatch(resetMonthlyExpense());
  //   }
  //   if (delIncomeSuccess) {
  //     dispatch(resetDeletedIncome());
  //     dispatch(resetMonthlyIncome());
  //   }
  //   if (delBudgetSuccess) {
  //     dispatch(resetDeletedBudget());
  //     dispatch(resetMonthlyBudgets());
  //   }
  // }, [delExpenseSuccess, delIncomeSuccess, dispatch, delBudgetSuccess]);

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete this {text.toLowerCase()} ?
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
