import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Clock } from 'lucide-react';
import { RegisterForm, OTPVerification } from '../types';

interface RegisterProps {
  onRegister: (user: any) => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [step, setStep] = useState<'basic' | 'otp'>('basic');
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'news_agency',
  });
  const [otp, setOtp] = useState<OTPVerification>({
    emailOTP: '',
    phoneOTP: '',
    isVerified: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [timer, setTimer] = useState(0);
  const [canResendOTP, setCanResendOTP] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && step === 'otp') {
      setCanResendOTP(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  const validateBasicForm = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = 'नाम आवश्यक है';
    if (!form.email.trim()) newErrors.email = 'ईमेल आवश्यक है';
    if (!form.phone.trim()) newErrors.phone = 'फोन नंबर आवश्यक है';
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = 'वैध फोन नंबर दर्ज करें';
    if (!form.password) newErrors.password = 'पासवर्ड आवश्यक है';
    else if (form.password.length < 6)
      newErrors.password = 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'पासवर्ड मेल नहीं खाता';

    return newErrors;
  };

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateBasicForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Move to OTP step
    setStep('otp');
    setTimer(60);
    setCanResendOTP(false);
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate OTP (mock validation - both should be 111111)
    if (otp.emailOTP !== '111111' || otp.phoneOTP !== '111111') {
      setErrors({ otp: 'गलत OTP. कृपया 111111 दर्ज करें' });
      return;
    }

    // Registration successful
    onRegister({
      id: '2',
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
    });
  };

  const handleResendOTP = () => {
    setTimer(60);
    setCanResendOTP(false);
    setOtp({ emailOTP: '', phoneOTP: '', isVerified: false });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in form) {
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setOtp((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative py-4"
      style={{
        backgroundImage:
          'url(https://scx2.b-cdn.net/gfx/news/hires/2020/newspaper.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 w-full max-w-6xl mx-4 grid lg:grid-cols-2 gap-6 items-center">
        {/* Left Side - CM Image and Details */}
        <div className="hidden lg:flex flex-col items-center text-center text-white space-y-6">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/64/Yogi_Adithyanath_in_Uttar_Pradesh_2023.jpg"
              alt="मुख्यमंत्री योगी आदित्यनाथ"
              className="w-64 h-80 object-cover rounded-2xl mx-auto mb-8 shadow-2xl"
            />
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">
                योगी आदित्यनाथ
              </h2>
              <p className="text-xl text-orange-600 font-medium">
                माननीय मुख्यमंत्री
              </p>
              <p className="text-lg text-gray-600">उत्तर प्रदेश</p>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white border-opacity-20">
            {/* Logos */}
            <div className="flex justify-center items-center space-x-4 mb-1">
              <img
                src="https://upidadv.up.gov.in/UserAssets/loginassets/img/logo.jpg"
                alt="सूचना विभाग लोगो"
                className="h-12 w-auto bg-white rounded-lg p-1 shadow-md"
              />
              <img
                src="https://soochanaandjansamparkvibhag.wordpress.com/wp-content/uploads/2019/11/upgov.png?w=1024"
                alt="यूपी सरकार लोगो"
                className="h-12 w-auto bg-white rounded-lg p-1 shadow-md"
              />
            </div>

            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800 ">
                {step === 'basic' ? 'नया पंजीकरण' : 'OTP सत्यापन'}
              </h1>
              <p className="text-gray-600">
                {step === 'basic'
                  ? 'समाचार एजेंसी पंजीकरण'
                  : 'कृपया OTP दर्ज करें'}
              </p>
            </div>

            {step === 'basic' ? (
              <form onSubmit={handleBasicSubmit} className="space-y-2">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    नाम <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="आपका पूरा नाम दर्ज करें"
                      className={`w-full pl-12 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ईमेल पता <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="आपका ईमेल पता दर्ज करें"
                      className={`w-full pl-12 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    फोन नंबर <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="आपका मोबाइल नंबर दर्ज करें"
                      className={`w-full pl-12 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पासवर्ड <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="आपका पासवर्ड दर्ज करें"
                      className={`w-full pl-12 pr-12 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पासवर्ड पुष्टि <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="पासवर्ड दोबारा दर्ज करें"
                      className={`w-full pl-12 pr-12 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 font-medium"
                >
                  OTP भेजें
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-600">
                    पहले से पंजीकृत हैं?{' '}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
                    >
                      लॉगिन करें
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOTPSubmit} className="space-y-4">
                {/* Timer Display */}
                {timer > 0 && (
                  <div className="text-center bg-orange-50 rounded-xl p-3">
                    <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-orange-600 font-medium">
                      OTP पुनः भेजने के लिए {timer} सेकंड प्रतीक्षा करें
                    </p>
                  </div>
                )}

                {/* Email OTP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ईमेल OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="emailOTP"
                    value={otp.emailOTP}
                    onChange={handleChange}
                    placeholder="ईमेल से प्राप्त OTP दर्ज करें"
                    maxLength={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-center text-lg tracking-widest"
                  />
                </div>

                {/* Phone OTP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    फोन OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneOTP"
                    value={otp.phoneOTP}
                    onChange={handleChange}
                    placeholder="SMS से प्राप्त OTP दर्ज करें"
                    maxLength={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-center text-lg tracking-widest"
                  />
                </div>

                {errors.otp && (
                  <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded-xl">
                    {errors.otp}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 px-4 rounded-xl hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 font-medium"
                >
                  सत्यापन करें
                </button>

                {/* Resend OTP Button */}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResendOTP}
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    canResendOTP
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  OTP पुनः भेजें
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setStep('basic')}
                  className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  वापस जाएं
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
