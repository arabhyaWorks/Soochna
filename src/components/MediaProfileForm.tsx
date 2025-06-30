import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Radio, Tv, Globe, Mic, Users } from 'lucide-react';

interface MediaProfileFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  mediaCategory: string;
}

interface FormData {
  // Common fields
  mediaCategory: string;
  
  // Newspaper specific
  rniNumber?: string;
  frequency?: string;
  pageSize?: string;
  pageCount?: number;
  printingPress?: string;
  averageCopies?: number;
  
  // TV Channel specific
  mibUplinkNumber?: string;
  mibDownlinkNumber?: string;
  broadcastPlatform?: string[];
  trpSource?: string;
  averageTrp?: number;
  
  // Digital Portal specific
  websiteUrl?: string;
  domainRegistrationId?: string;
  monthlyVisitors?: number;
  socialHandles?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  
  // Radio specific
  stationCallSign?: string;
  frequency_mhz?: number;
  coverageRadius?: number;
  gopaLicenseNumber?: string;
  
  // Social Media Influencer specific
  channelUrl?: string;
  followerCount?: number;
  monthlyViews?: number;
  monthlyWatchHours?: number;
}

const MediaProfileForm: React.FC<MediaProfileFormProps> = ({ onNext, onBack, mediaCategory }) => {
  const [formData, setFormData] = useState<FormData>({
    mediaCategory,
    socialHandles: {}
  });
  const [errors, setErrors] = useState<any>({});

  const frequencies = [
    { value: 'daily', label: 'दैनिक' },
    { value: 'weekly', label: 'साप्ताहिक' },
    { value: 'biweekly', label: 'पाक्षिक' },
    { value: 'monthly', label: 'मासिक' },
    { value: 'other', label: 'अन्य' }
  ];

  const pageSizes = [
    { value: 'broadsheet', label: 'ब्रॉडशीट (Broadsheet)' },
    { value: 'tabloid', label: 'टैब्लॉइड (Tabloid)' },
    { value: 'compact', label: 'कॉम्पैक्ट (Compact)' },
    { value: 'other', label: 'अन्य' }
  ];

  const broadcastPlatforms = [
    { value: 'dth', label: 'DTH' },
    { value: 'cable', label: 'Cable' },
    { value: 'ott', label: 'OTT' },
    { value: 'terrestrial', label: 'Terrestrial' }
  ];

  const trpSources = [
    { value: 'barc', label: 'BARC' },
    { value: 'tam', label: 'TAM' },
    { value: 'other', label: 'अन्य' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSocialHandleChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialHandles: {
        ...prev.socialHandles,
        [platform]: value
      }
    }));
  };

  const handlePlatformChange = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      broadcastPlatform: prev.broadcastPlatform?.includes(platform)
        ? prev.broadcastPlatform.filter(p => p !== platform)
        : [...(prev.broadcastPlatform || []), platform]
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    switch (mediaCategory) {
      case 'newspaper':
        if (!formData.rniNumber?.trim()) newErrors.rniNumber = 'RNI पंजीकरण संख्या आवश्यक है';
        if (!formData.frequency) newErrors.frequency = 'आवृत्ति चुनना आवश्यक है';
        if (!formData.pageSize) newErrors.pageSize = 'पृष्ठ आकार चुनना आवश्यक है';
        if (!formData.pageCount || formData.pageCount <= 0) newErrors.pageCount = 'वैध पेज संख्या दर्ज करें';
        if (!formData.printingPress) newErrors.printingPress = 'मुद्रण प्रेस जानकारी आवश्यक है';
        if (!formData.averageCopies || formData.averageCopies <= 0) newErrors.averageCopies = 'औसत प्रतियों की संख्या दर्ज करें';
        break;

      case 'tv':
        if (!formData.mibUplinkNumber?.trim()) newErrors.mibUplinkNumber = 'MIB Uplink परमिशन नंबर आवश्यक है';
        if (!formData.mibDownlinkNumber?.trim()) newErrors.mibDownlinkNumber = 'MIB Downlink परमिशन नंबर आवश्यक है';
        if (!formData.broadcastPlatform || formData.broadcastPlatform.length === 0) newErrors.broadcastPlatform = 'कम से कम एक प्रसारण प्लैटफॉर्म चुनें';
        if (!formData.trpSource) newErrors.trpSource = 'TRP स्रोत चुनना आवश्यक है';
        if (formData.averageTrp === undefined || formData.averageTrp < 0) newErrors.averageTrp = 'वैध TRP दर्ज करें';
        break;

      case 'digital':
        if (!formData.websiteUrl?.trim()) newErrors.websiteUrl = 'वेबसाइट/ऐप URL आवश्यक है';
        if (!formData.domainRegistrationId?.trim()) newErrors.domainRegistrationId = 'डोमेन पंजीकरण ID आवश्यक है';
        if (!formData.monthlyVisitors || formData.monthlyVisitors <= 0) newErrors.monthlyVisitors = 'मासिक विज़िटर संख्या दर्ज करें';
        break;

      case 'radio':
        if (!formData.stationCallSign?.trim()) newErrors.stationCallSign = 'स्टेशन कॉल-साइन आवश्यक है';
        if (!formData.frequency_mhz || formData.frequency_mhz <= 0) newErrors.frequency_mhz = 'वैध फ़्रीक्वेंसी दर्ज करें';
        if (!formData.coverageRadius || formData.coverageRadius <= 0) newErrors.coverageRadius = 'कवरेज रेडियस दर्ज करें';
        if (!formData.gopaLicenseNumber?.trim()) newErrors.gopaLicenseNumber = 'GOPA/लाइसेंस क्रमांक आवश्यक है';
        break;

      case 'social':
        if (!formData.channelUrl?.trim()) newErrors.channelUrl = 'चैनल/हैंडल URL आवश्यक है';
        if (!formData.followerCount || formData.followerCount <= 0) newErrors.followerCount = 'फॉलोअर संख्या दर्ज करें';
        if (!formData.monthlyViews || formData.monthlyViews <= 0) newErrors.monthlyViews = 'मासिक व्यू संख्या दर्ज करें';
        if (!formData.monthlyWatchHours || formData.monthlyWatchHours <= 0) newErrors.monthlyWatchHours = 'मासिक वॉच ऑवर दर्ज करें';
        break;
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(formData);
  };

  const getIcon = () => {
    switch (mediaCategory) {
      case 'newspaper': return <CheckCircle className="h-8 w-8 text-orange-600" />;
      case 'tv': return <Tv className="h-8 w-8 text-orange-600" />;
      case 'digital': return <Globe className="h-8 w-8 text-orange-600" />;
      case 'radio': return <Radio className="h-8 w-8 text-orange-600" />;
      case 'social': return <Users className="h-8 w-8 text-orange-600" />;
      default: return <CheckCircle className="h-8 w-8 text-orange-600" />;
    }
  };

  const getTitle = () => {
    switch (mediaCategory) {
      case 'newspaper': return 'समाचार-पत्र प्रोफ़ाइल';
      case 'tv': return 'समाचार चैनल प्रोफ़ाइल';
      case 'digital': return 'डिजिटल पोर्टल प्रोफ़ाइल';
      case 'radio': return 'रेडियो स्टेशन प्रोफ़ाइल';
      case 'social': return 'सोशल मीडिया प्रोफ़ाइल';
      default: return 'मीडिया प्रोफ़ाइल';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-full">
            {getIcon()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
            <p className="text-gray-600">Media-specific Profile Information</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Newspaper Fields */}
        {mediaCategory === 'newspaper' && (
          <>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                RNI पंजीकरण संख्या <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="rniNumber"
                value={formData.rniNumber || ''}
                onChange={handleInputChange}
                placeholder="RNI पंजीकरण संख्या दर्ज करें"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.rniNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.rniNumber && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.rniNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                प्रकाशन आवृत्ति <span className="text-red-500">*</span>
              </label>
              <select
                name="frequency"
                value={formData.frequency || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.frequency ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">आवृत्ति चुनें</option>
                {frequencies.map((freq) => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
              {errors.frequency && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.frequency}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                पृष्ठ आकार <span className="text-red-500">*</span>
              </label>
              <select
                name="pageSize"
                value={formData.pageSize || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.pageSize ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">पृष्ठ आकार चुनें</option>
                {pageSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
              {errors.pageSize && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.pageSize}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                पेजों की संख्या <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="pageCount"
                value={formData.pageCount || ''}
                onChange={handleInputChange}
                placeholder="पेजों की संख्या दर्ज करें"
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.pageCount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.pageCount && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.pageCount}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                मुद्रण प्रेस <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="printingPress"
                    value="own"
                    checked={formData.printingPress === 'own'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="text-gray-800">अपना प्रेस</span>
                </label>
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="printingPress"
                    value="contract"
                    checked={formData.printingPress === 'contract'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="text-gray-800">ठेका प्रेस</span>
                </label>
              </div>
              {errors.printingPress && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.printingPress}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                औसत मुद्रित प्रतियाँ <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="averageCopies"
                value={formData.averageCopies || ''}
                onChange={handleInputChange}
                placeholder="औसत प्रतियों की संख्या दर्ज करें"
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.averageCopies ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.averageCopies && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.averageCopies}
                </p>
              )}
            </div>
          </>
        )}

        {/* TV Channel Fields */}
        {mediaCategory === 'tv' && (
          <>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                MIB Uplink परमिशन नंबर <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mibUplinkNumber"
                value={formData.mibUplinkNumber || ''}
                onChange={handleInputChange}
                placeholder="MIB Uplink परमिशन नंबर दर्ज करें"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.mibUplinkNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.mibUplinkNumber && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.mibUplinkNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                MIB Downlink परमिशन नंबर <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mibDownlinkNumber"
                value={formData.mibDownlinkNumber || ''}
                onChange={handleInputChange}
                placeholder="MIB Downlink परमिशन नंबर दर्ज करें"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.mibDownlinkNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.mibDownlinkNumber && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.mibDownlinkNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                प्रसारण प्लैटफॉर्म <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {broadcastPlatforms.map((platform) => (
                  <label key={platform.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.broadcastPlatform?.includes(platform.value) || false}
                      onChange={() => handlePlatformChange(platform.value)}
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-800">{platform.label}</span>
                  </label>
                ))}
              </div>
              {errors.broadcastPlatform && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.broadcastPlatform}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                TRP स्रोत <span className="text-red-500">*</span>
              </label>
              <select
                name="trpSource"
                value={formData.trpSource || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.trpSource ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">TRP स्रोत चुनें</option>
                {trpSources.map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
              {errors.trpSource && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.trpSource}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                औसत TRP (पिछले 3 महीने) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="averageTrp"
                value={formData.averageTrp || ''}
                onChange={handleInputChange}
                placeholder="औसत TRP दर्ज करें"
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.averageTrp ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.averageTrp && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.averageTrp}
                </p>
              )}
            </div>
          </>
        )}

        {/* Digital Portal Fields */}
        {mediaCategory === 'digital' && (
          <>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                वेबसाइट/ऐप URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl || ''}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.websiteUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.websiteUrl && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.websiteUrl}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                डोमेन पंजीकरण ID (WHOIS) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="domainRegistrationId"
                value={formData.domainRegistrationId || ''}
                onChange={handleInputChange}
                placeholder="डोमेन पंजीकरण ID दर्ज करें"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.domainRegistrationId ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.domainRegistrationId && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.domainRegistrationId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                औसत मासिक Unique Visitors <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="monthlyVisitors"
                value={formData.monthlyVisitors || ''}
                onChange={handleInputChange}
                placeholder="मासिक विज़िटर संख्या दर्ज करें"
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.monthlyVisitors ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.monthlyVisitors && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.monthlyVisitors}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                सोशल मीडिया हैंडल लिंक
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="Facebook URL"
                  value={formData.socialHandles?.facebook || ''}
                  onChange={(e) => handleSocialHandleChange('facebook', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="url"
                  placeholder="Twitter/X URL"
                  value={formData.socialHandles?.twitter || ''}
                  onChange={(e) => handleSocialHandleChange('twitter', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="url"
                  placeholder="Instagram URL"
                  value={formData.socialHandles?.instagram || ''}
                  onChange={(e) => handleSocialHandleChange('instagram', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="url"
                  placeholder="YouTube URL"
                  value={formData.socialHandles?.youtube || ''}
                  onChange={(e) => handleSocialHandleChange('youtube', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        )}

        {/* Radio Fields */}
        {mediaCategory === 'radio' && (
          <>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                स्टेशन कॉल-साइन <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="stationCallSign"
                value={formData.stationCallSign || ''}
                onChange={handleInputChange}
                placeholder="स्टेशन कॉल-साइन दर्ज करें"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.stationCallSign ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.stationCallSign && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.stationCallSign}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                फ़्रीक्वेंसी (MHz) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="frequency_mhz"
                value={formData.frequency_mhz || ''}
                onChange={handleInputChange}
                placeholder="फ़्रीक्वेंसी दर्ज करें"
                step="0.1"
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.frequency_mhz ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.frequency_mhz && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.frequency_mhz}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                कवरेज रेडियस (किमी) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="coverageRadius"
                value={formData.coverageRadius || ''}
                onChange={handleInputChange}
                placeholder="कवरेज रेडियस दर्ज करें"
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.coverageRadius ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.coverageRadius && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.coverageRadius}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                GOPA/लाइसेंस क्रमांक <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="gopaLicenseNumber"
                value={formData.gopaLicenseNumber || ''}
                onChange={handleInputChange}
                placeholder="GOPA/लाइसेंस क्रमांक दर्ज करें"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.gopaLicenseNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.gopaLicenseNumber && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.gopaLicenseNumber}
                </p>
              )}
            </div>
          </>
        )}

        {/* Social Media Influencer Fields */}
        {mediaCategory === 'social' && (
          <>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                चैनल/हैंडल URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="channelUrl"
                value={formData.channelUrl || ''}
                onChange={handleInputChange}
                placeholder="https://youtube.com/channel/..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.channelUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.channelUrl && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.channelUrl}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                फॉलोअर संख्या <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="followerCount"
                value={formData.followerCount || ''}
                onChange={handleInputChange}
                placeholder="फॉलोअर संख्या दर्ज करें"
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.followerCount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.followerCount && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.followerCount}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                औसत मासिक व्यू <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="monthlyViews"
                value={formData.monthlyViews || ''}
                onChange={handleInputChange}
                placeholder="मासिक व्यू संख्या दर्ज करें"
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.monthlyViews ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.monthlyViews && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.monthlyViews}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                औसत मासिक वॉच ऑवर <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="monthlyWatchHours"
                value={formData.monthlyWatchHours || ''}
                onChange={handleInputChange}
                placeholder="मासिक वॉच ऑवर दर्ज करें"
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.monthlyWatchHours ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.monthlyWatchHours && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.monthlyWatchHours}
                </p>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>वापस</span>
          </button>

          <button
            type="submit"
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
          >
            <span>अगला चरण</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediaProfileForm;