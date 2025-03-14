
import { BudgetData, FinancialAdvice } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const API_BASE_URL = 'http://127.0.0.1:8000';
// const API_BASE_URL = "https://kappa-financial-advice-system-backend.onrender.com";


const fetchWithAuth = async (endpoint: string, options: RequestInit = {}, ) => {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    // ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `Request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};


export class API{

  async getBudgetAdvice (message: string): Promise<FinancialAdvice> {
    const response = await fetchWithAuth('/advice', {
      method: 'POST',
      body: JSON.stringify({ message })
    })
    
    return {
      id: `advice-${Date.now()}`,
      createdAt: new Date().toISOString(),
      originalPrompt: message,
      advice: response["Financial Advice"],
      budgetSummary: response["Budget Summary"]
    };
  }

  async getBudgetSpreadsheetData (message: string): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/download-budget`,
        {
          method: 'POST',
          body: JSON.stringify({ message }),
          headers: {'Content-Type': 'application/json'}
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `Request failed with status ${response.status}`);
      }
      return await response.blob();
      // return window.URL.createObjectURL(blob);
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
  
  async getSpreadsheetData (adviceId: string): Promise<BudgetData> {
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
  }
  
  // For authenticated users
  async getUserBudgets (): Promise<{ id: string, date: string, description: string }[]> {
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
  }
  
  // Auth related mock endpoints
  async login (email: string, password: string): Promise<{ user: { id: string, name: string, email: string } }> {
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
  }
  
  async register (name: string, email: string, password: string): Promise<{ user: { id: string, name: string, email: string } }> {
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
}
