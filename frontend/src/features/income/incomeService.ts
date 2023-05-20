import axios from "axios";

const API_URL = "/api/income-records/";

const getIncomes = async (data: any) => {
  const response = await axios.get(API_URL, {
    params: data,
  });

  return response.data;
};

const addIncome = async (data: any) => {
  const response = await axios.post(`${API_URL}add`, data);

  return response.data;
};

const editIncome = async (data: any) => {
  const response = await axios.put(`${API_URL}update/${data.id}/`, data);
  return response.data;
};

const incomeService = {
  getIncomes,
  addIncome,
  editIncome,
};

export default incomeService;
