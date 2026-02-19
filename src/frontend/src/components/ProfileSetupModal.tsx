import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();
  
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [bust, setBust] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identity || !name || !city || !bust || !waist || !hip) {
      toast.error('Please fill in all required fields');
      return;
    }

    setUploading(true);
    try {
      let profilePhoto: ExternalBlob | undefined;
      
      if (photoFile) {
        const arrayBuffer = await photoFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        profilePhoto = ExternalBlob.fromBytes(uint8Array);
      }

      await saveProfile.mutateAsync({
        principal: identity.getPrincipal(),
        name,
        city,
        measurements: {
          bust: BigInt(bust),
          waist: BigInt(waist),
          hip: BigInt(hip),
        },
        profilePhoto,
        trustScore: 5.0,
        depositBalance: BigInt(0),
        earnings: BigInt(0),
      });

      toast.success('Profile created successfully!');
    } catch (error) {
      console.error('Profile setup error:', error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Welcome to ShareDrape!</DialogTitle>
          <DialogDescription>
            Let's set up your profile to get started with luxury fashion sharing.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., Mumbai, Delhi"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="bust">Bust (cm) *</Label>
              <Input
                id="bust"
                type="number"
                value={bust}
                onChange={(e) => setBust(e.target.value)}
                placeholder="85"
                required
              />
            </div>
            <div>
              <Label htmlFor="waist">Waist (cm) *</Label>
              <Input
                id="waist"
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="65"
                required
              />
            </div>
            <div>
              <Label htmlFor="hip">Hip (cm) *</Label>
              <Input
                id="hip"
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                placeholder="90"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="photo">Profile Photo (Optional)</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-rosePink hover:bg-rosePink/90"
            disabled={uploading}
          >
            {uploading ? 'Creating Profile...' : 'Complete Setup'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
