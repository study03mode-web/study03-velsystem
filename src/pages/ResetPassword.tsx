import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useResetPassword } from '../hooks/usePasswordReset';
import { usePasswordReset } from '../contexts/PasswordResetContext';
import { validatePassword } from '../utils/passwordValidation';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import { Eye, EyeOff, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { email, otpVerified } = usePasswordReset();
  const resetPassword = useResetPassword();

  // Redirect if OTP not verified
  if (!otpVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  const passwordValidation = validatePassword(password);
  const passwordsMatch = password === confirmPassword;
  const canSubmit = passwordValidation.isValid && passwordsMatch && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      resetPassword.mutate({ email, newPassword: password });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:py-12 px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-xl sm:text-2xl font-extrabold text-indigo-600">Expense
                <span className="text-lg sm:text-xl font-bold text-gray-900">Trace</span>
              </span>
            </Link>
          </div>
        </div>
        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
          Enter a new password for <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-10 shadow sm:rounded-lg">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              <PasswordStrengthIndicator password={password} />
              
              {/* Password Requirements */}
              {password && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Password requirements:</p>
                  <div className="space-y-1">
                    {[
                      { test: password.length >= 8, text: 'At least 8 characters' },
                      { test: /[A-Z]/.test(password), text: 'One uppercase letter' },
                      { test: /[a-z]/.test(password), text: 'One lowercase letter' },
                      { test: /\d/.test(password), text: 'One number' },
                      { test: /[!@#$%^&*()_+\-=\[\]{}|;':",.<>?]/.test(password), text: 'One special character' },
                      { test: !/\s/.test(password), text: 'No spaces' }
                    ].map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {requirement.test ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                        <span className={`text-sm ${requirement.test ? 'text-green-600' : 'text-gray-500'}`}>
                          {requirement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Validation Errors */}
            {password && !passwordValidation.isValid && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
                <div className="text-sm text-red-600">
                  <ul className="list-disc list-inside space-y-1">
                    {passwordValidation.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={!canSubmit || resetPassword.isPending}
                className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetPassword.isPending ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/verify-otp"
                className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to verification
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;