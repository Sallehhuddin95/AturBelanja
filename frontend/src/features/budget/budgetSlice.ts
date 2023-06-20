import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import budgetService from "./budgetService";

type Budget = {
  id: string;
  month: number;
  year: number;
  category: string;
  budget: number;
  note: string;
};

type BudgetState = {
  monthlyBudgets: {
    budgets: Budget[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  addedBudget: {
    budget: Budget[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  editedBudget: {
    budget: Budget[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  deletedBudget: {
    budget: Budget[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
};

const initialState: BudgetState = {
  monthlyBudgets: {
    budgets: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  addedBudget: {
    budget: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  editedBudget: {
    budget: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  deletedBudget: {
    budget: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};

export const getMonthlyBudgets = createAsyncThunk(
  "budgets/fetchMonthlyBudgets",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().user.loginUser.user?.token;
      // console.log("token", token);
      return await budgetService.getBudgets(data, token);
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

export const addBudget = createAsyncThunk(
  "budgets/addBudget",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().user.loginUser.user?.token;
      return await budgetService.addBudget(data, token);
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

export const updateBudget = createAsyncThunk(
  "budgets/updateBudget",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().user.loginUser.user?.token;
      return await budgetService.updateBudget(data, token);
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

export const deleteBudget = createAsyncThunk(
  "budgets/deleteBudget",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().user.loginUser.user?.token;
      return await budgetService.deleteBudget(data, token);
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

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    resetMonthlyBudgets: (state) => {
      state.monthlyBudgets = initialState.monthlyBudgets;
    },
    resetAddedBudget: (state) => {
      state.addedBudget = initialState.addedBudget;
    },
    resetEditedBudget: (state) => {
      state.editedBudget = initialState.editedBudget;
    },
    resetDeletedBudget: (state) => {
      state.deletedBudget = initialState.deletedBudget;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyBudgets.pending, (state) => {
        state.monthlyBudgets.isLoading = true;
      })
      .addCase(getMonthlyBudgets.fulfilled, (state, action) => {
        state.monthlyBudgets.isLoading = false;
        state.monthlyBudgets.isSuccess = true;
        state.monthlyBudgets.budgets = action.payload;
      })
      .addCase(getMonthlyBudgets.rejected, (state, action) => {
        state.monthlyBudgets.isLoading = false;
        state.monthlyBudgets.isError = true;
        state.monthlyBudgets.message = action.payload as string;
      })
      .addCase(addBudget.pending, (state) => {
        state.addedBudget.isLoading = true;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.addedBudget.isLoading = false;
        state.addedBudget.isSuccess = true;
        state.addedBudget.budget = action.payload;
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.addedBudget.isLoading = false;
        state.addedBudget.isError = true;
        state.addedBudget.message = action.payload as string;
      })
      .addCase(updateBudget.pending, (state) => {
        state.editedBudget.isLoading = true;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.editedBudget.isLoading = false;
        state.editedBudget.isSuccess = true;
        state.editedBudget.budget = action.payload;
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.editedBudget.isLoading = false;
        state.editedBudget.isError = true;
        state.editedBudget.message = action.payload as string;
      })
      .addCase(deleteBudget.pending, (state) => {
        state.deletedBudget.isLoading = true;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.deletedBudget.isLoading = false;
        state.deletedBudget.isSuccess = true;
        state.deletedBudget.budget = action.payload;
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.deletedBudget.isLoading = false;
        state.deletedBudget.isError = true;
        state.deletedBudget.message = action.payload as string;
      });
  },
});

export const {
  resetMonthlyBudgets,
  resetAddedBudget,
  resetDeletedBudget,
  resetEditedBudget,
} = budgetSlice.actions;
export const selectBudgets = (state: RootState) => state.budget.monthlyBudgets;
export default budgetSlice.reducer;
