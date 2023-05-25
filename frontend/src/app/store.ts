import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import expenseReducer from "../features/expense/expenseSlice";
import incomeReducer from "../features/income/incomeSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    // reducer
    expense: expenseReducer,
    income: incomeReducer,
    user: userReducer,
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
