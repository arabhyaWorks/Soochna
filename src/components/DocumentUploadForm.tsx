import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';

interface DocumentUploadFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  mediaCategory: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

interface FormData {
  // Common documents
  panCard?: UploadedFile;
  aadharCard?: UploadedFile;
  diprDavpCode?: UploadedFile;
  
  // Media-specific documents
  rniCertificate?: UploadedFile;
  sixMonthIssues?: UploadedFile;
  circulationCertificate?: UploadedFile;
  ownershipProof?: UploadedFile;
  mibPermission?: UploadedFile;
  wpcLicense?: UploadedFile;
  carriageFeeReceipt?: UploadedFile;
  analyticsReport?: UploadedFile;
  domainWhois?: UploadedFile;
  gopaCopy?: UploadedFile;
  broadcastLog?: UploadedFile;
  socialAnalytics?: UploadedFile;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onNext, onBack, mediaCategory }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<any>({});
  const [dragOver, setDragOver] = useState<string | null>(null);

  const commonDocuments = [
    { key: 'panCard', label: 'पैन कार्ड (संस्था/स्वामी)', required: true },
    { key: 'aadharCard', label: 'आधार कार्ड (अधिकृत हस्ताक्षरकर्ता)', required: true },
    { key: 'diprDavpCode', label: 'पूर्व DIPR/DAVP कोड प्रमाण (यदि है)', required: false }
  ];

  const getMediaSpecificDocuments = () => {
    switch (mediaCategory) {
      case 'newspaper':
        return [
          { key: 'rniCertificate', label: 'RNI सर्टिफिकेट', required: true },
          { key: 'sixMonthIssues', label: '6 महीने के अंक (PDF बंडल)', required: true },
          { key: 'circulationCertificate', label: 'CA-सर्टिफाइड सर्कुलेशन', required: true },
          { key: 'ownershipProof', label: 'प्रेस स्वामित्व प्रमाण या प्रिंट-हायर एग्रीमेंट', required: true }
        ];
      case 'tv':
        return [
          { key: 'mibPermission', label: 'MIB परमिशन लेटर', required: true },
          { key: 'wpcLicense', label: 'WPC लाइसेंस', required: true },
          { key: 'carriageFeeReceipt', label: 'नवीनतम कैरिज-फीस चालान', required: true }
        ];
      case 'digital':
        return [
          { key: 'analyticsReport', label: '6-महीने Google Analytics रिपोर्ट', required: true },
          { key: 'domainWhois', label: 'डोमेन WHOIS PDF', required: true }
        ];
      case 'radio':
        return [
          { key: 'gopaCopy', label: 'GOPA कॉपी', required: true },
          { key: 'broadcastLog', label: 'वार्षिक प्रसारण-लॉग सारांश', required: true }
        ];
      case 'social':
        return [
          { key: 'socialAnalytics', label: '6-महीने यूट्यूब स्टूडियो/सोशल-एनालिटिक्स स्क्रीनशॉट PDF', required: true }
        ];
      default:
        return [];
    }
  };

  const allDocuments = [...commonDocuments, ...getMediaSpecificDocuments()];

  const handleFileUpload = (key: string, file: File) => {
    // Validate file
    if (file.size > 1024 * 1024) { // 1MB limit
      setErrors(prev => ({ ...prev, [key]: 'फाइल का साइज 1MB से कम होना चाहिए' }));
      return;
    }

    if (file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, [key]: 'केवल PDF फाइल अपलोड करें' }));
      return;
    }

    const uploadedFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    };

    setFormData(prev => ({ ...prev, [key]: uploadedFile }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleDrop = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(key, files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    setDragOver(key);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const removeFile = (key: string) => {
    setFormData(prev => ({ ...prev, [key]: undefined }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    const newErrors: any = {};

    allDocuments.forEach(doc => {
      if (doc.required && !formData[doc.key as keyof FormData]) {
        newErrors[doc.key] = `${doc.label} अपलोड करना आवश्यक है`;
      }
    });

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
            <Upload className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">दस्तावेज़ अपलोड</h2>
            <p className="text-gray-600">Upload Required Documents</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">अपलोड निर्देश:</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>सभी दस्तावेज़ <strong>PDF फॉर्मेट</strong> में होने चाहिए</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>फाइल का साइज़ <strong>1MB से कम</strong> होना चाहिए</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>सभी दस्तावेज़ <strong>स्वप्रमाणित</strong> होने चाहिए</span>
            </li>
          </ul>
        </div>

        {/* Common Documents */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">सामान्य दस्तावेज़</h3>
          <div className="space-y-6">
            {commonDocuments.map((doc) => (
              <div key={doc.key}>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  {doc.label} {doc.required && <span className="text-red-500">*</span>}
                </label>
                
                {formData[doc.key as keyof FormData] ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-medium text-green-900">{formData[doc.key as keyof FormData]?.name}</p>
                        <p className="text-sm text-green-700">
                          {formatFileSize(formData[doc.key as keyof FormData]?.size || 0)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(doc.key)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      dragOver === doc.key
                        ? 'border-orange-400 bg-orange-50'
                        : errors[doc.key]
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-orange-300 hover:bg-orange-25'
                    }`}
                    onDrop={(e) => handleDrop(e, doc.key)}
                    onDragOver={(e) => handleDragOver(e, doc.key)}
                    onDragLeave={handleDragLeave}
                  >
                    <FileText className={`h-12 w-12 mx-auto mb-4 ${
                      errors[doc.key] ? 'text-red-400' : 'text-gray-400'
                    }`} />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      फाइल यहाँ ड्रैग करें या क्लिक करें
                    </p>
                    <p className="text-sm text-gray-500 mb-4">PDF, अधिकतम 1MB</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(doc.key, file);
                      }}
                      className="hidden"
                      id={`file-${doc.key}`}
                    />
                    <label
                      htmlFor={`file-${doc.key}`}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 cursor-pointer transition-colors duration-200"
                    >
                      <Upload className="h-4 w-4" />
                      <span>फाइल चुनें</span>
                    </label>
                  </div>
                )}
                
                {errors[doc.key] && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors[doc.key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Media-specific Documents */}
        {getMediaSpecificDocuments().length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {mediaCategory === 'newspaper' && 'समाचार-पत्र विशिष्ट दस्तावेज़'}
              {mediaCategory === 'tv' && 'टीवी चैनल विशिष्ट दस्तावेज़'}
              {mediaCategory === 'digital' && 'डिजिटल पोर्टल विशिष्ट दस्तावेज़'}
              {mediaCategory === 'radio' && 'रेडियो विशिष्ट दस्तावेज़'}
              {mediaCategory === 'social' && 'सोशल मीडिया विशिष्ट दस्तावेज़'}
            </h3>
            <div className="space-y-6">
              {getMediaSpecificDocuments().map((doc) => (
                <div key={doc.key}>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    {doc.label} {doc.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {formData[doc.key as keyof FormData] ? (
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <div>
                          <p className="font-medium text-green-900">{formData[doc.key as keyof FormData]?.name}</p>
                          <p className="text-sm text-green-700">
                            {formatFileSize(formData[doc.key as keyof FormData]?.size || 0)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(doc.key)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                        dragOver === doc.key
                          ? 'border-orange-400 bg-orange-50'
                          : errors[doc.key]
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300 hover:border-orange-300 hover:bg-orange-25'
                      }`}
                      onDrop={(e) => handleDrop(e, doc.key)}
                      onDragOver={(e) => handleDragOver(e, doc.key)}
                      onDragLeave={handleDragLeave}
                    >
                      <FileText className={`h-12 w-12 mx-auto mb-4 ${
                        errors[doc.key] ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        फाइल यहाँ ड्रैग करें या क्लिक करें
                      </p>
                      <p className="text-sm text-gray-500 mb-4">PDF, अधिकतम 1MB</p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(doc.key, file);
                        }}
                        className="hidden"
                        id={`file-${doc.key}`}
                      />
                      <label
                        htmlFor={`file-${doc.key}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 cursor-pointer transition-colors duration-200"
                      >
                        <Upload className="h-4 w-4" />
                        <span>फाइल चुनें</span>
                      </label>
                    </div>
                  )}
                  
                  {errors[doc.key] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors[doc.key]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
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

export default DocumentUploadForm;