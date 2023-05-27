import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import userService from "./userService";

type User = {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  name: string;
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
  loginUser: {
    user: User | null;
    users: Users | null;
    isLoggedIn: boolean;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  logoutUser: {
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
  loginUser: {
    user: null,
    users: null,
    isLoggedIn: false,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: null,
  },
  logoutUser: {
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

export const loginUser = createAsyncThunk(
  "user/login",
  async (formData: any, thunkAPI) => {
    try {
      return await userService.loginUser(formData);
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

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (formData: any, thunkAPI) => {
    try {
      return await userService.logoutUser(formData);
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
    resetLoginUser(state) {
      state.loginUser = initialState.loginUser;
    },
    resetRegisterUser(state) {
      state.registerUser = initialState.registerUser;
    },
    resetLogoutUser(state) {
      state.logoutUser = initialState.logoutUser;
    },
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
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUser.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loginUser.isLoading = false;
        state.loginUser.isSuccess = true;
        state.loginUser.user = payload;
        state.loginUser.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loginUser.isLoading = false;
        state.loginUser.isError = true;
        state.loginUser.message = "Error: " + payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutUser.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.logoutUser.isLoading = false;
        state.logoutUser.isSuccess = true;
        state.logoutUser.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.logoutUser.isLoading = false;
        state.logoutUser.isError = true;
        state.logoutUser.message = "Error: " + payload;
      });
  },
});

export const { resetLoginUser, resetLogoutUser, resetRegisterUser } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user.registerUser;
export default userSlice.reducer;
