import axios from "axios";

const API_URL = "/api/income-records/";

const getIncomes = async (data: any) => {
  const response = await axios.get(API_URL, {
    params: data,
  });

  return response.data;
};

const getIncomesByYear = async (data: any, token: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: data,
  };

  const response = await axios.get(`${API_URL}year/`, config);
  return response.data;
};

const addIncome = async (data: any) => {
  const response = await axios.post(`${API_URL}add/`, data);

  return response.data;
};

const editIncome = async (data: any) => {
  const response = await axios.put(`${API_URL}update/${data.id}/`, data);
  return response.data;
};

const deleteIncome = async (data: any) => {
  const response = await axios.delete(`${API_URL}delete/${data.id}/`);
  return response.data;
};

const incomeService = {
  getIncomes,
  getIncomesByYear,
  addIncome,
  editIncome,
  deleteIncome,
};

export default incomeService;
