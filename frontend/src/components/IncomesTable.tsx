import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IncomesForm, ConfirmationDialog } from ".";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getIncomes } from "../features/income/incomeSlice";

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

interface incomeRecord {
  id: string;
  date: Date;
  amount: number;
  payment: string;
  category: string;
  note: string;
}

function IncomesTable(props: any) {
  const dispatch = useAppDispatch();
  const { monthlyIncomes } = useAppSelector((state) => state.income);
  const [openExpenseForm, setOpenExpenseForm] = useState<boolean>(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string>("");
  const [totalIncomes, setTotalIncomes] = useState<{ [key: number]: number }>(
    {}
  );

  // const [expenses, setExpenses] = useState<expenseRecord[]>([]);
  const { selectedMonth, selectedYear } = props;
  const monthNumber = monthsList.indexOf(selectedMonth);
  const date = new Date(selectedYear, monthNumber + 1, 0);

  // get number of days in month
  const daysInMonth = date.getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const currentDay = new Date().getDate();

  const handleEdit = (id: string) => {
    setSelectedExpenseId(id);
    setOpenExpenseForm(true);
  };

  const handleDelete = (id: string) => {
    console.log("Delete id: ", id);
    setSelectedExpenseId(id);
    setOpenConfirmationDialog(true);
  };

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        dispatch(getIncomes({ month: monthNumber + 1, year: selectedYear }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchIncomes();
  }, [monthNumber, selectedYear, dispatch]);

  useEffect(() => {
    // Calculate total income for each day
    const calculateTotalIncomes = (day: number) => {
      const incomesForDay = monthlyIncomes.incomes.filter(
        (income: incomeRecord) => new Date(income.date).getDate() === day
      );
      const total = incomesForDay.reduce(
        (sum: number, income: incomeRecord) => sum + income.amount,
        0
      );
      return total.toFixed(2);
    };

    // Calculate total incomes for all days
    const totalIncomesByDay: { [key: number]: number } = {};
    daysArray.forEach((day) => {
      totalIncomesByDay[day] = parseFloat(calculateTotalIncomes(day));
    });

    setTotalIncomes(totalIncomesByDay);
  }, [monthlyIncomes.incomes, daysArray]);

  return (
    <>
      <IncomesForm action="delete" />
      {daysArray.map((day) => (
        <div key={day} className="my-3">
          <Row className="my-3">
            <Col>
              <strong>
                Date: {day} {selectedMonth} {selectedYear}
              </strong>
            </Col>{" "}
            <Col>Total Daily Income: RM {totalIncomes[day]}</Col>{" "}
          </Row>
          <Row>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Amount (RM)</th>
                  <th>Category</th>
                  <th>Payment Method</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {monthlyIncomes.incomes
                  .filter((income) => new Date(income.date).getDate() === day)
                  .map((income, index) => (
                    <tr key={income.id}>
                      <td>{index + 1}</td>
                      <td>{income.category}</td>
                      <td>{income.amount}</td>
                      <td>{income.payment}</td>
                      <td>{income.note}</td>
                      <td className="d-flex justify-content-center">
                        <Button
                          className="me-2"
                          onClick={() => handleEdit(income.id)}
                        >
                          <FaEdit />
                        </Button>

                        <Button onClick={() => handleDelete(income.id)}>
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

      {openExpenseForm && (
        <IncomesForm
          action="edit"
          expense={monthlyIncomes.incomes.find(
            (income) => income.id === selectedExpenseId
          )}
          show={openExpenseForm}
          onHide={() => setOpenExpenseForm(false)}
        />
      )}

      {openConfirmationDialog && (
        <ConfirmationDialog
          action="delete"
          id={selectedExpenseId}
          show={openConfirmationDialog}
          onHide={() => setOpenConfirmationDialog(false)}
        />
      )}
    </>
  );
}

export default IncomesTable;
