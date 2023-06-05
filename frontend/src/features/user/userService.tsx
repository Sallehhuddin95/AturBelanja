import axios from "axios";

const API_URL = "/api/users/";

export const registerUser = async (data: any) => {
  const response = await axios.post(`${API_URL}register/`, data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await axios.post(`${API_URL}login/`, data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const logoutUser = async (data: any) => {
  localStorage.removeItem("user");
};

const userService = {
  registerUser,
  loginUser,
  logoutUser,
};

export default userService;
