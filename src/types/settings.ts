export interface UserSettings {
  timeFormat: number;
  decimalFormat: number;
  currencyCode: string;
  numberFormat: number;
  dailyReminder: boolean;
}

export interface UpdateTimeFormatData {
  formatCode: number;
}

export interface UpdateNumberFormatData {
  formatCode: number;
}

export interface UpdateDecimalFormatData {
  formatCode: number;
}

export interface UpdateCurrencyCodeData {
  currencyCode: string;
}

export interface UpdateDailyReminderData {
  dailyReminder: boolean;
}

export const TIME_FORMATS = {
  1: '12-hour format',
  2: '24-hour format'
} as const;

export const DECIMAL_FORMATS = {
  1: 'Default (optimized for readability)',
  2: 'No decimal places (example: 100)',
  3: '1 decimal place (example: 100.0)',
  4: '2 decimal places (example: 100.00)'
} as const;

export const NUMBER_FORMATS = {
  1: 'Millions format (1,000,000)',
  2: 'Lakhs format (10,00,000)',
  3: 'Millions compact (1000000)'
} as const;

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  country: string;
  flag: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India', flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China', flag: '🇨🇳' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore', flag: '🇸🇬' },
];

export type TimeFormat = keyof typeof TIME_FORMATS;
export type DecimalFormat = keyof typeof DECIMAL_FORMATS;
export type NumberFormat = keyof typeof NUMBER_FORMATS;