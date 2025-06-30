import React from 'react';
import { Settings, FileText, Users, Bell, Database, User as UserIcon } from 'lucide-react';
import type { User } from '../types';
import DashboardSidebar from './DashboardSidebar';

interface SuperAdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <AdminHomeContent />;
      case 'upload':
        return <AdminUploadContent />;
      case 'profile':
        return <AdminProfileContent user={user} />;
      default:
        return <AdminHomeContent />;
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

// Admin Home Content Component
const AdminHomeContent: React.FC = () => (
  <div className="space-y-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">सुपर एडमिन डैशबोर्ड</h2>
      <p className="text-gray-600">स्वागत है! आप सिस्टम के सुपर एडमिन हैं। यहाँ सभी गतिविधियों का सारांश है।</p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <div className="ml-2 md:ml-4">
            <p className="text-sm font-medium text-gray-500">कुल एजेंसी</p>
            <p className="text-2xl font-bold text-gray-900">156</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FileText className="h-8 w-8 text-green-500" />
          </div>
          <div className="ml-2 md:ml-4">
            <p className="text-sm font-medium text-gray-500">कुल समाचार</p>
            <p className="text-2xl font-bold text-gray-900">2,847</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Bell className="h-8 w-8 text-orange-500" />
          </div>
          <div className="ml-2 md:ml-4">
            <p className="text-sm font-medium text-gray-500">लंबित अनुमोदन</p>
            <p className="text-2xl font-bold text-gray-900">23</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Database className="h-8 w-8 text-purple-500" />
          </div>
          <div className="ml-2 md:ml-4">
            <p className="text-sm font-medium text-gray-500">सिस्टम स्थिति</p>
            <p className="text-2xl font-bold text-green-600">सक्रिय</p>
          </div>
        </div>
      </div>
    </div>

    {/* Admin Actions */}
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">एडमिन कार्य</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
          <Users className="h-6 w-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-200" />
          <h4 className="font-medium text-gray-900">एजेंसी प्रबंधन</h4>
          <p className="text-sm text-gray-500 mt-1">सभी पंजीकृत एजेंसियों को देखें और प्रबंधित करें</p>
        </button>

        <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
          <FileText className="h-6 w-6 text-green-500 mb-2 group-hover:scale-110 transition-transform duration-200" />
          <h4 className="font-medium text-gray-900">समाचार मॉडरेशन</h4>
          <p className="text-sm text-gray-500 mt-1">समाचार सामग्री की समीक्षा और अनुमोदन</p>
        </button>

        <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
          <Settings className="h-6 w-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform duration-200" />
          <h4 className="font-medium text-gray-900">सिस्टम सेटिंग्स</h4>
          <p className="text-sm text-gray-500 mt-1">सिस्टम कॉन्फ़िगरेशन और सेटिंग्स</p>
        </button>
      </div>
    </div>

    {/* Recent Admin Activity */}
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">हाल की एडमिन गतिविधि</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <p className="text-sm text-gray-700">नई एजेंसी पंजीकरण अनुरोध - "आज तक न्यूज़"</p>
          <span className="text-xs text-gray-500 ml-auto">30 मिनट पहले</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <p className="text-sm text-gray-700">समाचार अनुमोदन - "UP में नई शिक्षा नीति"</p>
          <span className="text-xs text-gray-500 ml-auto">1 घंटा पहले</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-sm text-gray-700">एजेंसी सत्यापन पूर्ण - "दैनिक भास्कर"</p>
          <span className="text-xs text-gray-500 ml-auto">2 घंटे पहले</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <p className="text-sm text-gray-700">सिस्टम बैकअप पूर्ण</p>
          <span className="text-xs text-gray-500 ml-auto">4 घंटे पहले</span>
        </div>
      </div>
    </div>
  </div>
);

// Admin Upload Content Component
const AdminUploadContent: React.FC = () => (
  <div className="space-y-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">सिस्टम अपलोड</h2>
      <p className="text-gray-600">सिस्टम फाइलें और कॉन्फ़िगरेशन अपलोड करें।</p>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
      <div className="text-center">
        <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">सिस्टम फाइल अपलोड</h3>
        <p className="text-gray-600 mb-6">यहाँ आप सिस्टम कॉन्फ़िगरेशन और अन्य फाइलें अपलोड कर सकते हैं।</p>
        <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
          फाइल अपलोड करें
        </button>
      </div>
    </div>
  </div>
);

// Admin Profile Content Component
const AdminProfileContent: React.FC<{ user: User }> = ({ user }) => (
  <div className="space-y-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">एडमिन प्रोफ़ाइल</h2>
      <p className="text-gray-600">अपनी एडमिन प्रोफ़ाइल जानकारी देखें और अपडेट करें।</p>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
      <div className="flex items-center space-x-6 mb-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full">
          <UserIcon className="h-12 w-12 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-red-600 font-medium">सुपर एडमिन</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">नाम</label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ईमेल</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">फोन नंबर</label>
          <input
            type="tel"
            value={user.phone || 'N/A'}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">भूमिका</label>
          <input
            type="text"
            value="सुपर एडमिन"
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
          प्रोफ़ाइल अपडेट करें
        </button>
      </div>
    </div>
  </div>
);

export default SuperAdminDashboard;