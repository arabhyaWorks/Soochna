export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'news_agency';
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'news_agency';
}

export interface OTPVerification {
  emailOTP: string;
  phoneOTP: string;
  isVerified: boolean;
}

// Dummy export to ensure module is not empty after TypeScript compilation
export const DUMMY_TYPE_EXPORT = {};