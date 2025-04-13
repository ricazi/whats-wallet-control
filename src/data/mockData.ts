
// Mock Transactions
export const mockTransactions = [
  {
    id: "tx1",
    date: "2024-04-10",
    description: "Grocery Shopping",
    amount: -120.50,
    category: "Food",
    accountId: "acc1"
  },
  {
    id: "tx2",
    date: "2024-04-08",
    description: "Salary Deposit",
    amount: 2500.00,
    category: "Income",
    accountId: "acc1"
  },
  {
    id: "tx3",
    date: "2024-04-05",
    description: "Restaurant",
    amount: -45.80,
    category: "Food",
    accountId: "acc2"
  },
  {
    id: "tx4",
    date: "2024-04-03",
    description: "Internet Bill",
    amount: -79.99,
    category: "Utilities",
    accountId: "acc1"
  },
  {
    id: "tx5",
    date: "2024-04-01",
    description: "Movie Tickets",
    amount: -25.00,
    category: "Entertainment",
    accountId: "acc2"
  }
];

// Mock Accounts
export const mockAccounts = [
  {
    id: "acc1",
    name: "Main Checking",
    balance: 3254.75,
    type: "Checking"
  },
  {
    id: "acc2",
    name: "Savings",
    balance: 12500.00,
    type: "Savings"
  },
  {
    id: "acc3",
    name: "Credit Card",
    balance: -450.25,
    type: "Credit"
  }
];

// Mock Monthly Summary
export const mockMonthlySummary = [
  { month: "Jan", income: 3200, expenses: 2700 },
  { month: "Feb", income: 3200, expenses: 2900 },
  { month: "Mar", income: 3200, expenses: 2400 },
  { month: "Apr", income: 3500, expenses: 2800 },
  { month: "May", income: 3500, expenses: 2600 },
  { month: "Jun", income: 3500, expenses: 3100 },
  { month: "Jul", income: 3500, expenses: 2750 },
  { month: "Aug", income: 3800, expenses: 2900 },
  { month: "Sep", income: 3800, expenses: 2650 },
  { month: "Oct", income: 3800, expenses: 2800 },
  { month: "Nov", income: 3800, expenses: 3200 },
  { month: "Dec", income: 4200, expenses: 3600 }
];

// Mock Saving Suggestions
export const mockSavingSuggestions = [
  {
    id: "sug1",
    title: "Reduce Food Expenses",
    description: "Your food expenses are 20% higher than last month. Consider meal prepping to save money.",
    potentialSavings: 150,
    category: "Food"
  },
  {
    id: "sug2",
    title: "Entertainment Budget",
    description: "Your entertainment spending has increased significantly. Try finding free activities.",
    potentialSavings: 75,
    category: "Entertainment"
  },
  {
    id: "sug3",
    title: "Utility Bill Savings",
    description: "Your electricity bill seems higher than average. Consider energy-saving measures.",
    potentialSavings: 45,
    category: "Utilities"
  }
];

// Mock Categories with spending amounts
export const mockCategories = [
  { name: "Food", amount: 650 },
  { name: "Housing", amount: 1200 },
  { name: "Transportation", amount: 350 },
  { name: "Utilities", amount: 180 },
  { name: "Entertainment", amount: 220 },
  { name: "Healthcare", amount: 160 },
  { name: "Other", amount: 140 }
];

// Mock Budget Goals
export const mockBudgetGoals = [
  { category: "Food", budgeted: 600, actual: 650 },
  { category: "Transportation", budgeted: 300, actual: 350 },
  { category: "Entertainment", budgeted: 200, actual: 220 }
];
