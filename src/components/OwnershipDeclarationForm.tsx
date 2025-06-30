import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Shield, AlertCircle, Plus, X, FileText, CheckCircle } from 'lucide-react';

interface OwnershipDeclarationFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

interface Owner {
  id: string;
  name: string;
  position: string;
  sharePercentage: number;
  pan: string;
  aadhar: string;
}

interface FormData {
  owners: Owner[];
  criminalDispute: boolean;
  criminalDisputeDetails: string;
  financialDispute: boolean;
  financialDisputeDetails: string;
  declarationAccepted: boolean;
  affidavitFile?: File;
  affidavitText: string;
}

const OwnershipDeclarationForm: React.FC<OwnershipDeclarationFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    owners: [{ id: '1', name: '', position: '', sharePercentage: 0, pan: '', aadhar: '' }],
    criminalDispute: false,
    criminalDisputeDetails: '',
    financialDispute: false,
    financialDisputeDetails: '',
    declarationAccepted: false,
    affidavitText: ''
  });
  const [errors, setErrors] = useState<any>({});

  const positions = [
    { value: 'owner', label: 'स्वामी' },
    { value: 'publisher', label: 'प्रकाशक' },
    { value: 'editor', label: 'संपादक' },
    { value: 'managing_director', label: 'प्रबंध निदेशक' },
    { value: 'director', label: 'निदेशक' },
    { value: 'partner', label: 'साझेदार' },
    { value: 'other', label: 'अन्य' }
  ];

  const addOwner = () => {
    const newOwner: Owner = {
      id: Date.now().toString(),
      name: '',
      position: '',
      sharePercentage: 0,
      pan: '',
      aadhar: ''
    };
    setFormData(prev => ({
      ...prev,
      owners: [...prev.owners, newOwner]
    }));
  };

  const removeOwner = (id: string) => {
    if (formData.owners.length > 1) {
      setFormData(prev => ({
        ...prev,
        owners: prev.owners.filter(owner => owner.id !== id)
      }));
    }
  };

  const updateOwner = (id: string, field: keyof Owner, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      owners: prev.owners.map(owner =>
        owner.id === id ? { ...owner, [field]: value } : owner
      )
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setErrors(prev => ({ ...prev, affidavitFile: 'फाइल का साइज 1MB से कम होना चाहिए' }));
        return;
      }
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, affidavitFile: 'केवल PDF फाइल अपलोड करें' }));
        return;
      }
      setFormData(prev => ({ ...prev, affidavitFile: file }));
      setErrors(prev => ({ ...prev, affidavitFile: undefined }));
    }
  };

  const maskAadhar = (aadhar: string) => {
    if (aadhar.length >= 8) {
      return aadhar.substring(0, 4) + 'XXXX' + aadhar.substring(8);
    }
    return aadhar;
  };

  const maskPan = (pan: string) => {
    if (pan.length >= 6) {
      return pan.substring(0, 3) + 'XXX' + pan.substring(6);
    }
    return pan;
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Validate owners
    formData.owners.forEach((owner, index) => {
      if (!owner.name.trim()) {
        newErrors[`owner_${index}_name`] = 'नाम आवश्यक है';
      }
      if (!owner.position) {
        newErrors[`owner_${index}_position`] = 'पद चुनना आवश्यक है';
      }
      if (owner.sharePercentage <= 0 || owner.sharePercentage > 100) {
        newErrors[`owner_${index}_share`] = 'वैध हिस्सेदारी प्रतिशत दर्ज करें (1-100)';
      }
      if (!owner.pan.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(owner.pan)) {
        newErrors[`owner_${index}_pan`] = 'वैध PAN नंबर दर्ज करें';
      }
      if (!owner.aadhar.trim() || !/^\d{12}$/.test(owner.aadhar)) {
        newErrors[`owner_${index}_aadhar`] = 'वैध आधार नंबर दर्ज करें';
      }
    });

    // Check total share percentage
    const totalShare = formData.owners.reduce((sum, owner) => sum + owner.sharePercentage, 0);
    if (Math.abs(totalShare - 100) > 0.01) {
      newErrors.totalShare = 'कुल हिस्सेदारी 100% होनी चाहिए';
    }

    // Validate disputes
    if (formData.criminalDispute && !formData.criminalDisputeDetails.trim()) {
      newErrors.criminalDisputeDetails = 'आपराधिक विवाद का विवरण आवश्यक है';
    }
    if (formData.financialDispute && !formData.financialDisputeDetails.trim()) {
      newErrors.financialDisputeDetails = 'वित्तीय विवाद का विवरण आवश्यक है';
    }

    // Validate declaration
    if (!formData.declarationAccepted) {
      newErrors.declarationAccepted = 'घोषणा स्वीकार करना आवश्यक है';
    }

    // Validate affidavit (either file or text required)
    if (!formData.affidavitFile && !formData.affidavitText.trim()) {
      newErrors.affidavit = 'शपथ पत्र फाइल अपलोड करें या टेक्स्ट में लिखें';
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

  const totalSharePercentage = formData.owners.reduce((sum, owner) => sum + owner.sharePercentage, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <Shield className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">स्वामित्व, घोषणा व सत्यापन</h2>
            <p className="text-gray-600">Ownership, Declarations & Verification</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Owners Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">स्वामी/प्रकाशक/संपादक विवरण</h3>
            <button
              type="button"
              onClick={addOwner}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>नया जोड़ें</span>
            </button>
          </div>

          <div className="space-y-6">
            {formData.owners.map((owner, index) => (
              <div key={owner.id} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">व्यक्ति {index + 1}</h4>
                  {formData.owners.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOwner(owner.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      नाम <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={owner.name}
                      onChange={(e) => updateOwner(owner.id, 'name', e.target.value)}
                      placeholder="पूरा नाम दर्ज करें"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors[`owner_${index}_name`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`owner_${index}_name`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`owner_${index}_name`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      पद <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={owner.position}
                      onChange={(e) => updateOwner(owner.id, 'position', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors[`owner_${index}_position`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">पद चुनें</option>
                      {positions.map((pos) => (
                        <option key={pos.value} value={pos.value}>
                          {pos.label}
                        </option>
                      ))}
                    </select>
                    {errors[`owner_${index}_position`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`owner_${index}_position`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      हिस्सेदारी (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={owner.sharePercentage}
                      onChange={(e) => updateOwner(owner.id, 'sharePercentage', parseFloat(e.target.value) || 0)}
                      placeholder="हिस्सेदारी प्रतिशत"
                      min="0"
                      max="100"
                      step="0.01"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors[`owner_${index}_share`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`owner_${index}_share`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`owner_${index}_share`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN नंबर <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={owner.pan}
                      onChange={(e) => updateOwner(owner.id, 'pan', e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors[`owner_${index}_pan`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`owner_${index}_pan`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`owner_${index}_pan`]}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      आधार नंबर <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={owner.aadhar}
                      onChange={(e) => updateOwner(owner.id, 'aadhar', e.target.value.replace(/\D/g, ''))}
                      placeholder="123456789012"
                      maxLength={12}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors[`owner_${index}_aadhar`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`owner_${index}_aadhar`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`owner_${index}_aadhar`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Share Percentage */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-900">कुल हिस्सेदारी:</span>
              <span className={`font-bold text-lg ${
                Math.abs(totalSharePercentage - 100) < 0.01 ? 'text-green-600' : 'text-red-600'
              }`}>
                {totalSharePercentage.toFixed(2)}%
              </span>
            </div>
            {errors.totalShare && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.totalShare}
              </p>
            )}
          </div>
        </div>

        {/* Criminal Dispute Declaration */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">आपराधिक विवाद की घोषणा</h3>
          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="criminalDispute"
                checked={formData.criminalDispute}
                onChange={handleInputChange}
                className="mt-1 h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <div>
                <p className="font-medium text-gray-900">
                  क्या आप या आपकी संस्था के विरुद्ध कोई आपराधिक मामला लंबित है?
                </p>
                <p className="text-sm text-gray-600">
                  यदि हाँ, तो कृपया विवरण दें
                </p>
              </div>
            </label>

            {formData.criminalDispute && (
              <div>
                <textarea
                  name="criminalDisputeDetails"
                  value={formData.criminalDisputeDetails}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="आपराधिक मामले का विस्तृत विवरण दें..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.criminalDisputeDetails ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.criminalDisputeDetails && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.criminalDisputeDetails}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Financial Dispute Declaration */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">वित्तीय विवाद की घोषणा</h3>
          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="financialDispute"
                checked={formData.financialDispute}
                onChange={handleInputChange}
                className="mt-1 h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <div>
                <p className="font-medium text-gray-900">
                  क्या आप या आपकी संस्था के विरुद्ध कोई वित्तीय विवाद लंबित है?
                </p>
                <p className="text-sm text-gray-600">
                  यदि हाँ, तो कृपया विवरण दें
                </p>
              </div>
            </label>

            {formData.financialDispute && (
              <div>
                <textarea
                  name="financialDisputeDetails"
                  value={formData.financialDisputeDetails}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="वित्तीय विवाद का विस्तृत विवरण दें..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.financialDisputeDetails ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.financialDisputeDetails && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.financialDisputeDetails}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Affidavit Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">शपथ पत्र</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शपथ पत्र अपलोड करें (PDF)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="affidavit-file"
                />
                <label
                  htmlFor="affidavit-file"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                >
                  <FileText className="h-4 w-4" />
                  <span>फाइल चुनें</span>
                </label>
                {formData.affidavitFile && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">{formData.affidavitFile.name}</span>
                  </div>
                )}
              </div>
              {errors.affidavitFile && (
                <p className="mt-2 text-sm text-red-600">{errors.affidavitFile}</p>
              )}
            </div>

            <div className="text-center text-gray-500 font-medium">या</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शपथ पत्र का टेक्स्ट यहाँ लिखें
              </label>
              <textarea
                name="affidavitText"
                value={formData.affidavitText}
                onChange={handleInputChange}
                rows={6}
                placeholder="मैं, [नाम], शपथ लेकर कहता/कहती हूँ कि..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {errors.affidavit && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.affidavit}
              </p>
            )}
          </div>
        </div>

        {/* Final Declaration */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-4">अंतिम घोषणा</h3>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="declarationAccepted"
              checked={formData.declarationAccepted}
              onChange={handleInputChange}
              className="mt-1 h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <p className="font-medium text-yellow-900 mb-2">
                मैं घोषणा करता/करती हूँ कि:
              </p>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>दी गई सभी जानकारी सत्य और सही है</li>
                <li>सभी दस्तावेज़ प्रामाणिक हैं</li>
                <li>मैं सभी नियमों और शर्तों से सहमत हूँ</li>
                <li>गलत जानकारी देने पर कानूनी कार्रवाई का जिम्मेदार हूँ</li>
              </ul>
            </div>
          </label>
          {errors.declarationAccepted && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.declarationAccepted}
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
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
          >
            <span>सबमिट करें</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnershipDeclarationForm;