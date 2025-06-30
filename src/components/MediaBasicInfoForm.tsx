import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface MediaBasicInfoFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

interface FormData {
  mediaCategory: string;
  mediaName: string;
  mediaTitle: string;
  languages: string[];
  frequency?: string;
  timeOfDay?: string;
  startDate: string;
  officeAddress: string;
  districts: string[];
  email: string;
  mobile: string;
  circulationArea: string;
}

const MediaBasicInfoForm: React.FC<MediaBasicInfoFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    mediaCategory: '',
    mediaName: '',
    mediaTitle: '',
    languages: [],
    frequency: '',
    timeOfDay: '',
    startDate: '',
    officeAddress: '',
    districts: [],
    email: '',
    mobile: '',
    circulationArea: ''
  });

  const [errors, setErrors] = useState<any>({});

  const mediaCategories = [
    { value: 'newspaper', label: 'समाचार-पत्र (Print)/magazine' },
    { value: 'tv', label: 'समाचार चैनल (TV)' },
    { value: 'digital', label: 'डिजिटल समाचार पोर्टल / ऐप' },
    { value: 'radio', label: 'रेडियो (FM / सामुदायिक)' },
    { value: 'social', label: 'सोशल-मीडिया इन्फ़्लुएंसर (YouTube/FB/Insta/X)' }
  ];

  const languages = [
    'हिंदी', 'अंग्रेजी', 'उर्दू', 'पंजाबी', 'बंगाली', 'गुजराती', 'मराठी', 'तमिल', 'तेलुगु', 'कन्नड़', 'मलयालम', 'ओड़िया', 'असमिया', 'अन्य'
  ];

  const frequencies = [
    { value: 'daily', label: 'दैनिक' },
    { value: 'weekly', label: 'साप्ताहिक' },
    { value: 'biweekly', label: 'पाक्षिक' },
    { value: 'monthly', label: 'मासिक' },
    { value: 'other', label: 'अन्य' }
  ];

  const timeOfDayOptions = [
    { value: 'morning', label: 'प्रातः कालीन' },
    { value: 'evening', label: 'सांध्य कालीन' }
  ];

  const upDistricts = [
    'आगरा', 'अलीगढ़', 'अम्बेडकर नगर', 'अमेठी', 'अमरोहा', 'औरैया', 'आजमगढ़', 'बदायूं', 'बागपत', 'बहराइच', 'बलिया', 'बलरामपुर', 'बांदा', 'बाराबंकी', 'बरेली', 'बस्ती', 'भदोही', 'बिजनौर', 'बुलंदशहर', 'चंदौली', 'चित्रकूट', 'देवरिया', 'एटा', 'एटावह', 'फैजाबाद', 'फर्रुखाबाद', 'फतेहपुर', 'फिरोजाबाद', 'गौतम बुद्ध नगर', 'गाजियाबाद', 'गाजीपुर', 'गोंडा', 'गोरखपुर', 'हमीरपुर', 'हापुड़', 'हरदोई', 'हाथरस', 'जालौन', 'जौनपुर', 'झांसी', 'कन्नौज', 'कानपुर देहात', 'कानपुर नगर', 'कासगंज', 'कौशाम्बी', 'खेरी', 'कुशीनगर', 'ललितपुर', 'लखनऊ', 'महराजगंज', 'महोबा', 'मैनपुरी', 'मथुरा', 'मऊ', 'मेरठ', 'मिर्जापुर', 'मुरादाबाद', 'मुजफ्फरनगर', 'पीलीभीत', 'प्रतापगढ़', 'प्रयागराज', 'रायबरेली', 'रामपुर', 'सहारनपुर', 'संभल', 'संत कबीर नगर', 'शाहजहांपुर', 'शामली', 'श्रावस्ती', 'सिद्धार्थनगर', 'सीतापुर', 'सोनभद्र', 'सुल्तानपुर', 'उन्नाव', 'वाराणसी', 'यमुनानगर'
  ];

  const circulationAreas = [
    { value: 'district', label: 'जिला' },
    { value: 'division', label: 'मण्डल' },
    { value: 'state', label: 'राज्य' },
    { value: 'national', label: 'राष्ट्रीय' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLanguageChange = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleDistrictChange = (district: string) => {
    setFormData(prev => ({
      ...prev,
      districts: prev.districts.includes(district)
        ? prev.districts.filter(d => d !== district)
        : [...prev.districts, district]
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.mediaCategory) newErrors.mediaCategory = 'मीडिया श्रेणी चुनना आवश्यक है';
    if (!formData.mediaName.trim()) newErrors.mediaName = 'मीडिया का नाम आवश्यक है';
    if (!formData.mediaTitle.trim()) newErrors.mediaTitle = 'माध्यम का शीर्षक आवश्यक है';
    if (formData.languages.length === 0) newErrors.languages = 'कम से कम एक भाषा चुनना आवश्यक है';
    if (formData.mediaCategory === 'newspaper' && !formData.frequency) newErrors.frequency = 'प्रकाशन आवृत्ति चुनना आवश्यक है';
    if (formData.mediaCategory === 'newspaper' && formData.frequency === 'daily' && !formData.timeOfDay) newErrors.timeOfDay = 'समय चुनना आवश्यक है';
    if (!formData.startDate) newErrors.startDate = 'प्रारम्भ तिथि आवश्यक है';
    if (!formData.officeAddress.trim()) newErrors.officeAddress = 'कार्यालय का पता आवश्यक है';
    if (formData.districts.length === 0) newErrors.districts = 'कम से कम एक जिला चुनना आवश्यक है';
    if (!formData.email.trim()) newErrors.email = 'ईमेल आवश्यक है';
    if (!formData.mobile.trim()) newErrors.mobile = 'मोबाइल नंबर आवश्यक है';
    if (!formData.circulationArea) newErrors.circulationArea = 'प्रसार क्षेत्र चुनना आवश्यक है';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'वैध ईमेल पता दर्ज करें';
    }

    // Mobile validation
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'वैध 10 अंकों का मोबाइल नंबर दर्ज करें';
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

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">मीडिया श्रेणी व आधारभूत जानकारी</h2>
            <p className="text-gray-600">Media Type & Basic Information</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Media Category */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            1. मीडिया श्रेणी चुनें <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {mediaCategories.map((category) => (
              <label key={category.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="mediaCategory"
                  value={category.value}
                  checked={formData.mediaCategory === category.value}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="text-gray-800 font-medium">{category.label}</span>
              </label>
            ))}
          </div>
          {errors.mediaCategory && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.mediaCategory}
            </p>
          )}
        </div>

        {/* Media Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            2. समाचार पत्र/समाचार चैनल/डिजिटल समाचार पोर्टल का नाम <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">(घोषणा पत्र के अनुसार)</p>
          <input
            type="text"
            name="mediaName"
            value={formData.mediaName}
            onChange={handleInputChange}
            placeholder="मीडिया का नाम दर्ज करें"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.mediaName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.mediaName && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.mediaName}
            </p>
          )}
        </div>

        {/* Media Title */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            3. माध्यम का शीर्षक <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">(जैसा RNI/डोमेन/लाइसेंस में है)</p>
          <input
            type="text"
            name="mediaTitle"
            value={formData.mediaTitle}
            onChange={handleInputChange}
            placeholder="माध्यम का शीर्षक दर्ज करें"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.mediaTitle ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.mediaTitle && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.mediaTitle}
            </p>
          )}
        </div>

        {/* Languages */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            4. भाषा <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {languages.map((language) => (
              <label key={language} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.languages.includes(language)}
                  onChange={() => handleLanguageChange(language)}
                  className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-800">{language}</span>
              </label>
            ))}
          </div>
          {errors.languages && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.languages}
            </p>
          )}
        </div>

        {/* Frequency (only for newspaper) */}
        {formData.mediaCategory === 'newspaper' && (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              प्रकाशन आवृत्ति <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {frequencies.map((freq) => (
                <label key={freq.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value={freq.value}
                    checked={formData.frequency === freq.value}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="text-gray-800">{freq.label}</span>
                </label>
              ))}
            </div>
            {errors.frequency && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.frequency}
              </p>
            )}
          </div>
        )}

        {/* Time of Day (only for daily newspaper) */}
        {formData.mediaCategory === 'newspaper' && formData.frequency === 'daily' && (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              प्रकाशन समय <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {timeOfDayOptions.map((time) => (
                <label key={time.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="timeOfDay"
                    value={time.value}
                    checked={formData.timeOfDay === time.value}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="text-gray-800">{time.label}</span>
                </label>
              ))}
            </div>
            {errors.timeOfDay && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.timeOfDay}
              </p>
            )}
          </div>
        )}

        {/* Start Date */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            5. प्रकाशन/प्रसारण प्रारम्भ तिथि <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.startDate}
            </p>
          )}
        </div>

        {/* Office Address */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            6. मुख्य कार्यालय का पता <span className="text-red-500">*</span>
          </label>
          <textarea
            name="officeAddress"
            value={formData.officeAddress}
            onChange={handleInputChange}
            rows={4}
            placeholder="मुख्य कार्यालय का पूरा पता दर्ज करें"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.officeAddress ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.officeAddress && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.officeAddress}
            </p>
          )}
        </div>

        {/* Districts */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            7. जिला/क्षेत्र <span className="text-red-500">*</span>
          </label>
          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {upDistricts.map((district) => (
                <label key={district} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.districts.includes(district)}
                    onChange={() => handleDistrictChange(district)}
                    className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-800">{district}</span>
                </label>
              ))}
            </div>
          </div>
          {errors.districts && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.districts}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            8. संपर्क ई-मेल <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="संपर्क ईमेल पता दर्ज करें"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            9. मोबाइल नंबर <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="मोबाइल नंबर दर्ज करें"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.mobile ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.mobile && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.mobile}
            </p>
          )}
        </div>

        {/* Circulation Area */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            10. प्रसार क्षेत्र <span className="text-red-500">*</span>
          </label>
          <select
            name="circulationArea"
            value={formData.circulationArea}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.circulationArea ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">प्रसार क्षेत्र चुनें</option>
            {circulationAreas.map((area) => (
              <option key={area.value} value={area.value}>
                {area.label}
              </option>
            ))}
          </select>
          {errors.circulationArea && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.circulationArea}
            </p>
          )}
        </div>

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

export default MediaBasicInfoForm;