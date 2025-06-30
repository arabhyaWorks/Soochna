import React from 'react';
import { Settings, FileText, Users, Bell, Upload, User as UserIcon, Home, ArrowRight, ArrowLeft, Edit, CheckCircle, Clock, Star, Phone, Shield, HelpCircle, BarChart3, MessageCircle, Newspaper, MapPin, Eye } from 'lucide-react';
import type { User } from '../types';

interface NewsProfileProps {
  user: User;
}

const NewsProfile: React.FC<NewsProfileProps> = ({ user }) => {
  const [showDetailedProfile, setShowDetailedProfile] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  // Mock data - in real app, this would come from API/database
  const profileData = {
    personal: {
      name: user.name,
      email: user.email,
      phone: user.phone || '+91 9876543210',
      role: 'समाचार एजेंसी',
      registrationDate: '15 जनवरी 2024',
      status: 'सत्यापित',
      profileImage: null
    },
    media: {
      mediaCategory: 'समाचार-पत्र',
      mediaName: 'दैनिक जागरण',
      mediaTitle: 'दैनिक जागरण - लखनऊ संस्करण',
      languages: ['हिंदी', 'अंग्रेजी'],
      frequency: 'दैनिक',
      timeOfDay: 'प्रातः कालीन',
      startDate: '1 जनवरी 2020',
      rniNumber: 'UPHIN/2020/12345',
      pageSize: 'ब्रॉडशीट',
      pageCount: 16,
      printingPress: 'अपना प्रेस',
      averageCopies: 50000
    },
    contact: {
      officeAddress: 'प्रेस कॉम्प्लेक्स, गोमती नगर, लखनऊ, उत्तर प्रदेश - 226010',
      districts: ['लखनऊ', 'कानपुर', 'आगरा'],
      circulationArea: 'राज्य',
      ePaperUrl: 'https://epaper.jagran.com',
      socialHandles: {
        facebook: 'https://facebook.com/dainikjagran',
        twitter: 'https://twitter.com/dainikjagran',
        youtube: 'https://youtube.com/dainikjagran'
      }
    },
    documents: {
      panCard: 'ABCDE1234F',
      aadharCard: '1234-XXXX-5678',
      diprCode: 'DIPR/UP/2024/001',
      uploadedDocs: ['RNI Certificate', 'CA Certificate', 'PAN Card', 'Aadhar Card']
    }
  };

  if (showDetailedProfile) {
    return (
      <div className="min-h-screen bg-gray-50 lg:bg-transparent">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">विस्तृत प्रोफ़ाइल</h2>
              <p className="text-gray-600">अपनी संपूर्ण प्रोफ़ाइल जानकारी देखें और प्रबंधित करें।</p>
            </div>
            <button
              onClick={() => setShowDetailedProfile(false)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>वापस</span>
            </button>
          </div>
        </div>

        <div className="space-y-6 px-4 lg:px-0 pb-20 lg:pb-0 pt-4 lg:pt-0">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-8 relative">
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{profileData.personal.name}</h3>
                  <p className="text-orange-100">{profileData.personal.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {profileData.personal.status}
                    </span>
                    <span className="text-orange-100 text-sm">
                      पंजीकृत: {profileData.personal.registrationDate}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <Edit className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-gray-900 flex items-center">
                <UserIcon className="h-5 w-5 text-orange-500 mr-2" />
                व्यक्तिगत जानकारी
              </h4>
              {isEditing && (
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  संपादित करें
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">पूरा नाम</label>
                <p className="text-gray-900 font-medium">{profileData.personal.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">ईमेल पता</label>
                <p className="text-gray-900 font-medium">{profileData.personal.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">मोबाइल नंबर</label>
                <p className="text-gray-900 font-medium">{profileData.personal.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">भूमिका</label>
                <p className="text-gray-900 font-medium">{profileData.personal.role}</p>
              </div>
            </div>
          </div>

          {/* Media Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-gray-900 flex items-center">
                <Newspaper className="h-5 w-5 text-blue-500 mr-2" />
                मीडिया जानकारी
              </h4>
              {isEditing && (
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  संपादित करें
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">मीडिया श्रेणी</label>
                <p className="text-gray-900 font-medium">{profileData.media.mediaCategory}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">मीडिया नाम</label>
                <p className="text-gray-900 font-medium">{profileData.media.mediaName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">RNI नंबर</label>
                <p className="text-gray-900 font-medium">{profileData.media.rniNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">भाषा</label>
                <p className="text-gray-900 font-medium">{profileData.media.languages.join(', ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">प्रकाशन आवृत्ति</label>
                <p className="text-gray-900 font-medium">{profileData.media.frequency}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">पृष्ठ आकार</label>
                <p className="text-gray-900 font-medium">{profileData.media.pageSize}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">औसत पेज संख्या</label>
                <p className="text-gray-900 font-medium">{profileData.media.pageCount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">औसत प्रतियाँ</label>
                <p className="text-gray-900 font-medium">{profileData.media.averageCopies.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 text-green-500 mr-2" />
                संपर्क विवरण
              </h4>
              {isEditing && (
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  संपादित करें
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">कार्यालय पता</label>
                <p className="text-gray-900 font-medium">{profileData.contact.officeAddress}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">जिले</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.contact.districts.map((district, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {district}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">प्रसार क्षेत्र</label>
                <p className="text-gray-900 font-medium">{profileData.contact.circulationArea}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">e-Paper URL</label>
                <a href={profileData.contact.ePaperUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                  {profileData.contact.ePaperUrl}
                </a>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 text-purple-500 mr-2" />
                दस्तावेज़
              </h4>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                अपडेट करें
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.documents.uploadedDocs.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-900 font-medium">{doc}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-semibold">
              प्रोफ़ाइल अपडेट करें
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 font-semibold">
              दस्तावेज़ अपडेट करें
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-transparent">
      {/* Desktop Header */}
      <div className="hidden lg:block mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">प्रोफ़ाइल सेटिंग्स</h2>
        <p className="text-gray-600">अपनी प्रोफ़ाइल जानकारी देखें और अपडेट करें।</p>
      </div>

      <div className="space-y-6 px-4 lg:px-0 pb-20 lg:pb-0 pt-4 lg:pt-0">
        {/* Profile Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-6 relative">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{profileData.personal.name}</h3>
                <p className="text-orange-100 text-sm">{profileData.personal.email}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {profileData.personal.status}
                  </span>
                  <span className="text-orange-100 text-xs">
                    {profileData.personal.role}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDetailedProfile(true)}
                className="bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <ArrowRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-500">अपलोड</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-xs text-gray-500">अनुमोदन</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500">समीक्षाधीन</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-xs text-gray-500">रेटिंग</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900 flex items-center">
                <UserIcon className="h-5 w-5 text-orange-500 mr-2" />
                बुनियादी जानकारी
              </h4>
              <button
                onClick={() => setShowDetailedProfile(true)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                विस्तार से देखें
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">नाम:</span>
                <span className="font-medium text-gray-900">{profileData.personal.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ईमेल:</span>
                <span className="font-medium text-gray-900 text-sm">{profileData.personal.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">फोन:</span>
                <span className="font-medium text-gray-900">{profileData.personal.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">स्थिति:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {profileData.personal.status}
                </span>
              </div>
            </div>
          </div>

          {/* Media Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900 flex items-center">
                <Newspaper className="h-5 w-5 text-blue-500 mr-2" />
                मीडिया विवरण
              </h4>
              <button
                onClick={() => setShowDetailedProfile(true)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                विस्तार से देखें
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">श्रेणी:</span>
                <span className="font-medium text-gray-900">{profileData.media.mediaCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">नाम:</span>
                <span className="font-medium text-gray-900">{profileData.media.mediaName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">RNI:</span>
                <span className="font-medium text-gray-900 text-sm">{profileData.media.rniNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">आवृत्ति:</span>
                <span className="font-medium text-gray-900">{profileData.media.frequency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowDetailedProfile(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2"
          >
            <Edit className="h-5 w-5" />
            <span>प्रोफ़ाइल संपादित करें</span>
          </button>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>दस्तावेज़ अपडेट करें</span>
          </button>
        </div>

        {/* App Features Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Settings className="h-5 w-5 text-purple-500 mr-2" />
            ऐप सुविधाएं
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 text-center border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
              <Phone className="h-6 w-6 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-gray-900">24/7 सहायता</p>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
              <FileText className="h-6 w-6 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-gray-900">नियम व शर्तें</p>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
              <Shield className="h-6 w-6 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-gray-900">गोपनीयता नीति</p>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
              <HelpCircle className="h-6 w-6 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-gray-900">FAQ</p>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group">
              <BarChart3 className="h-6 w-6 text-indigo-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-gray-900">एनालिटिक्स</p>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200 group">
              <Bell className="h-6 w-6 text-red-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-gray-900">नोटिफिकेशन</p>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group">
              <MessageCircle className="h-6 w-6 text-teal-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-gray-900">फीडबैक</p>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-xl hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 group">
              <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="text-sm font-medium text-gray-900">रेट करें</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            हाल की गतिविधि
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">प्रोफ़ाइल अपडेट की गई</p>
                <p className="text-xs text-gray-500">2 घंटे पहले</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">नया समाचार अपलोड किया</p>
                <p className="text-xs text-gray-500">5 घंटे पहले</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">दस्तावेज़ सत्यापित</p>
                <p className="text-xs text-gray-500">1 दिन पहले</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsProfile;