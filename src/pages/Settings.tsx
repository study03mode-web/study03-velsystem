import { useState } from 'react';
import { Edit, Clock, Globe, Bell, AlertTriangle, Trash2 } from 'lucide-react';
import {
  useSettings,
  useUpdateTimeFormat,
  useUpdateDecimalFormat,
  useUpdateNumberFormat,
  useUpdateCurrencyCode,
  useUpdateDailyReminder,
  useClearAllData,
  useDeleteAccount,
} from '../hooks/useSettings';
import {
  TIME_FORMATS,
  DECIMAL_FORMATS,
  NUMBER_FORMATS,
  CURRENCIES,
  Currency,
} from '../types/settings';
import TimeFormatModal from '../components/TimeFormatModal';
import DecimalFormatModal from '../components/DecimalFormatModal';
import NumberFormatModal from '../components/NumberFormatModal';
import CurrencyModal from '../components/CurrencyModal';
import ConfirmationModal from '../components/ConfirmationModal';

function Settings() {
  const [isTimeFormatModalOpen, setIsTimeFormatModalOpen] = useState(false);
  const [isDecimalFormatModalOpen, setIsDecimalFormatModalOpen] = useState(false);
  const [isNumberFormatModalOpen, setIsNumberFormatModalOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isClearDataModalOpen, setIsClearDataModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  const { data: settings, isLoading } = useSettings();
  const updateTimeFormat = useUpdateTimeFormat();
  const updateDecimalFormat = useUpdateDecimalFormat();
  const updateNumberFormat = useUpdateNumberFormat();
  const updateCurrencyCode = useUpdateCurrencyCode();
  const updateDailyReminder = useUpdateDailyReminder();
  const clearAllData = useClearAllData();
  const deleteAccount = useDeleteAccount();

  const handleDailyReminderToggle = async () => {
    if (settings) {
      await updateDailyReminder.mutateAsync(!settings.dailyReminder);
    }
  };

  const handleClearData = async () => {
    await clearAllData.mutateAsync();
    setIsClearDataModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    await deleteAccount.mutateAsync();
    setIsDeleteAccountModalOpen(false);
  };

  const getCurrentCurrency = (): Currency | undefined =>
    CURRENCIES.find((currency) => currency.code === settings?.currencyCode);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto text-center text-gray-500">
        Failed to load settings
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account preferences and settings</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <Clock className="w-5 h-5 text-indigo-600" />
            Appearance
          </h2>

          {/* Time Format */}
          <div className="flex justify-between items-center p-3 rounded-lg border hover:shadow-sm transition">
            <div>
              <h3 className="font-medium text-gray-900">Time Format</h3>
              <p className="text-sm text-gray-500">
                {TIME_FORMATS[settings.timeFormat as keyof typeof TIME_FORMATS]}
              </p>
            </div>
            <button
              onClick={() => setIsTimeFormatModalOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>

          {/* Decimal Format */}
          <div className="flex justify-between items-center p-3 rounded-lg border hover:shadow-sm transition">
            <div>
              <h3 className="font-medium text-gray-900">Decimal Format</h3>
              <p className="text-sm text-gray-500">
                {DECIMAL_FORMATS[settings.decimalFormat as keyof typeof DECIMAL_FORMATS]}
              </p>
            </div>
            <button
              onClick={() => setIsDecimalFormatModalOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <Globe className="w-5 h-5 text-indigo-600" />
            Preferences
          </h2>

          {/* Currency */}
          <div className="flex justify-between items-center p-3 rounded-lg border hover:shadow-sm transition">
            <div>
              <h3 className="font-medium text-gray-900">Currency</h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                {getCurrentCurrency()?.flag} {getCurrentCurrency()?.country} -{' '}
                {getCurrentCurrency()?.name} ({getCurrentCurrency()?.symbol})
              </p>
            </div>
            <button
              onClick={() => setIsCurrencyModalOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>

          {/* Number Format */}
          <div className="flex justify-between items-center p-3 rounded-lg border hover:shadow-sm transition">
            <div>
              <h3 className="font-medium text-gray-900">Number Format</h3>
              <p className="text-sm text-gray-500">
                {NUMBER_FORMATS[settings.numberFormat as keyof typeof NUMBER_FORMATS]}
              </p>
            </div>
            <button
              onClick={() => setIsNumberFormatModalOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 mb-4">
            <Bell className="w-5 h-5 text-indigo-600" />
            Notifications
          </h2>

          <div className="flex justify-between items-center p-3 rounded-lg border hover:shadow-sm transition">
            <div>
              <h3 className="font-medium text-gray-900">Daily Reminder</h3>
              <p className="text-sm text-gray-500">
                {settings.dailyReminder
                  ? 'Remind me daily at 7:00 PM'
                  : 'Daily reminders are disabled'}
              </p>
            </div>
            <button
              onClick={handleDailyReminderToggle}
              disabled={updateDailyReminder.isPending}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                settings.dailyReminder ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.dailyReminder ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow p-4 border border-red-200 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>

          {/* Clear Data */}
          <div className="flex justify-between items-center p-3 rounded-lg border bg-red-50">
            <div>
              <h3 className="font-medium text-red-900">Delete Data & Start Afresh</h3>
              <p className="text-sm text-red-600">
                This will permanently delete all your data but keep your account.
              </p>
            </div>
            <button
              onClick={() => setIsClearDataModalOpen(true)}
              disabled={clearAllData.isPending}
              className="w-full sm:w-auto px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 inline mr-1" />
              Clear Data
            </button>
          </div>

          {/* Delete Account */}
          <div className="flex justify-between items-center p-3 rounded-lg border bg-red-50">
            <div>
              <h3 className="font-medium text-red-900">Delete Account</h3>
              <p className="text-sm text-red-600">
                Permanently delete your account and all data. This action cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setIsDeleteAccountModalOpen(true)}
              disabled={deleteAccount.isPending}
              className="w-full sm:w-auto px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 inline mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TimeFormatModal
        isOpen={isTimeFormatModalOpen}
        onClose={() => setIsTimeFormatModalOpen(false)}
        currentFormat={settings.timeFormat}
        onUpdate={updateTimeFormat.mutateAsync}
      />
      <DecimalFormatModal
        isOpen={isDecimalFormatModalOpen}
        onClose={() => setIsDecimalFormatModalOpen(false)}
        currentFormat={settings.decimalFormat}
        onUpdate={updateDecimalFormat.mutateAsync}
      />
      <NumberFormatModal
        isOpen={isNumberFormatModalOpen}
        onClose={() => setIsNumberFormatModalOpen(false)}
        currentFormat={settings.numberFormat}
        onUpdate={updateNumberFormat.mutateAsync}
      />
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        currentCurrency={settings.currencyCode}
        onUpdate={updateCurrencyCode.mutateAsync}
      />
      <ConfirmationModal
        isOpen={isClearDataModalOpen}
        onClose={() => setIsClearDataModalOpen(false)}
        onConfirm={handleClearData}
        title="Clear All Data"
        message="Are you sure you want to delete all your data? This action cannot be undone."
        confirmText="Clear Data"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={clearAllData.isPending}
      />
      <ConfirmationModal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to permanently delete your account? This cannot be undone."
        confirmText="Delete Account"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteAccount.isPending}
      />
    </div>
  );
}

export default Settings;