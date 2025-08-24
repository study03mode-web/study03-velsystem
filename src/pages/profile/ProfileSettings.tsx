import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Save, Edit2, Mail, Phone, User, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { 
  useAccountInfo, 
  useUpdatePersonalInfo, 
  useRequestEmailOTP, 
  useVerifyEmailOTP, 
  useRequestPhoneOTP, 
  useVerifyPhoneOTP,
  UpdatePersonalInfoRequest, 
  EmailUpdateRequest, 
  PhoneUpdateRequest 
} from '../../hooks/useAccount';

const personalInfoSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Please select a valid gender'),
});

const emailSchema = yup.object({
  newEmail: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

const phoneSchema = yup.object({
  newPhoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
});

const otpSchema = yup.object({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits'),
});

type EditMode = 'none' | 'personal' | 'email' | 'phone';
type OTPStep = 'request' | 'verify';

const ProfileSettings = React.memo(() => {
  const [editMode, setEditMode] = useState<EditMode>('none');
  const [otpStep, setOtpStep] = useState<OTPStep>('request');
  const [otpRequestId, setOtpRequestId] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingPhone, setPendingPhone] = useState('');

  // Fetch account information
  const { data: accountData, isLoading: accountLoading } = useAccountInfo();
  
  // Mutations
  const updatePersonalInfoMutation = useUpdatePersonalInfo();
  const requestEmailOTPMutation = useRequestEmailOTP();
  const verifyEmailOTPMutation = useVerifyEmailOTP();
  const requestPhoneOTPMutation = useRequestPhoneOTP();
  const verifyPhoneOTPMutation = useVerifyPhoneOTP();

  const accountInfo = accountData?.data;

  // Personal Info Form
  const personalInfoForm = useForm<UpdatePersonalInfoRequest>({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
    },
  });

  // Email Form
  const emailForm = useForm<EmailUpdateRequest>({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      newEmail: '',
    },
  });

  // Phone Form
  const phoneForm = useForm<PhoneUpdateRequest>({
    resolver: yupResolver(phoneSchema),
    defaultValues: {
      newPhoneNumber: '',
    },
  });

  // OTP Form
  const otpForm = useForm<{ otp: string }>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Update forms when account data loads
  useEffect(() => {
    if (accountInfo) {
      personalInfoForm.reset({
        firstName: accountInfo.firstName || '',
        lastName: accountInfo.lastName || '',
        gender: accountInfo.gender || '',
      });
      emailForm.reset({
        newEmail: accountInfo.email || '',
      });
      phoneForm.reset({
        newPhoneNumber: accountInfo.phoneNumber || '',
      });
    }
  }, [accountInfo, personalInfoForm, emailForm, phoneForm]);

  // Update personal info mutation

  // Handlers
  const handlePersonalInfoSubmit = (data: UpdatePersonalInfoRequest) => {
    updatePersonalInfoMutation.mutate(data, {
      onSuccess: () => {
        setEditMode('none');
        toast.success('Personal information updated successfully!');
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to update personal information');
      },
    });
  };

  const handleEmailSubmit = (data: EmailUpdateRequest) => {
    setPendingEmail(data.newEmail);
    requestEmailOTPMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.data?.otpIdentifierInfo?.[0]?.requestId) {
          setOtpRequestId(response.data.otpIdentifierInfo[0].requestId);
          setOtpStep('verify');
          toast.success('OTP sent to your new email address');
        }
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to send OTP');
      },
    });
  };

  const handlePhoneSubmit = (data: PhoneUpdateRequest) => {
    setPendingPhone(data.newPhoneNumber);
    requestPhoneOTPMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.data?.otpIdentifierInfo?.[0]?.requestId) {
          setOtpRequestId(response.data.otpIdentifierInfo[0].requestId);
          setOtpStep('verify');
          toast.success('OTP sent to your new phone number');
        }
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to send OTP');
      },
    });
  };

  const handleEmailOTPSubmit = (data: { otp: string }) => {
    verifyEmailOTPMutation.mutate({
      identifier: pendingEmail,
      otp: data.otp,
      requestId: otpRequestId,
    }, {
      onSuccess: () => {
        setEditMode('none');
        setOtpStep('request');
        setPendingEmail('');
        setOtpRequestId('');
        otpForm.reset();
        toast.success('Email updated successfully!');
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to verify OTP');
      },
    });
  };

  const handlePhoneOTPSubmit = (data: { otp: string }) => {
    verifyPhoneOTPMutation.mutate({
      identifier: pendingPhone,
      otp: data.otp,
      requestId: otpRequestId,
    }, {
      onSuccess: () => {
        setEditMode('none');
        setOtpStep('request');
        setPendingPhone('');
        setOtpRequestId('');
        otpForm.reset();
        toast.success('Phone number updated successfully!');
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to verify OTP');
      },
    });
  };

  const handleCancel = () => {
    setEditMode('none');
    setOtpStep('request');
    setPendingEmail('');
    setPendingPhone('');
    setOtpRequestId('');
    personalInfoForm.reset();
    emailForm.reset();
    phoneForm.reset();
    otpForm.reset();
  };

  const handleBackToRequest = () => {
    setOtpStep('request');
    otpForm.reset();
  };

  if (accountLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <p className="text-sm text-gray-600">Manage your personal details</p>
              </div>
            </div>
            {editMode !== 'personal' && (
              <button
                onClick={() => setEditMode('personal')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {editMode === 'personal' ? (
            <form onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    {...personalInfoForm.register('firstName')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                  />
                  {personalInfoForm.formState.errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalInfoForm.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    {...personalInfoForm.register('lastName')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your last name"
                  />
                  {personalInfoForm.formState.errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalInfoForm.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  {...personalInfoForm.register('gender')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                {personalInfoForm.formState.errors.gender && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalInfoForm.formState.errors.gender.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={updatePersonalInfoMutation.isPending}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
                >
                  <Save size={16} />
                  <span>{updatePersonalInfoMutation.isPending ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                  <p className="text-lg text-gray-400">{accountInfo?.firstName || 'Not provided'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                  <p className="text-lg text-gray-400">{accountInfo?.lastName || 'Not provided'}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                <p className="text-lg text-gray-400">
                  {accountInfo?.gender ? accountInfo.gender.charAt(0) + accountInfo.gender.slice(1).toLowerCase() : 'Not provided'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email Management */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Email Address</h2>
                <p className="text-sm text-gray-600">Update your email address</p>
              </div>
            </div>
            {editMode !== 'email' && (
              <button
                onClick={() => setEditMode('email')}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
              >
                <Edit2 size={16} />
                <span>Change</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {editMode === 'email' ? (
            <div className="space-y-6">
              {otpStep === 'request' ? (
                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Email
                    </label>
                    <p className="text-lg text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                      {accountInfo?.email}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Email Address *
                    </label>
                    <input
                      {...emailForm.register('newEmail')}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter new email address"
                    />
                    {emailForm.formState.errors.newEmail && (
                      <p className="mt-1 text-sm text-red-600">
                        {emailForm.formState.errors.newEmail.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={requestEmailOTPMutation.isPending}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
                    >
                      {requestEmailOTPMutation.isPending ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={otpForm.handleSubmit(handleEmailOTPSubmit)} className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      We've sent a verification code to <strong>{pendingEmail}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code *
                    </label>
                    <input
                      {...otpForm.register('otp')}
                      type="text"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-lg tracking-widest"
                      placeholder="Enter 6-digit code"
                    />
                    {otpForm.formState.errors.otp && (
                      <p className="mt-1 text-sm text-red-600">
                        {otpForm.formState.errors.otp.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleBackToRequest}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors"
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={verifyEmailOTPMutation.isPending}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
                    >
                      {verifyEmailOTPMutation.isPending ? 'Verifying...' : 'Verify & Update'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-400" />
                <p className="text-lg text-gray-900">{accountInfo?.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phone Management */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Phone Number</h2>
                <p className="text-sm text-gray-600">Update your phone number</p>
              </div>
            </div>
            {editMode !== 'phone' && (
              <button
                onClick={() => setEditMode('phone')}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
              >
                <Edit2 size={16} />
                <span>{accountInfo?.phoneNumber ? 'Change' : 'Add'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {editMode === 'phone' ? (
            <div className="space-y-6">
              {otpStep === 'request' ? (
                <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4">
                  {accountInfo?.phoneNumber && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Phone Number
                      </label>
                      <p className="text-lg text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                        {accountInfo.phoneNumber}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {accountInfo?.phoneNumber ? 'New Phone Number' : 'Phone Number'} *
                    </label>
                    <input
                      {...phoneForm.register('newPhoneNumber')}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter phone number"
                    />
                    {phoneForm.formState.errors.newPhoneNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {phoneForm.formState.errors.newPhoneNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={requestPhoneOTPMutation.isPending}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
                    >
                      {requestPhoneOTPMutation.isPending ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={otpForm.handleSubmit(handlePhoneOTPSubmit)} className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-800">
                      We've sent a verification code to <strong>{pendingPhone}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code *
                    </label>
                    <input
                      {...otpForm.register('otp')}
                      type="text"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-lg tracking-widest"
                      placeholder="Enter 6-digit code"
                    />
                    {otpForm.formState.errors.otp && (
                      <p className="mt-1 text-sm text-red-600">
                        {otpForm.formState.errors.otp.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleBackToRequest}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors"
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={verifyPhoneOTPMutation.isPending}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
                    >
                      {verifyPhoneOTPMutation.isPending ? 'Verifying...' : 'Verify & Update'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-400" />
                <p className="text-lg text-gray-900">
                  {accountInfo?.phoneNumber || (
                    <span className="text-gray-400 italic">Not provided</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ProfileSettings.displayName = 'ProfileSettings';

export default ProfileSettings;