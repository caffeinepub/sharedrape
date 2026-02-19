import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface Step3Props {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3AuthenticityProof({ data, onUpdate, onNext, onBack }: Step3Props) {
  const [proofFile, setProofFile] = useState<File | null>(data.authenticityProof || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
    }
  };

  const handleNext = () => {
    if (!proofFile) {
      toast.error('Please upload authenticity proof');
      return;
    }
    onUpdate({ authenticityProof: proofFile });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-2">Authenticity Proof</h2>
        <p className="text-charcoal/70">Upload bill, receipt, or certificate of authenticity</p>
      </div>

      <div>
        <Label htmlFor="proof">Upload Proof *</Label>
        <div className="mt-2 border-2 border-dashed border-charcoal/20 rounded-lg p-8 text-center hover:border-rosePink transition-colors">
          <input
            id="proof"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="proof" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto text-charcoal/40 mb-4" />
            <p className="text-charcoal/70">Click to upload bill or receipt</p>
            <p className="text-sm text-charcoal/50 mt-2">PNG, JPG, PDF up to 10MB</p>
          </label>
        </div>
      </div>

      {proofFile && (
        <div className="relative p-4 bg-ivory rounded-lg flex items-center justify-between">
          <div>
            <p className="font-semibold">{proofFile.name}</p>
            <p className="text-sm text-charcoal/60">{(proofFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            onClick={() => setProofFile(null)}
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-rosePink hover:bg-rosePink/90">
          Continue
        </Button>
      </div>
    </div>
  );
}
