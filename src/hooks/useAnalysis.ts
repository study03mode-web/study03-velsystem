import { useQuery } from '@tanstack/react-query';
import apiClient from '../lib/axios';

export interface CategoryBreakdown {
  category: {
    id: string;
    name: string;
    type: number;
    color: string;
    icon: string;
  };
  amount: number;
}

export interface AccountBreakdown {
  accountResponseDto: {
    id: string;
    name: string;
    type: number;
    default: boolean;
  };
  amount: number;
}

export interface AnalysisSummary {
  spending: number;
  income: number;
  spendingCategory: CategoryBreakdown[];
  incomeCategory: CategoryBreakdown[];
  incomeAccount: AccountBreakdown[];
  spendingAccount: AccountBreakdown[];
  transfersAccount: AccountBreakdown[];
  numberOfTransactions: number;
  averageSpendingPerDay: number;
  averageSpendingPerTransaction: number;
  averageIncomePerDay: number;
  averageIncomePerTransaction: number;
}

export interface AnalysisParams {
  type: 1 | 2 | 3 | 4 | 'all'; // 1=WEEK, 2=MONTH, 3=YEAR, 4=CUSTOM, all=ALL_TIME
  date?: number;
  month?: number;
  year?: number;
  from?: string; // Format: "dd-mm-yyyy"
  to?: string;   // Format: "dd-mm-yyyy"
}

export const useAnalysisSummary = (params: AnalysisParams) => {
  return useQuery<AnalysisSummary>({
    queryKey: ['analysis-summary', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      
      searchParams.append('type', params.type.toString());
      
      if (params.date !== undefined) searchParams.append('date', params.date.toString());
      if (params.month !== undefined) searchParams.append('month', params.month.toString());
      if (params.year !== undefined) searchParams.append('year', params.year.toString());
      
      if (params.from) searchParams.append('from', params.from);
      if (params.to) searchParams.append('to', params.to);

      const response = await apiClient.get(`/summary/analysis?${searchParams.toString()}`);
      return response.data.data;
    },
  });
};