import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

type StepStatus = 'pending' | 'incomplete' | 'complete';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  status: StepStatus;
}

interface RegistrationSidebarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

const RegistrationSidebar: React.FC<RegistrationSidebarProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
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

  return (
    <div className="lg:col-span-1 lg:w-96">
      <div className="sticky top-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Sidebar Header */}
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-red-600 px-6 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-1">
              पंजीकरण स्थिति
            </h3>
            <p className="text-orange-100 text-sm font-bold">
              Registration Status
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-2">
          {steps.map((step, index) => (
            <div key={step.id}>
              <button
                onClick={() => onStepClick(step.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  currentStep === step.id
                    ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100 shadow-md ring-2 ring-orange-200'
                    : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-25'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shadow-sm ${
                        currentStep === step.id
                          ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white'
                          : step.status === 'complete'
                          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.id}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border-2 shadow-sm ${getStatusColor(
                      step.status
                    )}`}
                  >
                    {getStatusText(step.status)}
                  </span>
                </div>
                <h4
                  className={`font-semibold text-sm mb-1 leading-tight ${
                    currentStep === step.id
                      ? 'text-orange-900'
                      : 'text-gray-900'
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`text-xs font-bold ${
                    currentStep === step.id
                      ? 'text-orange-700'
                      : 'text-gray-500'
                  }`}
                >
                  {step.subtitle}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-4">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">त्वरित लिंक</h3>
          <p className="text-gray-600 text-sm font-bold">Quick Links</p>
        </div>
        <div className="p-5 space-y-2">
          <button className="w-full text-left p-4 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>बैंक विवरण</span>
            </div>
          </button>
          <button className="w-full text-left p-4 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>पंजीकृत ईमेल बदलें</span>
            </div>
          </button>
          <button className="w-full text-left p-4 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>पंजीकृत मोबाइल नंबर बदलें</span>
            </div>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default RegistrationSidebar;
