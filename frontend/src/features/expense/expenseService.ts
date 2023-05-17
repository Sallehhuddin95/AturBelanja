import axios from "axios";

const API_URL = "/api/expense/";

const getExpenses = async (data: any) => {
  const response = await axios.get(API_URL, {
    params: data,
  });
  console.log("response", response.data);

  return response.data;
};

const addExpense = async (data: any) => {
  console.log("price", data.price);

  const response = await axios.post(`${API_URL}add/`, data);
  return response.data;
};

const expenseService = {
  getExpenses,
  addExpense,
};

export default expenseService;
