import React, { useEffect, useState, useRef } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Loader, Message } from "../components";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { getMonthlyBudgets } from "../features/budget/budgetSlice";
import { monthsName } from "../assets/constants";

function BudgetsTable(props: any) {
  const dispatch = useAppDispatch();
  const { selectedMonth, selectedYear } = props;
  const user = localStorage.getItem("user");
  const { id: userId } = JSON.parse(user || "{}");
  const monthNumber = monthsName.find((m) => m.name === selectedMonth)?.id;
  const { budgets, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.budget.monthlyBudgets
  );

  useEffect(() => {
    dispatch(
      getMonthlyBudgets({ month: monthNumber, year: selectedYear, userId })
    );
  }, [dispatch, selectedMonth, selectedYear, monthNumber, userId, isSuccess]);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <>
      {isLoading && <Loader />}
      {isError && message && <Message variant="danger">{message}</Message>}
      <Row className="my-3">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
              <th>Allocation (RM)</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{budget.category}</td>
                <td>{budget.budget}</td>
                <td>{budget.note}</td>
                <td className="d-flex justify-content-center">
                  <Button className="me-2" onClick={() => handleEdit()}>
                    <FaEdit />
                  </Button>

                  <Button onClick={() => handleDelete()}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default BudgetsTable;
