export interface Account {
  id: string;
  name: string;
  type: 1 | 2 | 3 | 4;
  currentBalance?: number;
  currentAvailableLimit?: number;
  totalCreditLimit?: number;
  billingCycleStartDate?: string;
  paymentDueDate?: string;
  linkedPaymentModes?: PaymentMode[];
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMode {
  id: string;
  name: string;
  type: 1 | 2 | 3 | 4; // 1=UPI, 2=Debit Card, 3=Cheque, 4=Internet Banking
  accountId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBankAccountData {
  name: string;
  currentBalance: number;
  linkedPaymentModes?: {
    name: string;
    type: 1 | 2 | 3 | 4;
  }[];
}

export interface CreateWalletData {
  name: string;
  currentBalance: number;
}

export interface CreateCreditCardData {
  name: string;
  currentAvailableLimit: number;
  totalCreditLimit: number;
  billingCycleStartDate: string;
  paymentDueDate: string;
}

export interface UpdateBankAccountData {
  name?: string;
  currentBalance?: number;
  linkedPaymentModes?: {
    name: string;
    type: 1 | 2 | 3 | 4;
  }[];
}

export interface UpdateWalletData {
  name?: string;
  currentBalance?: number;
}

export interface UpdateCreditCardData {
  name?: string;
  currentAvailableLimit?: number;
  totalCreditLimit?: number;
  billingCycleStartDate?: string;
  paymentDueDate?: string;
}

export interface CreatePaymentModeData {
  name: string;
  type: 1 | 2 | 3 | 4;
}

export interface UpdatePaymentModeData {
  name?: string;
  type?: 1 | 2 | 3 | 4;
}

export interface AccountSummary {
  availableAmount: number;
  availableCredit: number;
  outstandingCredit: number;
}

export interface DefaultPaymentMode {
  id: string;
  name: string;
  type: string;
  accountId: string;
}

export const PAYMENT_MODE_TYPES = {
  '1': 'UPI',
  '2': 'Debit Card',
  '3': 'Cheque',
  '4': 'Internet Banking'
} as const;

export type PaymentModeType = keyof typeof PAYMENT_MODE_TYPES;