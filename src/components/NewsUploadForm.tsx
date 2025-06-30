import React, { useState, useRef } from 'react';
import { Upload, FileText, Calendar, Hash, Users, Globe, CheckCircle, AlertCircle, X, Eye, Download } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  pages?: number;
}

interface FormData {
  publicationDate: string;
  editions: string[];
  issueNumber: string;
  totalPages: number;
  printedCopies: number;
  pdfFile?: UploadedFile;
  govtAdPages: number[];
  tearSheets: UploadedFile[];
  ePaperUrl: string;
  declaration: boolean;
}

const NewsUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    publicationDate: new Date().toISOString().split('T')[0],
    editions: [''],
    issueNumber: '',
    totalPages: 0,
    printedCopies: 0,
    govtAdPages: [],
    tearSheets: [],
    ePaperUrl: '',
    declaration: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [showDeclaration, setShowDeclaration] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tearSheetInputRef = useRef<HTMLInputElement>(null);

  const editionOptions = [
    'लखनऊ संस्करण',
    'कानपुर संस्करण',
    'आगरा संस्करण',
    'मेरठ संस्करण',
    'वाराणसी संस्करण',
    'गोरखपुर संस्करण',
    'बरेली संस्करण',
    'अलीगढ़ संस्करण',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value
    }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEditionChange = (index: number, value: string) => {
    const newEditions = [...formData.editions];
    newEditions[index] = value;
    setFormData(prev => ({ ...prev, editions: newEditions }));
  };

  const addEdition = () => {
    setFormData(prev => ({
      ...prev,
      editions: [...prev.editions, '']
    }));
  };

  const removeEdition = (index: number) => {
    if (formData.editions.length > 1) {
      const newEditions = formData.editions.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, editions: newEditions }));
    }
  };

  const handleFileUpload = (file: File, type: 'pdf' | 'tearsheet') => {
    if (type === 'pdf') {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        setErrors(prev => ({ ...prev, pdfFile: 'फाइल का साइज 100MB से कम होना चाहिए' }));
        return;
      }
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, pdfFile: 'केवल PDF फाइल अपलोड करें' }));
        return;
      }

      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        pages: Math.floor(Math.random() * 20) + 4 // Mock page count
      };

      setFormData(prev => ({ 
        ...prev, 
        pdfFile: uploadedFile,
        totalPages: uploadedFile.pages || 0
      }));
      setErrors(prev => ({ ...prev, pdfFile: undefined }));
    } else {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit for tear sheets
        setErrors(prev => ({ ...prev, tearSheets: 'प्रत्येक फाइल का साइज 10MB से कम होना चाहिए' }));
        return;
      }

      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        file
      };

      setFormData(prev => ({
        ...prev,
        tearSheets: [...prev.tearSheets, uploadedFile]
      }));
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'pdf' | 'tearsheet') => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      if (type === 'pdf') {
        handleFileUpload(files[0], type);
      } else {
        files.forEach(file => handleFileUpload(file, type));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(type);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const removeTearSheet = (id: string) => {
    setFormData(prev => ({
      ...prev,
      tearSheets: prev.tearSheets.filter(file => file.id !== id)
    }));
  };

  const handlePageSelection = (pageNum: number) => {
    const newPages = formData.govtAdPages.includes(pageNum)
      ? formData.govtAdPages.filter(p => p !== pageNum)
      : [...formData.govtAdPages, pageNum];
    
    setFormData(prev => ({ ...prev, govtAdPages: newPages }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.publicationDate) newErrors.publicationDate = 'प्रकाशन दिनांक आवश्यक है';
    if (formData.editions.some(e => !e.trim())) newErrors.editions = 'सभी एडिशन चुनना आवश्यक है';
    if (!formData.issueNumber.trim()) newErrors.issueNumber = 'अंक क्रमांक आवश्यक है';
    if (!formData.totalPages || formData.totalPages <= 0) newErrors.totalPages = 'कुल पृष्ठ संख्या आवश्यक है';
    if (!formData.pdfFile) newErrors.pdfFile = 'PDF फाइल अपलोड करना आवश्यक है';
    if (!formData.declaration) newErrors.declaration = 'घोषणा स्वीकार करना आवश्यक है';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
    alert('समाचार सफलतापूर्वक अपलोड हो गया!');
  };

  const declarationText = `मैं सत्यापित करता/करती हूं कि:

1. अपलोड की गई PDF फाइल मूल प्रकाशित अंक की सही प्रति है
2. सभी दी गई जानकारी सत्य और सही है
3. सरकारी विज्ञापन के पेज सही तरीके से चिह्नित किए गए हैं
4. टियर-शीट/विज्ञापन प्रूफ वास्तविक हैं
5. मैं इस जानकारी की सत्यता के लिए पूर्णतः जिम्मेदार हूं

गलत जानकारी देने पर कानूनी कार्रवाई का जिम्मेदार होऊंगा/होऊंगी।`;

  return (
    <div className="max-w-6xl mx-auto lg:p-6">
      <div className="bg-white lg:rounded-2xl lg:shadow-lg lg:border lg:border-gray-200 min-h-screen lg:min-h-0">
        {/* Header */}
        <div className="hidden lg:block bg-gradient-to-r from-orange-500 to-red-500 px-4 py-6 lg:border-b lg:border-gray-200 lg:px-8 lg:py-6 lg:bg-none lg:rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2.5 rounded-full lg:bg-orange-100 lg:bg-opacity-100 lg:p-3">
              <Upload className="h-6 w-6 text-white lg:h-8 lg:w-8 lg:text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white lg:text-2xl lg:text-gray-900">समाचार अंक अपलोड</h2>
              <p className="text-orange-100 text-sm lg:text-gray-600">Upload News Issue</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-6 lg:p-8">
          <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 lg:hidden">1</div>
                  अंक की बुनियादी जानकारी
                </h3>
                
                <div className="space-y-5">
                  {/* Publication Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      प्रकाशन दिनांक <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        name="publicationDate"
                        value={formData.publicationDate}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base font-medium ${
                          errors.publicationDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.publicationDate && (
                      <p className="mt-2 text-sm text-red-600">{errors.publicationDate}</p>
                    )}
                  </div>

                  {/* Editions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      एडिशन/प्रकाशन-स्थल <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      {formData.editions.map((edition, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <select
                            value={edition}
                            onChange={(e) => handleEditionChange(index, e.target.value)}
                            className="flex-1 px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base font-medium"
                          >
                            <option value="">एडिशन चुनें</option>
                            {editionOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          {formData.editions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEdition(index)}
                              className="p-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-xl transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addEdition}
                        className="text-orange-600 hover:text-orange-700 font-semibold text-sm py-2"
                      >
                        + दूसरा एडिशन जोड़ें
                      </button>
                    </div>
                    {errors.editions && (
                      <p className="mt-2 text-sm text-red-600">{errors.editions}</p>
                    )}
                  </div>

                  {/* Issue Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      अंक क्रमांक / वॉल्यूम-इश्यू <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="issueNumber"
                        value={formData.issueNumber}
                        onChange={handleInputChange}
                        placeholder="जैसे: Vol.15, Issue 234"
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base font-medium ${
                          errors.issueNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.issueNumber && (
                      <p className="mt-2 text-sm text-red-600">{errors.issueNumber}</p>
                    )}
                  </div>

                  {/* Total Pages */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      कुल पृष्ठ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalPages"
                      value={formData.totalPages}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="कुल पेज संख्या"
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base font-medium ${
                        errors.totalPages ? 'border-red-500' : 'border-gray-300'
                      }`}
                      readOnly={!!formData.pdfFile}
                    />
                    {formData.pdfFile && (
                      <p className="mt-2 text-sm text-green-600 font-medium">PDF से ऑटो-डिटेक्ट: {formData.totalPages} पेज</p>
                    )}
                    {errors.totalPages && (
                      <p className="mt-2 text-sm text-red-600">{errors.totalPages}</p>
                    )}
                  </div>

                  {/* Printed Copies */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      मुद्रित प्रतियाँ (प्रेस-रन)
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="number"
                        name="printedCopies"
                        value={formData.printedCopies}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="मुद्रित प्रतियों की संख्या"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base font-medium"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">वैकल्पिक - मासिक CA रिटर्न में आवश्यक</p>
                  </div>

                  {/* E-Paper URL */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      e-Paper URL (यदि उपलब्ध)
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="url"
                        name="ePaperUrl"
                        value={formData.ePaperUrl}
                        onChange={handleInputChange}
                        placeholder="https://epaper.example.com"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-6">
              <div className="bg-blue-50 lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 lg:hidden">2</div>
                  फ़ाइल अपलोड
                </h3>
                
                <div className="space-y-6">
                  {/* PDF Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      पूर्ण PDF अंक <span className="text-red-500">*</span>
                    </label>
                    
                    {formData.pdfFile ? (
                      <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <div>
                            <p className="font-semibold text-green-900">{formData.pdfFile.name}</p>
                            <p className="text-sm text-green-700">
                              {formatFileSize(formData.pdfFile.size)} • {formData.pdfFile.pages} पेज
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, pdfFile: undefined, totalPages: 0 }))}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                          dragOver === 'pdf'
                            ? 'border-orange-400 bg-orange-50'
                            : errors.pdfFile
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300 hover:border-orange-300 hover:bg-orange-25'
                        }`}
                        onDrop={(e) => handleDrop(e, 'pdf')}
                        onDragOver={(e) => handleDragOver(e, 'pdf')}
                        onDragLeave={handleDragLeave}
                      >
                        <FileText className={`h-12 w-12 mx-auto mb-4 ${
                          errors.pdfFile ? 'text-red-400' : 'text-gray-400'
                        }`} />
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          PDF फाइल यहाँ ड्रैग करें या क्लिक करें
                        </p>
                        <p className="text-sm text-red-600 font-semibold mb-4">PDF, अधिकतम 100MB</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'pdf');
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-semibold"
                        >
                          <Upload className="h-5 w-5" />
                          <span>फाइल चुनें</span>
                        </button>
                      </div>
                    )}
                    
                    {errors.pdfFile && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.pdfFile}
                      </p>
                    )}
                  </div>

                  {/* Government Ad Pages Selection */}
                  {formData.pdfFile && formData.totalPages > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        सरकारी विज्ञापन वाले पेज (यदि कोई)
                      </label>
                      <div className="max-h-40 overflow-y-auto border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                        <div className="grid grid-cols-8 gap-2">
                          {Array.from({ length: formData.totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => handlePageSelection(pageNum)}
                              className={`p-2 text-sm font-semibold rounded-lg border-2 transition-all ${
                                formData.govtAdPages.includes(pageNum)
                                  ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>
                      </div>
                      {formData.govtAdPages.length > 0 && (
                        <p className="mt-3 text-sm text-green-600 font-semibold">
                          चयनित पेज: {formData.govtAdPages.sort((a, b) => a - b).join(', ')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Tear Sheets Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      टियर-शीट / विज्ञापन प्रूफ़
                    </label>
                    
                    <div
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                        dragOver === 'tearsheet'
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
                      }`}
                      onDrop={(e) => handleDrop(e, 'tearsheet')}
                      onDragOver={(e) => handleDragOver(e, 'tearsheet')}
                      onDragLeave={handleDragLeave}
                    >
                      <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                      <p className="text-base font-semibold text-gray-900 mb-2">
                        टियर-शीट फाइलें यहाँ ड्रैग करें
                      </p>
                      <p className="text-sm text-red-600 font-semibold mb-4">PDF, JPG, PNG • अधिकतम 10MB प्रति फाइल</p>
                      <input
                        ref={tearSheetInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach(file => handleFileUpload(file, 'tearsheet'));
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => tearSheetInputRef.current?.click()}
                        className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
                      >
                        <Upload className="h-4 w-4" />
                        <span>फाइल चुनें</span>
                      </button>
                    </div>

                    {/* Uploaded Tear Sheets */}
                    {formData.tearSheets.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {formData.tearSheets.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="font-semibold text-blue-900 text-sm">{file.name}</p>
                                <p className="text-xs text-blue-700">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeTearSheet(file.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-900 mb-4">स्व-घोषणा</h3>
            <label className="flex items-start space-x-4 cursor-pointer">
              <input
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleInputChange}
                className="mt-1 h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <div>
                <p className="font-semibold text-yellow-900 text-base">
                  मैं सत्यापित करता/करती हूं कि दी गई सभी जानकारी सत्य और सही है
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeclaration(true)}
                  className="text-sm text-yellow-700 hover:text-yellow-800 underline mt-2 font-semibold"
                >
                  पूरी घोषणा पढ़ें
                </button>
              </div>
            </label>
            {errors.declaration && (
              <p className="mt-3 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.declaration}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Upload className="h-6 w-6" />
              <span>समाचार अंक सबमिट करें</span>
            </button>
          </div>
        </form>
      </div>

      {/* Declaration Modal */}
      {showDeclaration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">स्व-घोषणा</h3>
                <button
                  onClick={() => setShowDeclaration(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {declarationText}
              </pre>
            </div>
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDeclaration(false)}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                समझ गया
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsUploadForm;