import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import expenseService from "./expenseService";

type Expense = {
  id: string;
  date: Date;
  category: string;
  note: string;
  payment: string;
  detail: string;
  price: number;
};

type ExpenseState = {
  monthlyExpenses: {
    expenses: Expense[];
    isLoading: boolean;
    isErrored: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  addedExpense: {
    expense: Expense[];
    isLoading: boolean;
    isErrored: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  deletedExpense: {
    expense: Expense[];
    isLoading: boolean;
    isErrored: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
};

const initialState: ExpenseState = {
  monthlyExpenses: {
    expenses: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    errorMessage: "",
  },
  addedExpense: {
    expense: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    errorMessage: "",
  },
  deletedExpense: {
    expense: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const getExpenses = createAsyncThunk(
  "expense/getExpenses",
  async (data: any, thunkAPI) => {
    try {
      return await expenseService.getExpenses(data);
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

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (data: any, thunkAPI) => {
    try {
      return await expenseService.addExpense(data);
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

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (data: any, thunkAPI) => {
    try {
      return await expenseService.deleteExpense(data);
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

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    resetState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state, action) => {
        state.monthlyExpenses.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.monthlyExpenses.isLoading = false;
        state.monthlyExpenses.isSuccess = true;
        state.monthlyExpenses.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.monthlyExpenses.isLoading = false;
        state.monthlyExpenses.isErrored = true;
        state.monthlyExpenses.errorMessage = "Error fetching expenses";
      })
      .addCase(addExpense.pending, (state, action) => {
        state.addedExpense.isLoading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.addedExpense.isLoading = false;
        state.addedExpense.isSuccess = true;
        state.addedExpense.expense = action.payload;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.addedExpense.isLoading = false;
        state.addedExpense.isErrored = true;
        state.addedExpense.errorMessage = "Error adding expense";
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.deletedExpense.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.deletedExpense.isLoading = false;
        state.deletedExpense.isSuccess = true;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.deletedExpense.isLoading = false;
        state.deletedExpense.isErrored = true;
        state.deletedExpense.errorMessage = "Error deleting expense";
      });
  },
});

export const { resetState } = expenseSlice.actions;
export const selectExpenses = (state: RootState) =>
  state.expense.monthlyExpenses;
export default expenseSlice.reducer;
