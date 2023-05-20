import axios from "axios";

const API_URL = "/api/income-records/";

const getIncomes = async (data: any) => {
  const response = await axios.get(API_URL, {
    params: data,
  });

  return response.data;
};

const incomeService = {
  getIncomes,
};

export default incomeService;
