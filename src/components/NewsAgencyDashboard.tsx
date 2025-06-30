import React from 'react';
import { Settings, FileText, Users, Bell, Upload, User as UserIcon, Home, ArrowRight, ArrowLeft, Edit, CheckCircle, Clock, Star, Phone, Shield, HelpCircle, BarChart3, MessageCircle, Newspaper, MapPin, Eye } from 'lucide-react';
import type { User } from '../types';
import DashboardSidebar from './DashboardSidebar';
import NewsUploadForm from './NewsUploadForm';
import NewsProfile from './NewsProfile';

interface NewsAgencyDashboardProps {
  user: User;
  onLogout: () => void;
}
const NewsAgencyDashboard: React.FC<NewsAgencyDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent onNavigateToUpload={() => setActiveTab('upload')} onNavigateToProfile={() => setActiveTab('profile')} />;
      case 'upload':
        return <UploadContent />;
      case 'profile':
        return <NewsProfile user={user} />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 lg:pb-0">
      <div className="lg:flex">
        {/* Sidebar */}
        <DashboardSidebar 
          user={user}
          onLogout={onLogout}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-80 min-h-screen lg:pt-0">
          <main className="lg:p-8 max-w-7xl mx-auto lg:pb-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

// Home Content Component
const HomeContent: React.FC<{ onNavigateToUpload: () => void; onNavigateToProfile: () => void }> = ({ onNavigateToUpload, onNavigateToProfile }) => (
  <div className="space-y-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 hidden lg:block">समाचार एजेंसी डैशबोर्ड</h2>
      <p className="text-gray-600 hidden lg:block">स्वागत है! आपके डैशबोर्ड में आपकी सभी गतिविधियों का सारांश है।</p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-2.5">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
          <div className="ml-2 md:ml-4">
            <p className="text-sm font-medium text-gray-500">प्रकाशित समाचार</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Upload className="h-8 w-8 text-green-500" />
          </div>
          <div className="ml-2 md:ml-4">
            <p className="text-sm font-medium text-gray-500">अपलोड किए गए</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Bell className="h-8 w-8 text-orange-500" />
          </div>
          <div className="ml-2 md:ml-4">
            <p className="text-sm font-medium text-gray-500">समीक्षाधीन</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Settings className="h-8 w-8 text-purple-500" />
          </div>
          <div className="ml-2 md:ml-4">
            <p className="text-sm font-medium text-gray-500">खाता स्थिति</p>
            <p className="text-2xl font-bold text-green-600">सक्रिय</p>
          </div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mx-2.5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">त्वरित कार्य</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={onNavigateToUpload}
          className="p-4 text-left border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
        >
          <Upload className="h-6 w-6 text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-200" />
          <h4 className="font-medium text-gray-900">नया समाचार अपलोड करें</h4>
          <p className="text-sm text-gray-500 mt-1">नई समाचार सामग्री अपलोड करें</p>
        </button>

        <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
          <FileText className="h-6 w-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-200" />
          <h4 className="font-medium text-gray-900">मेरे समाचार देखें</h4>
          <p className="text-sm text-gray-500 mt-1">अपलोड किए गए समाचार देखें</p>
        </button>

        <button 
          onClick={onNavigateToProfile}
          className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
        >
          <Settings className="h-6 w-6 text-green-500 mb-2 group-hover:scale-110 transition-transform duration-200" />
          <h4 className="font-medium text-gray-900">प्रोफ़ाइल सेटिंग्स</h4>
          <p className="text-sm text-gray-500 mt-1">अपनी प्रोफ़ाइल अपडेट करें</p>
        </button>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">हाल की गतिविधि</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-sm text-gray-700">समाचार "UP में नई शिक्षा नीति" अनुमोदित</p>
          <span className="text-xs text-gray-500 ml-auto">2 घंटे पहले</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <p className="text-sm text-gray-700">नया समाचार अपलोड किया गया</p>
          <span className="text-xs text-gray-500 ml-auto">4 घंटे पहले</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <p className="text-sm text-gray-700">समाचार समीक्षा के लिए भेजा गया</p>
          <span className="text-xs text-gray-500 ml-auto">1 दिन पहले</span>
        </div>
      </div>
    </div>
  </div>
);

// Upload Content Component
const UploadContent: React.FC = () => (
  <NewsUploadForm />
);

export default NewsAgencyDashboard;