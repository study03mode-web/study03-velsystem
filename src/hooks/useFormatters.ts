import { useSettings } from './useSettings';
import { 
  formatCurrency as formatCurrencyUtil,
  formatTime as formatTimeUtil,
  formatDateTime as formatDateTimeUtil,
  formatCompactNumber as formatCompactNumberUtil,
  formatPercentage,
  getCurrencySymbol
} from '../utils/formatters';

// Custom hook to provide formatters with user settings
export const useFormatters = () => {
  const { data: settings } = useSettings();

  const formatCurrency = (amount: number): string => {
    return formatCurrencyUtil(amount, settings);
  };

  const formatTime = (hour: number, minute: number): string => {
    return formatTimeUtil(hour, minute, settings);
  };

  const formatDateTime = (
    date: string, 
    time?: { hour: number; minute: number; second: number; nano: number }
  ) => {
    return formatDateTimeUtil(date, time, settings);
  };

  const formatCompactNumber = (amount: number): string => {
    return formatCompactNumberUtil(amount, settings);
  };

  const getCurrency = () => {
    return {
      code: settings?.currencyCode || 'USD',
      symbol: getCurrencySymbol(settings?.currencyCode || 'USD')
    };
  };

  return {
    formatCurrency,
    formatTime,
    formatDateTime,
    formatCompactNumber,
    formatPercentage,
    getCurrency,
    settings
  };
};