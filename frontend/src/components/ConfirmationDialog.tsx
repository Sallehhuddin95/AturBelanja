import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { deleteExpense } from "../features/expense/expenseSlice";

function ConfirmationDialog(props: any) {
  const dispatch = useAppDispatch();
  const { action, id } = props;
  console.log("ConfirmationDialog id: ", id);

  const handleClose = () => {
    props.onHide();
  };

  const handleYes = (e: any) => {
    e.preventDefault();
    dispatch(deleteExpense({ id }));
    props.onHide();
    //Refresh current page
    window.location.reload();
  };

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete this expense?</Modal.Body>
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
