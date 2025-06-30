import React, { useState } from 'react';
import { FileText, Download, CheckCircle, ArrowRight, User, Upload, Shield, AlertCircle, Clock } from 'lucide-react';
import type { User as UserType } from '../types';
import MediaBasicInfoForm from './MediaBasicInfoForm';
import RegistrationSidebar from './RegistrationSidebar';
import MediaProfileForm from './MediaProfileForm';
import DocumentUploadForm from './DocumentUploadForm';
import OwnershipDeclarationForm from './OwnershipDeclarationForm';

interface PanjikaranProps {
  user: UserType;
  onProceedToForm: () => void;
}

type StepStatus = 'pending' | 'incomplete' | 'complete';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  status: StepStatus;
}

const Panjikaran: React.FC<PanjikaranProps> = ({ user, onProceedToForm }) => {
  const [hasReadAndAgreed, setHasReadAndAgreed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'मीडिया श्रेणी व आधारभूत जानकारी',
      subtitle: 'Media Type & Basic Info',
      status: 'pending'
    },
    {
      id: 2,
      title: 'मीडिया प्रोफ़ाइल',
      subtitle: 'Media-specific Profile',
      status: 'pending'
    },
    {
      id: 3,
      title: 'दस्तावेज़ अपलोड',
      subtitle: 'Upload Documents',
      status: 'pending'
    },
    {
      id: 4,
      title: 'स्वामित्व, घोषणा व सत्यापन',
      subtitle: 'Ownership & Declarations',
      status: 'pending'
    }
  ]);

  const documents = [
    'घोषणा पत्र की प्रति',
    'R.N.I की प्रति',
    'D.A.V.P. की प्रति',
    'निजी प्रेस के स्वामित्व की प्रति',
    'जिला उद्योग केंद्र के रजिस्ट्रेशन का प्रमाण पत्र',
    'प्रेस का एग्रीमेंट',
    'सी. ए. सर्टिफिकेट',
    'आधार कार्ड की प्रति',
    'पैन कार्ड की प्रति'
  ];

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'incomplete':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: StepStatus) => {
    switch (status) {
      case 'complete':
        return 'पूर्ण';
      case 'incomplete':
        return 'अधूरा';
      case 'pending':
        return 'लंबित';
    }
  };

  const getStatusColor = (status: StepStatus) => {
    switch (status) {
      case 'complete':
        return 'text-green-700 bg-gradient-to-r from-green-50 to-green-100 border-green-300';
      case 'incomplete':
        return 'text-orange-700 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300';
      case 'pending':
        return 'text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
    }
  };

  const handleStepClick = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return;

    // Check if user can access this step
    if (stepId > 1) {
      const previousStep = steps.find(s => s.id === stepId - 1);
      if (previousStep && previousStep.status !== 'complete') {
        alert('कृपया पहले पिछले चरण को पूरा करें।');
        return;
      }
    }

    setCurrentStep(stepId);
  };

  const handleProceed = () => {
    if (!hasReadAndAgreed) {
      alert('कृपया पुष्टि करें कि आपने सभी आवश्यकताओं को पढ़ लिया है।');
      return;
    }

    setShowForm(true);
  };

  const handleFormNext = (data: any) => {
    setFormData(prev => ({ ...prev, [`step${currentStep}`]: data }));
    
    // Mark current step as complete and move to next step
    setSteps(prev => prev.map(step => 
      step.id === currentStep ? { ...step, status: 'complete' } : step
    ));
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission
      console.log('Final form data:', { ...formData, [`step${currentStep}`]: data });
      alert('पंजीकरण सफलतापूर्वक सबमिट हो गया!');
      onProceedToForm();
    }
  };

  const handleFormBack = () => {
    setShowForm(false);
  };

  // If showing form, render the form component
  if (showForm) {
    return (
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: 'url(https://sabrangindia.in//sites/default/files/up_vidhan_sabha.gif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        
        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://upidadv.up.gov.in/UserAssets/loginassets/img/logo.jpg"
                    alt="सूचना विभाग लोगो"
                    className="h-10 w-auto"
                  />
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">सूचना विभाग पोर्टल</h1>
                    <p className="text-sm text-gray-500">समाचार एजेंसी पंजीकरण</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">समाचार एजेंसी</p>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <RegistrationSidebar 
                steps={steps}
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                {currentStep === 1 && (
                  <MediaBasicInfoForm onNext={handleFormNext} onBack={handleFormBack} />
                )}
                {currentStep === 2 && (
                  <MediaProfileForm 
                    onNext={handleFormNext} 
                    onBack={handleFormBack}
                    mediaCategory={formData.step1?.mediaCategory || 'newspaper'}
                  />
                )}
                {currentStep === 3 && (
                  <DocumentUploadForm 
                    onNext={handleFormNext} 
                    onBack={handleFormBack}
                    mediaCategory={formData.step1?.mediaCategory || 'newspaper'}
                  />
                )}
                {currentStep === 4 && (
                  <OwnershipDeclarationForm 
                    onNext={handleFormNext} 
                    onBack={handleFormBack}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(https://sabrangindia.in//sites/default/files/up_vidhan_sabha.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="https://upidadv.up.gov.in/UserAssets/loginassets/img/logo.jpg"
                alt="सूचना विभाग लोगो"
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">सूचना विभाग पोर्टल</h1>
                <p className="text-sm text-gray-500">समाचार एजेंसी पंजीकरण</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">समाचार एजेंसी</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <RegistrationSidebar 
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              
              {/* Step Header */}
              <div className="border-b border-gray-200 px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FileText className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">आवश्यक दस्तावेज</h2>
                    <p className="text-gray-600">Documents required to be kept before applying</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    फॉर्म भरने से पहले, निम्नलिखित संलग्नक की सॉफ्टकॉपी इकट्ठा करें:
                  </h3>
                  
                  {/* Document List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {documents.map((document, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-100">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-800 font-medium text-sm">{document}</span>
                      </div>
                    ))}
                  </div>

                  {/* CA Certificate Download */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <p className="text-gray-800 font-medium mb-3">
                      सी. ए. सर्टिफिकेट का प्रारूप डाउनलोड करने के लिए यहां क्लिक करें:
                    </p>
                    <a
                      href="https://upidadv.up.gov.in/Docs/CA-declaration-letter.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                    >
                      <Download className="h-4 w-4" />
                      <span>CA सर्टिफिकेट प्रारूप डाउनलोड करें</span>
                    </a>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                  <h4 className="text-lg font-semibold text-red-900 mb-4">नोट:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">➔</span>
                      <p className="text-red-800">
                        सभी संलग्नक की सॉफ्टकॉपी <strong>.pdf format</strong> में होनी चाहिए, और साइज <strong>1MB से कम</strong> होनी चाहिए।
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">➔</span>
                      <p className="text-red-800">
                        सभी संलग्नको की कॉपी <strong>स्वप्रमाणित व स्वच्छप्रतियो</strong> में होनी चाहिए।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <label className="flex items-start space-x-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasReadAndAgreed}
                      onChange={(e) => setHasReadAndAgreed(e.target.checked)}
                      className="mt-1 h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">
                        मैं पुष्टि करता/करती हूं कि मैंने उपरोक्त सभी आवश्यकताओं को पढ़ लिया है और मेरे पास सभी आवश्यक दस्तावेज उपलब्ध हैं।
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        I confirm that I have read all the above requirements and have all the necessary documents available.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    onClick={handleProceed}
                    disabled={!hasReadAndAgreed}
                    className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      hasReadAndAgreed
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transform hover:scale-105 shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <span>अगले चरण पर जाएं</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  
                  {!hasReadAndAgreed && (
                    <p className="text-sm text-gray-500 mt-3">
                      कृपया पुष्टि करें कि आपने सभी आवश्यकताओं को पढ़ लिया है
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Panjikaran;