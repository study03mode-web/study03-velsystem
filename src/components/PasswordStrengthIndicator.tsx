import { getPasswordStrength } from '../utils/passwordValidation';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const { strength, label, color } = getPasswordStrength(password);
  const maxStrength = 8;
  const percentage = (strength / maxStrength) * 100;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-600">Password strength:</span>
        <span className={`text-sm font-medium ${color}`}>{label}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            strength <= 2 ? 'bg-red-500' :
            strength <= 4 ? 'bg-yellow-500' :
            strength <= 6 ? 'bg-blue-500' : 'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}