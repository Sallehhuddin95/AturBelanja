// Define an array of payment methods
export const paymentMethods: string[] = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "Account Transfer",
  "E-Wallet",
  "Others",
];

// Define an array of income payment methods
export const incomePaymentMethods: string[] = [
  "Account Transfer",
  "E-Wallet",
  "Cash",
  "Others",
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
  "Others",
];

// Define an array of income categories
export const incomeCategories: string[] = [
  "Salary",
  "Bonus",
  "Allowance",
  "Side Hustle",
  "Petty Cash",
  "Others",
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

export const dummyBudgets = [];

////budget

interface BudgetCategory {
  id: number;
  name: string;
  budget: number;
}

interface BudgetMonth {
  year: number;
  month: string;
  categories: BudgetCategory[];
}

interface BudgetData {
  budgets: BudgetMonth[];
}

export const budgetData: BudgetData = {
  budgets: [
    {
      year: 2023,
      month: "January",
      categories: [
        {
          id: 1,
          name: "Transportation",
          budget: 200,
        },
        {
          id: 2,
          name: "Groceries",
          budget: 300,
        },
        {
          id: 3,
          name: "Entertainment",
          budget: 100,
        },
        {
          id: 4,
          name: "Utilities",
          budget: 150,
        },
        {
          id: 5,
          name: "Dining Out",
          budget: 200,
        },
      ],
    },
    {
      year: 2023,
      month: "February",
      categories: [
        {
          id: 1,
          name: "Transportation",
          budget: 200,
        },
        {
          id: 2,
          name: "Groceries",
          budget: 300,
        },
        {
          id: 3,
          name: "Entertainment",
          budget: 100,
        },
        {
          id: 4,
          name: "Utilities",
          budget: 150,
        },
        {
          id: 5,
          name: "Dining Out",
          budget: 200,
        },
      ],
    },
    {
      year: 2023,
      month: "March",
      categories: [
        {
          id: 1,
          name: "Transportation",
          budget: 200,
        },
        {
          id: 2,
          name: "Groceries",
          budget: 300,
        },
        {
          id: 3,
          name: "Entertainment",
          budget: 100,
        },
        {
          id: 4,
          name: "Utilities",
          budget: 150,
        },
        {
          id: 5,
          name: "Dining Out",
          budget: 200,
        },
      ],
    },
  ],
};
