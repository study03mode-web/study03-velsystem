export interface Budget {
  id: string;
  type: 'monthly' | 'yearly';
  year: number;
  month?: number;
  totalLimit: number;
  totalSpent: number;
  status: 'active' | 'upcoming' | 'past';
  categories: BudgetCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface BudgetCategory {
  categoryId: string;
  name: string;
  color: string;
  icon: string;
  limit: number;
  spent: number;
}

export interface CreateMonthlyBudgetData {
  year: number;
  month: number;
  totalLimit: number;
  categoryLimits: CategoryLimit[];
}

export interface CreateYearlyBudgetData {
  year: number;
  totalLimit: number;
  categoryLimits: CategoryLimit[];
}

export interface CategoryLimit {
  categoryId: string;
  categoryLimit: number;
}

export interface UpdateMonthlyBudgetData {
  year?: number;
  month?: number;
  totalLimit?: number;
  categoryLimits?: CategoryLimit[];
}

export interface UpdateYearlyBudgetData {
  year?: number;
  totalLimit?: number;
  categoryLimits?: CategoryLimit[];
}

export interface BudgetSummary {
  monthly: {
    present: Budget;
    upcoming: Budget[];
    past: Budget[];
  };
  yearly: {
    present: Budget;
    upcoming: Budget[];
    past: Budget[];
  };
}

export interface BudgetAnalysis {
  budgetId: string;
  type: 'monthly' | 'yearly';
  year: number;
  month?: number;
  totalLimit: number;
  totalSpent: number;
  categories: BudgetCategory[];
}

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const;

export type MonthName = typeof MONTHS[number];