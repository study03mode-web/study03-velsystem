export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];

  // Minimum 8 characters
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // At least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // At least one digit
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // At least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{}|;':",.<>?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // No spaces allowed
  if (/\s/.test(password)) {
    errors.push('Password cannot contain spaces');
  }

  // Check for common weak passwords
  const commonPasswords = [
    'password', 'password123', '123456', '123456789', 'qwerty',
    'abc123', 'admin', 'admin123', 'welcome', 'welcome123',
    'letmein', 'monkey', 'dragon', 'master', 'shadow'
  ];

  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common. Please choose a stronger password');
  }

  // Check for obvious patterns
  if (/^(.)\1+$/.test(password)) { // All same character
    errors.push('Password cannot be all the same character');
  }

  if (/^(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321|210)/.test(password)) {
    errors.push('Password cannot contain obvious number sequences');
  }

  if (/^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password)) {
    errors.push('Password cannot contain obvious letter sequences');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  let score = 0;

  // Length bonus
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{}|;':",.<>?]/.test(password)) score += 1;

  // Complexity bonus
  if (password.length >= 16) score += 1;
  if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) score += 1;

  if (score <= 2) {
    return { strength: score, label: 'Weak', color: 'text-red-600' };
  } else if (score <= 4) {
    return { strength: score, label: 'Fair', color: 'text-yellow-600' };
  } else if (score <= 6) {
    return { strength: score, label: 'Good', color: 'text-blue-600' };
  } else {
    return { strength: score, label: 'Strong', color: 'text-green-600' };
  }
};