import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Panjikaran from './components/Panjikaran';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import NewsAgencyDashboard from './components/NewsAgencyDashboard';
import type { User } from './types';

type AppState = 'login' | 'register' | 'panjikaran' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleRegister = (userData: User) => {
    setUser(userData);
    setCurrentView('panjikaran');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const handleProceedToForm = () => {
    setCurrentView('dashboard');
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  if (currentView === 'dashboard' && user) {
    // Route to appropriate dashboard based on user role
    if (user.role === 'super_admin') {
      return <SuperAdminDashboard user={user} onLogout={handleLogout} />;
    } else {
      return <NewsAgencyDashboard user={user} onLogout={handleLogout} />;
    }
  }

  if (currentView === 'panjikaran' && user) {
    return (
      <Panjikaran 
        user={user} 
        onProceedToForm={handleProceedToForm}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <Register 
        onRegister={handleRegister} 
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  return (
    <Login 
      onLogin={handleLogin} 
      onSwitchToRegister={switchToRegister}
    />
  );
}

export default App;