import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Step1PhotoUpload from '../components/group-creation/Step1PhotoUpload';
import Step2DressDetails from '../components/group-creation/Step2DressDetails';
import Step3AuthenticityProof from '../components/group-creation/Step3AuthenticityProof';
import Step4GroupConfig from '../components/group-creation/Step4GroupConfig';
import Step5SlotPricing from '../components/group-creation/Step5SlotPricing';
import Step6Preview from '../components/group-creation/Step6Preview';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function CreateGroupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-4">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-2">Create a Group</h1>
        <p className="text-lg text-charcoal/70">Step {currentStep} of {totalSteps}</p>
        <Progress value={progress} className="mt-4" />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        {currentStep === 1 && (
          <Step1PhotoUpload
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
          />
        )}
        {currentStep === 2 && (
          <Step2DressDetails
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        {currentStep === 3 && (
          <Step3AuthenticityProof
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        {currentStep === 4 && (
          <Step4GroupConfig
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        {currentStep === 5 && (
          <Step5SlotPricing
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        {currentStep === 6 && (
          <Step6Preview
            data={formData}
            onBack={goToPreviousStep}
          />
        )}
      </div>
    </div>
  );
}
