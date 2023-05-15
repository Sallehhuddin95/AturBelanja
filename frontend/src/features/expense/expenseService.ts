import axios from "axios";

const API_URL = "/api/expense";

const getExpenses = async (data: any) => {
  const response = await axios.get(API_URL, {
    params: data,
  });
  console.log("response", response.data);

  return response.data;
};

const expenseService = {
  getExpenses,
};

export default expenseService;
