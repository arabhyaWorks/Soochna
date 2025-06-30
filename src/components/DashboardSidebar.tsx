import React, { useState } from 'react';
import { Home, Upload, User, LogOut, Menu, X, Newspaper, Shield } from 'lucide-react';
import type { User as UserType } from '../types';

interface DashboardSidebarProps {
  user: UserType;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  user, 
  onLogout, 
  activeTab, 
  onTabChange 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'होम', icon: Home, description: 'Dashboard Home' },
    { id: 'upload', label: 'अपलोड', icon: Upload, description: 'Upload News' },
    { id: 'profile', label: 'प्रोफ़ाइल', icon: User, description: 'Profile Settings' },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-gradient-to-r from-orange-500 to-red-500 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://upidadv.up.gov.in/UserAssets/loginassets/img/logo.jpg"
              alt="सूचना विभाग लोगो"
              className="h-10 w-10 bg-white rounded-lg p-1 shadow-sm"
            />
            <div>
              <h1 className="text-white font-bold text-base leading-tight">सूचना एवं जनसम्पर्क विभाग</h1>
              <p className="text-orange-100 text-sm leading-tight font-medium">उत्तर प्रदेश</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-white bg-opacity-20 rounded-lg hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">मेन्यू</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* User Info */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-30 p-2 rounded-full">
                  {user.role === 'super_admin' ? (
                    <Shield className="h-6 w-6 text-white" />
                  ) : (
                    <Newspaper className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-orange-100 text-sm">
                    {user.role === 'super_admin' ? 'सुपर एडमिन' : 'समाचार एजेंसी'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2 mb-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">लॉगआउट</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-80 lg:bg-white lg:shadow-xl lg:border-r lg:border-gray-200 lg:flex lg:flex-col">
        
        {/* Sidebar Header */}
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-red-600 px-6 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://upidadv.up.gov.in/UserAssets/loginassets/img/logo.jpg"
                alt="सूचना विभाग लोगो"
                className="h-12 w-12 bg-white rounded-lg p-2 shadow-md"
              />
              <div>
                <h2 className="text-lg font-bold text-white">सूचना एवं जनसम्पर्क विभाग</h2>
                <p className="text-orange-100 text-sm">उत्तर प्रदेश</p>
              </div>
            </div>
            
            {/* User Info */}
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-30 p-2 rounded-full">
                  {user.role === 'super_admin' ? (
                    <Shield className="h-6 w-6 text-white" />
                  ) : (
                    <Newspaper className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-orange-100 text-sm">
                    {user.role === 'super_admin' ? 'सुपर एडमिन' : 'समाचार एजेंसी'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md hover:transform hover:scale-105'
                }`}
              >
                <Icon className={`h-5 w-5 ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-orange-500'
                }`} />
                <div className="text-left">
                  <p className={`font-medium ${
                    isActive ? 'text-white' : 'text-gray-900 group-hover:text-orange-600'
                  }`}>
                    {item.label}
                  </p>
                  <p className={`text-sm ${
                    isActive ? 'text-orange-100' : 'text-gray-500 group-hover:text-orange-500'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-2 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-4 py-1 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group hover:shadow-md hover:transform hover:scale-105"
          >
            <LogOut className="h-5 w-5 text-gray-500 group-hover:text-red-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900 group-hover:text-red-600">लॉगआउट</p>
              <p className="text-sm text-gray-500 group-hover:text-red-500">Sign Out</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            © 2024 सूचना विभाग, उत्तर प्रदेश
          </p>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
        <div className="grid grid-cols-4 h-16">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                  isActive
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-500 hover:text-orange-600 hover:bg-orange-25'
                }`}
              >
                <Icon className={`h-5 w-5 ${
                  isActive ? 'text-orange-600' : 'text-gray-500'
                }`} />
                <span className={`text-xs font-medium ${
                  isActive ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-orange-600 rounded-b-full"></div>
                )}
              </button>
            );
          })}
          
          {/* Logout Button in Bottom Nav */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-red-600 hover:bg-red-25 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs font-medium">लॉगआउट</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;