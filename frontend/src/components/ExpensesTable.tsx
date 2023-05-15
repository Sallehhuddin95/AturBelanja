import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getExpenses } from "../features/expense/expenseSlice";

const monthsList: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface expenseRecord {
  id: string;
  date: Date;
  detail: string;
  price: number;
  payment: string;
  category: string;
  note: string;
}

function ExpensesTable(props: any) {
  const dispatch = useAppDispatch();
  const { monthlyExpenses } = useAppSelector((state) => state.expense);

  // const [expenses, setExpenses] = useState<expenseRecord[]>([]);
  const { selectedMonth, selectedYear } = props;
  const monthNumber = monthsList.indexOf(selectedMonth);
  const date = new Date(selectedYear, monthNumber + 1, 0);

  // get number of days in month
  const daysInMonth = date.getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const currentDay = new Date().getDate();

  const handleEdit = (id: string) => {
    console.log("Edit id: ", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete id: ", id);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        dispatch(getExpenses({ month: monthNumber + 1, year: selectedYear }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, [monthNumber, selectedYear, dispatch]);

  return (
    <>
      {daysArray.map((day) => (
        <div key={day} className="my-3">
          <Row className="my-3">
            <Col>
              <strong>
                Date: {day} {selectedMonth} {selectedYear}
              </strong>
            </Col>{" "}
            <Col>Total Daily Income: </Col> <Col>Total Daily Spending: </Col>
          </Row>
          <Row>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Details</th>
                  <th>Category</th>
                  <th>Price (RM)</th>
                  <th>Payment Method</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {monthlyExpenses.expenses
                  .filter((expense) => new Date(expense.date).getDate() === day)
                  .map((expense, index) => (
                    <tr key={expense.id}>
                      <td>{index + 1}</td>
                      <td>{expense.detail}</td>
                      <td>{expense.category}</td>
                      <td>{expense.price}</td>
                      <td>{expense.payment}</td>
                      <td>{expense.note}</td>
                      <td className="d-flex justify-content-center">
                        <Button
                          className="me-2"
                          onClick={() => handleEdit(expense.id)}
                        >
                          <FaEdit />
                        </Button>
                        <Button onClick={() => handleDelete(expense.id)}>
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Row>
        </div>
      ))}
    </>
  );
}

export default ExpensesTable;
