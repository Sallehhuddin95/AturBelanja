import axios from "axios";

const API_URL = "/api/budget-records/";

const getBudgets = async (data: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  };

  console.log("data", data);

  const response = await axios.get(API_URL, config);

  return response.data;
};

const addBudget = async (data: any) => {
  const response = await axios.post(`${API_URL}add/`, data);
  return response.data;
};

const budgetService = {
  getBudgets,
  addBudget,
};

export default budgetService;
