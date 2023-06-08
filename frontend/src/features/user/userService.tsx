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

const updateUser = async (data: any, token: any) => {
  console.log(token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const id = data.userId;
  const response = await axios.put(`${API_URL}profile/update/`, data, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const getUser = async (data: any, token: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const id = data.userId;
  const response = await axios.get(`${API_URL}profile/`, config);
  return response.data;
};

export const logoutUser = async (data: any) => {
  localStorage.removeItem("user");
};

const userService = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
};

export default userService;
