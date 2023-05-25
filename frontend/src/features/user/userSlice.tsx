import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import userService from "./userService";

type User = {
  id: string;
  username: string;
  email: string;
  accessToken: string;
};

type Users = {
  users: User[];
};

type UserState = {
  registerUser: {
    user: User | null;
    users: Users | null;
    isLoggedIn: boolean;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | null;
  };
};

const initialState: UserState = {
  registerUser: {
    user: null,
    users: null,
    isLoggedIn: false,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: null,
  },
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (formData: any, thunkAPI) => {
    try {
      return await userService.registerUser(formData);
    } catch (error: Error | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerUser.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.registerUser.isLoading = false;
        state.registerUser.isSuccess = true;
        state.registerUser.user = payload;
        state.registerUser.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.registerUser.isLoading = false;
        state.registerUser.isError = true;
        state.registerUser.message = "Error: " + payload;
      });
  },
});

export const { reset } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.registerUser;
export default userSlice.reducer;
