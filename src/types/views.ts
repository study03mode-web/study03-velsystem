export interface MonthSummaryItem {
  expense: number;
  income: number;
  day: number;
}

export interface MonthSummaryResponse {
  message: string;
  data: MonthSummaryItem[];
}

export interface DayTransaction {
  id: string;
  type: number | null;
  date: number;
  month: number;
  year: number;
  amount: number;
  categoryId: string | null;
  accountId: string | null;
  description: string | null;
  tagIds: string[] | null;
}

export interface DaySummary {
  spending: number;
  income: number;
  transactions: DayTransaction[];
}

export interface DaySummaryResponse {
  message: string;
  data: DaySummary;
}