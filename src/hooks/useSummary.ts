import { useQuery } from '@tanstack/react-query';
import apiClient from '../lib/axios';
import { DaySummaryResponse, MonthSummaryResponse } from '../types/views';

// Get month summary
export const useMonthSummary = (month: number, year: number) => {
  return useQuery<MonthSummaryResponse>({
    queryKey: ['monthly-summary', month, year],
    queryFn: async () => {
      const response = await apiClient.get(`/summary/monthly?month=${month}&year=${year}`);
      return response.data;
    },
    enabled: !!month && !!year,
  });
};

// Get day summary
export const useDaySummary = (day: number, month: number, year: number) => {
  return useQuery<DaySummaryResponse>({
    queryKey: ['day-summary', day, month, year],
    queryFn: async () => {
      const response = await apiClient.get(`/summary/day?day=${day}&month=${month}&year=${year}`);
      return response.data;
    },
    enabled: !!day && !!month && !!year,
  });
};