import { createContext, useContext, ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';

interface ToastContextType {
  addToast: (options: {
    type: 'success' | 'error' | 'warning' | 'info';
    message?: string;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const addToast = ({ type, message, duration = 5000, action }: {
    type: 'success' | 'error' | 'warning' | 'info';
    message?: string;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }) => {
    const content = (
      <div>
        {message && <div className="font-semibold">{message}</div>}
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-medium mt-2 underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>
    );

    const options: ToastOptions = {
      autoClose: duration > 0 ? duration : false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (type) {
      case 'success':
        toast.success(content, options);
        break;
      case 'error':
        toast.error(content, options);
        break;
      case 'warning':
        toast.warning(content, options);
        break;
      case 'info':
        toast.info(content, options);
        break;
      default:
        toast(content, options);
    }
  };

  const removeToast = (id: string) => {
    toast.dismiss(id);
  };

  const clearToasts = () => {
    toast.dismiss();
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, clearToasts }}>
      {children}
    </ToastContext.Provider>
  );
};