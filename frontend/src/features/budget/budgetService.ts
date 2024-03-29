import axios from "axios";

const API_URL = "/api/budget-records/";

const getBudgets = async (data: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getAllBudgets = async (data: any, token: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: data,
  };

  const response = await axios.get(`${API_URL}all/`, config);
  return response.data;
};

const getBudgetByYear = async (data: any, token: any) => {
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

const addBudget = async (data: any, token: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}add/`, data, config);
  return response.data;
};

const updateBudget = async (data: any, token: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}update/${data.id}/`,
    data,
    config
  );
  return response.data;
};

const deleteBudget = async (data: any, token: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}delete/${data.id}/`, config);
  return response.data;
};

const budgetService = {
  getBudgets,
  getAllBudgets,
  getBudgetByYear,
  addBudget,
  updateBudget,
  deleteBudget,
};

export default budgetService;
