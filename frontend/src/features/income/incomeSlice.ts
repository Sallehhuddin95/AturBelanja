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
    errorMessage: string;
  };
};

const initialState: IncomeState = {
  monthlyIncomes: {
    incomes: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    errorMessage: "",
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

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    resetState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getIncomes.pending, (state) => {
      state.monthlyIncomes.isLoading = true;
    });
    builder.addCase(getIncomes.fulfilled, (state, { payload }) => {
      state.monthlyIncomes.isLoading = false;
      state.monthlyIncomes.isSuccess = true;
      state.monthlyIncomes.incomes = payload;
    });
    builder.addCase(getIncomes.rejected, (state, { payload }) => {
      state.monthlyIncomes.isLoading = false;
      state.monthlyIncomes.isErrored = true;
      state.monthlyIncomes.errorMessage = "Error fetching incomes";
    });
  },
});

export const { resetState } = incomeSlice.actions;
export const selectIncomes = (state: RootState) => state.income.monthlyIncomes;
export default incomeSlice.reducer;
