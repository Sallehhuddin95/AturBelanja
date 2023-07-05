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

type TotalExpense = {
  id: string;
  month: number;
  year: number;
  total_value: number;
  created_at: string;
  updated_at: string;
};

type ExpenseState = {
  monthlyExpenses: {
    expenses: Expense[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  allExpenses: {
    expenses: TotalExpense[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  addedExpense: {
    expense: Expense[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  deletedExpense: {
    expense: Expense[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  editedExpense: {
    expense: Expense[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string | null;
  };
};

const initialState: ExpenseState = {
  monthlyExpenses: {
    expenses: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  allExpenses: {
    expenses: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  addedExpense: {
    expense: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  deletedExpense: {
    expense: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  editedExpense: {
    expense: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
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

export const getExpensesByYear = createAsyncThunk(
  "expense/getExpensesByYear",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().user.loginUser.user?.token;
      // console.log("token", token);
      return await expenseService.getExpensesByYear(data, token);
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

export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async (data: any, thunkAPI) => {
    try {
      return await expenseService.editExpense(data);
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
    resetMonthlyExpense: (state) => {
      state.monthlyExpenses = initialState.monthlyExpenses;
    },
    resetAllExpense: (state) => {
      state.allExpenses = initialState.allExpenses;
    },
    resetAddedExpense: (state) => {
      state.addedExpense = initialState.addedExpense;
    },
    resetDeletedExpense: (state) => {
      state.deletedExpense = initialState.deletedExpense;
    },
    resetEditedExpense: (state) => {
      state.editedExpense = initialState.editedExpense;
    },
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
        state.monthlyExpenses.isError = true;
        state.monthlyExpenses.message = "Error: " + action.payload;
      })
      .addCase(getExpensesByYear.pending, (state, action) => {
        state.allExpenses.isLoading = true;
      })
      .addCase(getExpensesByYear.fulfilled, (state, action) => {
        state.allExpenses.isLoading = false;
        state.allExpenses.isSuccess = true;
        state.allExpenses.expenses = action.payload;
      })
      .addCase(getExpensesByYear.rejected, (state, action) => {
        state.allExpenses.isLoading = false;
        state.allExpenses.isError = true;
        state.allExpenses.message = "Error: " + action.payload;
      })
      .addCase(addExpense.pending, (state, action) => {
        state.addedExpense.isLoading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.addedExpense.isLoading = false;
        state.addedExpense.isSuccess = true;
        state.addedExpense.expense = action.payload;
        state.monthlyExpenses.isSuccess = false;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.addedExpense.isLoading = false;
        state.addedExpense.isError = true;
        state.addedExpense.message = "Error: " + action.payload;
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.deletedExpense.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.deletedExpense.isLoading = false;
        state.deletedExpense.isSuccess = true;
        state.deletedExpense.expense = action.payload;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.deletedExpense.isLoading = false;
        state.deletedExpense.isError = true;
        state.deletedExpense.message = "Error: " + action.payload;
      })
      .addCase(editExpense.pending, (state, action) => {
        state.editedExpense.isLoading = true;
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        state.editedExpense.isLoading = false;
        state.editedExpense.isSuccess = true;
        state.editedExpense.expense = action.payload;
      })

      .addCase(editExpense.rejected, (state, action) => {
        state.editedExpense.isLoading = false;
        state.editedExpense.isError = true;
        state.editedExpense.message = "Error: " + action.payload;
      });
  },
});

export const {
  resetMonthlyExpense,
  resetAllExpense,
  resetAddedExpense,
  resetDeletedExpense,
  resetEditedExpense,
} = expenseSlice.actions;
export const selectExpenses = (state: RootState) =>
  state.expense.monthlyExpenses;
export default expenseSlice.reducer;
