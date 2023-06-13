import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import userService from "./userService";

//get current user from local storage
const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
const alreadyLoggedIn = Object.keys(currentUser).length > 0;

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
  updateUser: {
    user: User | null;
    isLoggedIn: boolean;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  getUser: {
    user: User | null;
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
    user: currentUser,
    users: null,
    isLoggedIn: alreadyLoggedIn,
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
  updateUser: {
    user: currentUser,
    isLoggedIn: alreadyLoggedIn,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: null,
  },
  getUser: {
    user: currentUser,
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

export const updateUser = createAsyncThunk(
  "user/update",
  async (formData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().user.loginUser.user?.token;
      return await userService.updateUser(formData, token);
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

export const getUser = createAsyncThunk(
  "user/getUser",
  async (formData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().user.loginUser.user?.token;
      console.log("token", token);

      return await userService.getUser(formData, token);
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
    resetUpdateUser(state) {
      state.updateUser = initialState.updateUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerUser.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerUser.isLoading = false;
        state.registerUser.isSuccess = true;
        state.registerUser.user = action.payload;
        state.registerUser.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUser.isLoading = false;
        state.registerUser.isError = true;
        state.registerUser.message = "Error: " + action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUser.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUser.isLoading = false;
        state.loginUser.isSuccess = true;
        state.loginUser.user = action.payload;
        state.loginUser.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUser.isLoading = false;
        state.loginUser.isError = true;
        state.loginUser.message = "Error: " + action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutUser.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.logoutUser.isLoading = false;
        state.logoutUser.isSuccess = true;
        state.logoutUser.isLoggedIn = false;
        state.loginUser.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutUser.isLoading = false;
        state.logoutUser.isError = true;
        state.logoutUser.message = "Error: " + action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUser.isLoading = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUser.isLoading = false;
        state.updateUser.isSuccess = true;
        state.updateUser.user = action.payload;
        state.updateUser.isLoggedIn = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUser.isLoading = false;
        state.updateUser.isError = true;
        state.updateUser.message = "Error: " + action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.getUser.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUser.isLoading = false;
        state.getUser.isSuccess = true;
        state.getUser.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUser.isLoading = false;
        state.getUser.isError = true;
        state.getUser.message = "Error: " + action.payload;
      });
  },
});

export const {
  resetLoginUser,
  resetLogoutUser,
  resetRegisterUser,
  resetUpdateUser,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user.registerUser;
export const selectLoginUser = (state: RootState) => state.user.loginUser;
export default userSlice.reducer;
