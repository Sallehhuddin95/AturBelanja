import axios from "axios";

const API_URL = "/api/users/";

export const registerUser = async (data: any) => {
  const response = await axios.post(`${API_URL}register/`, data);
  return response.data;
};

const userService = {
  registerUser,
};

export default userService;
