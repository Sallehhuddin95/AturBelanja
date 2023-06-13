import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import incomeService from "./incomeService";

type Income = {
  id: string;
  date: Date;
  amount: number;
  category: string;
  note: string;
  payment: string;
};

type IncomeState = {
  monthlyIncomes: {
    incomes: Income[];
    isLoading: boolean;
    isErrored: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  addedIncome: {
    income: Income[];
    isLoading: boolean;
    isErrored: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  editedIncome: {
    income: Income[];
    isLoading: boolean;
    isErrored: boolean;
    isSuccess: boolean;
    message: string | null;
  };
  deletedIncome: {
    income: Income[];
    isLoading: boolean;
    isErrored: boolean;
    isSuccess: boolean;
    message: string | null;
  };
};

const initialState: IncomeState = {
  monthlyIncomes: {
    incomes: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    message: "",
  },
  addedIncome: {
    income: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    message: "",
  },
  editedIncome: {
    income: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    message: "",
  },
  deletedIncome: {
    income: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    message: "",
  },
};

export const getIncomes = createAsyncThunk(
  "income/getIncomes",
  async (data: any, thunkAPI) => {
    try {
      return await incomeService.getIncomes(data);
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

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (data: any, thunkAPI) => {
    try {
      return await incomeService.addIncome(data);
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

export const editIncome = createAsyncThunk(
  "income/editIncome",
  async (data: any, thunkAPI) => {
    try {
      return await incomeService.editIncome(data);
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

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (data: any, thunkAPI) => {
    try {
      return await incomeService.deleteIncome(data);
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

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    resetMonthlyIncome: (state) => {
      state.monthlyIncomes = initialState.monthlyIncomes;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIncomes.pending, (state) => {
      state.monthlyIncomes.isLoading = true;
    });
    builder.addCase(getIncomes.fulfilled, (state, action) => {
      state.monthlyIncomes.isLoading = false;
      state.monthlyIncomes.isSuccess = true;
      state.monthlyIncomes.incomes = action.payload;
    });
    builder.addCase(getIncomes.rejected, (state, action) => {
      state.monthlyIncomes.isLoading = false;
      state.monthlyIncomes.isErrored = true;
      state.monthlyIncomes.message = "Error: " + action.payload;
    });
    builder.addCase(addIncome.pending, (state) => {
      state.addedIncome.isLoading = true;
    });
    builder.addCase(addIncome.fulfilled, (state, action) => {
      state.addedIncome.isLoading = false;
      state.addedIncome.isSuccess = true;
      state.addedIncome.income = action.payload;
    });
    builder.addCase(addIncome.rejected, (state, action) => {
      state.addedIncome.isLoading = false;
      state.addedIncome.isErrored = true;
      state.addedIncome.message = "Error: " + action.payload;
    });
    builder.addCase(editIncome.pending, (state) => {
      state.editedIncome.isLoading = true;
    });
    builder.addCase(editIncome.fulfilled, (state, action) => {
      state.editedIncome.isLoading = false;
      state.editedIncome.isSuccess = true;
      state.editedIncome.income = action.payload;
    });
    builder.addCase(editIncome.rejected, (state, action) => {
      state.editedIncome.isLoading = false;
      state.editedIncome.isErrored = true;
      state.editedIncome.message = "Error: " + action.payload;
    });
    builder.addCase(deleteIncome.pending, (state) => {
      state.deletedIncome.isLoading = true;
    });
    builder.addCase(deleteIncome.fulfilled, (state, action) => {
      state.deletedIncome.isLoading = false;
      state.deletedIncome.isSuccess = true;
      state.deletedIncome.income = action.payload;
    });
    builder.addCase(deleteIncome.rejected, (state, action) => {
      state.deletedIncome.isLoading = false;
      state.deletedIncome.isErrored = true;
      state.deletedIncome.message = "Error: " + action.payload;
    });
  },
});

export const { resetMonthlyIncome } = incomeSlice.actions;
export const selectIncomes = (state: RootState) => state.income.monthlyIncomes;
export default incomeSlice.reducer;
