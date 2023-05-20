import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import expenseReducer from "../features/expense/expenseSlice";
import incomeReducer from "../features/income/incomeSlice";

const store = configureStore({
  reducer: {
    // reducer
    expense: expenseReducer,
    income: incomeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
