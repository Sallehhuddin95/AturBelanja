// Define an array of payment methods
export const paymentMethods: string[] = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "PayPal",
  "Venmo",
];

// Define an array of expense categories
export const expenseCategories: string[] = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Education",
];

interface Expense {
  id: number;
  details: string;
  category: string;
  price: number;
  paymentMethod: string;
  note: string;
}

export const dummyExpenses: Expense[] = [
  {
    id: 1,
    details: "Grocery shopping",
    category: "Food",
    price: 50,
    paymentMethod: "Cash",
    note: "",
  },
  {
    id: 2,
    details: "Movie tickets",
    category: "Entertainment",
    price: 25,
    paymentMethod: "Credit Card",
    note: "",
  },
];
