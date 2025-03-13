
// Define types for our application

export interface BudgetEntry {
  category: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'annually';
  monthlyTotal: number;
}

export interface BudgetData {
  id: string;
  createdAt: string;
  income: BudgetEntry[];
  expenses: BudgetEntry[];
  savings: BudgetEntry[];
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  netCashFlow: number;
}

export interface FinancialAdvice {
  id: string;
  createdAt: string;
  originalPrompt: string;
  advice: string;
  budgetId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
