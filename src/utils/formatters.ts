import { UserSettings, CURRENCIES } from '../types/settings';

// Default settings fallback
const DEFAULT_SETTINGS: UserSettings = {
  timeFormat: 1,
  decimalFormat: 1,
  currencyCode: 'USD',
  numberFormat: 1,
  dailyReminder: false,
};

// Get currency symbol from currency code
export const getCurrencySymbol = (currencyCode: string): string => {
  const currency = CURRENCIES.find(c => c.code === currencyCode);
  return currency?.symbol || '$';
};

// Format currency based on user settings
export const formatCurrency = (
  amount: number, 
  settings?: UserSettings | null
): string => {
  const userSettings = settings || DEFAULT_SETTINGS;
  const symbol = getCurrencySymbol(userSettings.currencyCode);
  
  // Apply decimal format
  let formattedAmount: string;
  switch (userSettings.decimalFormat) {
    case 2: // No decimal places
      formattedAmount = Math.round(amount).toString();
      break;
    case 3: // 1 decimal place
      formattedAmount = amount.toFixed(1);
      break;
    case 4: // 2 decimal places
      formattedAmount = amount.toFixed(2);
      break;
    default: // Default (optimized for readability)
      formattedAmount = amount % 1 === 0 ? amount.toString() : amount.toFixed(2);
      break;
  }

  // Apply number format
  const numericAmount = parseFloat(formattedAmount);
  switch (userSettings.numberFormat) {
    case 2: // Lakhs format (10,00,000)
      if (numericAmount >= 100000) {
        const lakhs = numericAmount / 100000;
        const formatted = lakhs.toLocaleString('en-IN', {
          minimumFractionDigits: userSettings.decimalFormat === 2 ? 0 : 
                                 userSettings.decimalFormat === 3 ? 1 : 
                                 userSettings.decimalFormat === 4 ? 2 : 
                                 (lakhs % 1 === 0 ? 0 : 2),
          maximumFractionDigits: userSettings.decimalFormat === 2 ? 0 : 
                                 userSettings.decimalFormat === 3 ? 1 : 
                                 userSettings.decimalFormat === 4 ? 2 : 2,
        });
        return `${symbol}${formatted}`;
      }
      // Fall through for smaller amounts
      formattedAmount = numericAmount.toLocaleString('en-IN');
      break;
    case 3: // Millions compact (1000000)
      formattedAmount = numericAmount.toString();
      break;
    default: // Millions format (1,000,000)
      formattedAmount = numericAmount.toLocaleString('en-US');
      break;
  }

  return `${symbol}${formattedAmount}`;
};

// Format time based on user settings
export const formatTime = (
  hour: number, 
  minute: number, 
  settings?: UserSettings | null
): string => {
  const userSettings = settings || DEFAULT_SETTINGS;
  
  if (userSettings.timeFormat === 2) {
    // 24-hour format
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  } else {
    // 12-hour format
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  }
};

// Format date and time together
export const formatDateTime = (
  date: string, 
  time?: { hour: number; minute: number; second: number; nano: number },
  settings?: UserSettings | null
): { date: string; time: string } => {
  const formattedDate = new Date(date).toLocaleDateString();
  const formattedTime = time 
    ? formatTime(time.hour, time.minute, settings)
    : formatTime(new Date().getHours(), new Date().getMinutes(), settings);
  
  return {
    date: formattedDate,
    time: formattedTime
  };
};

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// Format large numbers with abbreviations (K, M, B)
export const formatCompactNumber = (
  amount: number,
  settings?: UserSettings | null
): string => {
  const userSettings = settings || DEFAULT_SETTINGS;
  const symbol = getCurrencySymbol(userSettings.currencyCode);
  
  if (amount >= 1000000000) {
    return `${symbol}${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}K`;
  }
  
  return formatCurrency(amount, settings);
};