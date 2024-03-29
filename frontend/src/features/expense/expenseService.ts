import axios from "axios";

const API_URL = "/api/expense-records/";

const getExpenses = async (data: any) => {
  const response = await axios.get(API_URL, {
    params: data,
  });

  return response.data;
};

const getExpensesByYear = async (data: any, token: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: data,
  };

  // console.log("data", data);

  const response = await axios.get(`${API_URL}year/`, config);
  return response.data;
};

const addExpense = async (data: any) => {
  const response = await axios.post(`${API_URL}add/`, data);
  return response.data;
};

const deleteExpense = async (data: any) => {
  console.log("data", data.id);

  const response = await axios.delete(`${API_URL}delete/${data.id}/`);
  return response.data;
};

const editExpense = async (data: any) => {
  const response = await axios.put(`${API_URL}update/${data.id}/`, data);
  return response.data;
};

const expenseService = {
  getExpenses,
  getExpensesByYear,
  addExpense,
  deleteExpense,
  editExpense,
};

export default expenseService;
