import { createContext, useContext, useState, ReactNode } from 'react';

interface PasswordResetContextType {
  email: string;
  otpVerified: boolean;
  setEmail: (email: string) => void;
  setOtpVerified: (verified: boolean) => void;
  clearState: () => void;
}

const PasswordResetContext = createContext<PasswordResetContextType | undefined>(undefined);

export const usePasswordReset = () => {
  const context = useContext(PasswordResetContext);
  if (!context) {
    throw new Error('usePasswordReset must be used within a PasswordResetProvider');
  }
  return context;
};

interface PasswordResetProviderProps {
  children: ReactNode;
}

export const PasswordResetProvider = ({ children }: PasswordResetProviderProps) => {
  const [email, setEmail] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const clearState = () => {
    setEmail('');
    setOtpVerified(false);
  };

  return (
    <PasswordResetContext.Provider value={{
      email,
      otpVerified,
      setEmail,
      setOtpVerified,
      clearState
    }}>
      {children}
    </PasswordResetContext.Provider>
  );
};