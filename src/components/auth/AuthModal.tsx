import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'choice' | 'email' | 'otp';

const emailSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

const otpSchema = yup.object({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits')
    .matches(/^\d{6}$/, 'OTP must contain only numbers'),
});

const AuthModal = React.memo(({ isOpen, onClose }: AuthModalProps) => {
  const { generateOTP, login } = useAuth();
  const [step, setStep] = useState<AuthStep>('choice');
  const [email, setEmail] = useState('');
  const [requestId, setRequestId] = useState('');

  const emailForm = useForm<{ email: string }>({
    resolver: yupResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const otpForm = useForm<{ otp: string }>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  // Generate OTP mutation
  const generateOTPMutation = useMutation({
    mutationFn: generateOTP,
    onSuccess: (id) => {
      setRequestId(id);
      setStep('otp');
      toast.success('OTP sent successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send OTP');
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, otp, requestId }: { email: string; otp: string; requestId: string }) =>
      login(email, otp, requestId),
    onSuccess: () => {
      handleClose();
      toast.success('Welcome back!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Authentication failed');
    },
  });

  const resetForm = () => {
    setStep('choice');
    setEmail('');
    setRequestId('');
    emailForm.reset();
    otpForm.reset();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleEmailSubmit = (data: { email: string }) => {
    setEmail(data.email);
    generateOTPMutation.mutate(data.email);
  };

  const handleOTPSubmit = (data: { otp: string }) => {
    loginMutation.mutate({
      email,
      otp: data.otp,
      requestId,
    });
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('email');
      otpForm.reset();
    } else if (step === 'email') {
      setStep('choice');
      emailForm.reset();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            {step !== 'choice' && (
              <button
                onClick={handleBack}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {step === 'choice' ? 'Welcome' : step === 'email' ? 'Enter Email' : 'Verify OTP'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'choice' && (
            <div className="space-y-4">
              <p className="text-gray-600 text-center mb-6">
                Sign in or create an account to continue
              </p>
              <button
                onClick={() => setStep('email')}
                className="w-full flex items-center justify-center space-x-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail size={20} />
                <span className="font-medium">Continue with Email</span>
              </button>
              <p className="text-xs text-gray-500 text-center">
                We'll send you a verification code to sign in or create your account
              </p>
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
              <div>
                <p className="text-gray-600 mb-4 text-center">
                  Enter your email address to continue
                </p>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  {...emailForm.register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
                {emailForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={generateOTPMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {generateOTPMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Sending OTP...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-4">
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800 text-center">
                    We've sent a verification code to<br />
                    <strong>{email}</strong>
                  </p>
                </div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code *
                </label>
                <input
                  {...otpForm.register('otp')}
                  type="text"
                  id="otp"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest transition-colors"
                  placeholder="Enter 6-digit code"
                />
                {otpForm.formState.errors.otp && (
                  <p className="mt-1 text-sm text-red-600">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </button>
              <button
                type="button"
                onClick={() => generateOTPMutation.mutate(email)}
                disabled={generateOTPMutation.isPending}
                className="w-full text-blue-600 hover:text-blue-700 font-medium py-2 transition-colors disabled:opacity-50"
              >
                {generateOTPMutation.isPending ? 'Sending...' : 'Resend Code'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
});

AuthModal.displayName = 'AuthModal';

export default AuthModal;