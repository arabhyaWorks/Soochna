import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { LoginForm } from '../types';

interface LoginProps {
  onLogin: (user: any) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginForm>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Partial<LoginForm> = {};
    if (!form.email) newErrors.email = 'ईमेल आवश्यक है';
    if (!form.password) newErrors.password = 'पासवर्ड आवश्यक है';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock login - determine role based on email or other logic
    // In real app, this would be an API call that returns user data with role
    let userData;
    
    // Example: Super admin login
    if (form.email === 'admin@soochnavibhag.up.gov.in') {
      userData = {
        id: '1',
        name: 'सुपर एडमिन',
        email: form.email,
        role: 'super_admin'
      };
    } else {
      // Default to news agency
      userData = {
        id: '2',
        name: 'समाचार एजेंसी',
        email: form.email,
        role: 'news_agency'
      };
    }
    
    onLogin(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(https://scx2.b-cdn.net/gfx/news/hires/2020/newspaper.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-4 grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - CM Image and Details */}
        <div className="hidden lg:flex flex-col items-center text-center text-white space-y-6">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/64/Yogi_Adithyanath_in_Uttar_Pradesh_2023.jpg"
              alt="मुख्यमंत्री योगी आदित्यनाथ"
              className="w-64 h-80 object-cover rounded-2xl mx-auto mb-8 shadow-2xl"
            />
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">योगी आदित्यनाथ</h2>
              <p className="text-xl text-orange-600 font-medium">माननीय मुख्यमंत्री</p>
              <p className="text-lg text-gray-600">उत्तर प्रदेश</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white border-opacity-20">
            
            {/* Logos */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <img 
                src="https://upidadv.up.gov.in/UserAssets/loginassets/img/logo.jpg"
                alt="सूचना विभाग लोगो"
                className="h-16 w-auto bg-white rounded-lg p-2 shadow-md"
              />
              <img 
                src="https://soochanaandjansamparkvibhag.wordpress.com/wp-content/uploads/2019/11/upgov.png?w=1024"
                alt="यूपी सरकार लोगो"
                className="h-16 w-auto bg-white rounded-lg p-2 shadow-md"
              />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">सूचना विभाग पोर्टल</h1>
              <p className="text-gray-600">समाचार एजेंसी पंजीकरण प्रणाली</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ईमेल पता
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="आपका ईमेल पता दर्ज करें"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  पासवर्ड
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="आपका पासवर्ड दर्ज करें"
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 font-medium"
              >
                लॉगिन करें
              </button>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  नया उपयोगकर्ता हैं?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
                  >
                    पंजीकरण करें
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;