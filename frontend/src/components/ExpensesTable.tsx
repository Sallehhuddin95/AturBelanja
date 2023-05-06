import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { dummyExpenses } from "../assets/dummyData";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Axios from "axios";

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
  const [expenses, setExpenses] = useState<expenseRecord[]>([]);
  const { selectedMonth, selectedYear } = props;
  const currentDay = new Date().getDate();

  const numberOfDaysInMonth = (year: number, monthName: string): number => {
    // Create a new date object with the year and month
    const monthNumber = monthsList.indexOf(monthName);
    const date = new Date(year, monthNumber + 1, 0);

    // Return the number of days in the month
    return date.getDate();
  };

  const daysInMonth = numberOfDaysInMonth(selectedYear, selectedMonth);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleEdit = (id: string) => {
    console.log("Edit id: ", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete id: ", id);
  };

  useEffect(() => {
    Axios.get<expenseRecord[]>("http://127.0.0.1:8000/api/expense-records")
      .then((response) => {
        console.log(response.data[0]);
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                {expenses.map((expense, index) => (
                  <tr key={expense.id}>
                    <td>{index + 1}</td>
                    <td>{expense.detail}</td>
                    <td>{expense.category}</td>
                    <td>{expense.price}</td>
                    <td>{expense.payment}</td>
                    <td>{expense.note}</td>
                    <td className="d-flex justify-content-center">
                      {" "}
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
