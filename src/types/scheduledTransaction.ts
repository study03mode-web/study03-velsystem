export interface ScheduledTransaction {
  id: string;
  startDate: string;
  time: string;
  amount: number;
  description: string;
  type: 'EXPENSE' | 'INCOME' | 'TRANSFER';
  frequencyType: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  frequencyInterval: number;
  endType: 'NONE' | 'DATE' | 'OCCURRENCE';
  occurrence: number;
  remainderDays: number | null;
  status: 'UPCOMING' | 'COMPLETED' | 'PAUSED';
  tags?: {
    id: string;
    name: string;
  }[];
  category?: {
    id: string;
    name: string;
    type: string;
    color: string;
    icon: string;
    deletable: boolean;
  };
  account?: {
    id: string;
    name: string;
    type: string;
    default: boolean;
  };
  paymentMode?: {
    id: string;
    name: string;
    type: string;
  } | null;
  fromAccount?: {
    id: string;
    name: string;
    type: string;
    default: boolean;
  };
  fromPaymentMode?: {
    id: string;
    name: string;
    type: string;
  } | null;
  toAccount?: {
    id: string;
    name: string;
    type: string;
    default: boolean;
  };
  toPaymentMode?: {
    id: string;
    name: string;
    type: string;
  } | null;
}

export interface CreateScheduledTransactionData {
  startDate: string;
  startTime: string;
  amount: number;
  description: string;
  frequencyType: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  frequencyInterval: number;
  endType: 'NONE' | 'DATE' | 'OCCURRENCE';
  occurrence: number;
  remainderDays: number;
  tags: string[];
  categoryId?: string;
  accountId?: string;
  paymentModeId?: string;
  fromAccountId?: string;
  toAccountId?: string;
  fromPaymentModeId?: string;
  toPaymentModeId?: string;
}

export interface UpdateScheduledTransactionData {
  startDate?: string;
  startTime?: string;
  amount?: number;
  description?: string;
  frequencyType?: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  frequencyInterval?: number;
  endType?: 'NONE' | 'DATE' | 'OCCURRENCE';
  occurrence?: number;
  remainderDays?: number;
  tags?: string[];
  categoryId?: string;
  accountId?: string;
  paymentModeId?: string;
  fromAccountId?: string;
  toAccountId?: string;
  fromPaymentModeId?: string;
  toPaymentModeId?: string;
}

export interface PaginatedScheduledTransactions {
  content: ScheduledTransaction[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const FREQUENCY_OPTIONS = {
  'NONE': 'Does not repeat',
  'DAILY': 'Every day',
  'WEEKLY': 'Every week',
  'MONTHLY': 'Every month',
  'YEARLY': 'Every year'
} as const;

export const END_TYPE_OPTIONS = {
  'NONE': 'Never ends',
  'DATE': 'Ends on date',
  'OCCURRENCE': 'Ends after occurrences'
} as const;

export const EARLY_REMINDER_OPTIONS = [
  { value: 0, label: 'None' },
  { value: 1, label: '1 day before' },
  { value: 2, label: '2 days before' },
  { value: 3, label: '3 days before' },
  { value: 4, label: '4 days before' },
  { value: 5, label: '5 days before' },
  { value: 6, label: '6 days before' },
  { value: 7, label: '7 days before' },
  { value: 8, label: '8 days before' },
  { value: 9, label: '9 days before' },
  { value: 10, label: '10 days before' },
  { value: 11, label: '11 days before' },
  { value: 12, label: '12 days before' },
  { value: 13, label: '13 days before' },
  { value: 14, label: '14 days before' }
] as const;

export const SCHEDULED_TRANSACTION_TYPES = {
  'EXPENSE': 'Expense',
  'INCOME': 'Income',
  'TRANSFER': 'Transfer'
} as const;

export type ScheduledTransactionType = keyof typeof SCHEDULED_TRANSACTION_TYPES;
export type FrequencyType = keyof typeof FREQUENCY_OPTIONS;
export type EndType = keyof typeof END_TYPE_OPTIONS;