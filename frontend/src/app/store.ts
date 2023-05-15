import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import expenseReducer from "../features/expense/expenseSlice";

const store = configureStore({
  reducer: {
    // reducer
    expense: expenseReducer,
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
