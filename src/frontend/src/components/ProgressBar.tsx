import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ value, max = 100, label, showPercentage = true }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-charcoal/70">{label}</span>}
          {showPercentage && <span className="font-semibold text-rosePink">{Math.round(percentage)}%</span>}
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
