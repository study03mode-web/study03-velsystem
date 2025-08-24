export interface User {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  role: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user?: User;
    requestId?: string;
    token?: string;
    message?: string;
    data?: any;
  };
}

export interface OTPRequest {
  email: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
  requestId: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, otp: string, requestId: string) => Promise<void>;
  signup: (email: string, otp: string, requestId: string) => Promise<void>;
  logout: () => Promise<void>;
  generateOTP: (email: string) => Promise<string>;
  checkAuth: () => Promise<void>;
}

export interface LoginFormData {
  identifier: string;
}

export interface OTPFormData {
  otp: string;
}