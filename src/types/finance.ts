export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'food' 
  | 'transport' 
  | 'housing' 
  | 'entertainment' 
  | 'health'
  | 'education'
  | 'others'
  | 'gardening'
  | 'maintenance'
  | 'fitness'
  | 'beauty'
  | 'technology'
  | 'clothing'
  | 'pets';

export interface Account {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isDefault?: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: TransactionType;
  category: Category;
  whatsappSource?: boolean;
  accountId?: string;
  subcategory?: string;
}

export interface MonthlyBudget {
  income: number;
  expenses: number;
  month: string;
}

export interface CategorySummary {
  category: Category;
  amount: number;
  percentage: number;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
  balance: number;
  categorySummary: CategorySummary[];
}

export interface SavingSuggestion {
  id: string;
  category: Category;
  title: string;
  description: string;
  potentialSaving: number;
}

export interface WhatsAppMessage {
  id: string;
  content: string;
  timestamp: string;
  fromUser: boolean;
}
