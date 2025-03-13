
// Mock API service for budgeting app

import { BudgetData, FinancialAdvice } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Budgeting endpoints
  getBudgetAdvice: async (prompt: string): Promise<FinancialAdvice> => {
    await delay(2000); // Simulate network delay
    
    // Mock response
    return {
      id: `advice-${Date.now()}`,
      createdAt: new Date().toISOString(),
      originalPrompt: prompt,
      advice: `Based on your financial situation, here are my recommendations:

1. Your housing costs are reasonable at 30% of your income.
2. Consider reducing discretionary spending by 5-10% to increase your savings rate.
3. Allocate at least 15% of your income towards retirement savings.
4. Build an emergency fund covering 3-6 months of expenses.
5. For your vacation goal, set aside $200-300 monthly in a separate savings account.

These adjustments will help you maintain financial stability while working towards your goals.`
    };
  },
  
  getSpreadsheetData: async (adviceId: string): Promise<BudgetData> => {
    await delay(1500); // Simulate network delay
    
    // Mock response
    return {
      id: `budget-${Date.now()}`,
      createdAt: new Date().toISOString(),
      income: [
        { category: 'Salary', amount: 5000, frequency: 'monthly', monthlyTotal: 5000 }
      ],
      expenses: [
        { category: 'Rent', amount: 1500, frequency: 'monthly', monthlyTotal: 1500 },
        { category: 'Utilities', amount: 500, frequency: 'monthly', monthlyTotal: 500 },
        { category: 'Groceries', amount: 200, frequency: 'weekly', monthlyTotal: 800 },
        { category: 'Transportation', amount: 400, frequency: 'monthly', monthlyTotal: 400 },
        { category: 'Entertainment', amount: 300, frequency: 'monthly', monthlyTotal: 300 }
      ],
      savings: [
        { category: 'Emergency Fund', amount: 500, frequency: 'monthly', monthlyTotal: 500 },
        { category: 'Vacation', amount: 250, frequency: 'monthly', monthlyTotal: 250 },
        { category: 'Retirement', amount: 750, frequency: 'monthly', monthlyTotal: 750 }
      ],
      totalIncome: 5000,
      totalExpenses: 3500,
      totalSavings: 1500,
      netCashFlow: 0
    };
  },
  
  // For authenticated users
  getUserBudgets: async (): Promise<{ id: string, date: string, description: string }[]> => {
    await delay(1000); // Simulate network delay
    
    // Mock response
    return [
      {
        id: 'budget-123',
        date: '2023-06-15',
        description: 'Monthly budget with focus on retirement savings'
      },
      {
        id: 'budget-456',
        date: '2023-05-20',
        description: 'Vacation planning budget'
      },
      {
        id: 'budget-789',
        date: '2023-04-10',
        description: 'Emergency fund setup'
      }
    ];
  },
  
  // Auth related mock endpoints
  login: async (email: string, password: string): Promise<{ user: { id: string, name: string, email: string } }> => {
    await delay(1500); // Simulate network delay
    
    // In a real app, this would validate credentials
    if (email && password) {
      return {
        user: {
          id: 'user-123',
          name: 'Test User',
          email: email
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (name: string, email: string, password: string): Promise<{ user: { id: string, name: string, email: string } }> => {
    await delay(1500); // Simulate network delay
    
    // In a real app, this would create a new user
    if (name && email && password) {
      return {
        user: {
          id: 'user-' + Date.now(),
          name: name,
          email: email
        }
      };
    }
    
    throw new Error('Invalid registration details');
  }
};
