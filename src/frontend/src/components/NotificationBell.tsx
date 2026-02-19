import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function NotificationBell() {
  // Placeholder for notification functionality
  const unreadCount = 0;

  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rosePink text-white text-xs">
          {unreadCount}
        </Badge>
      )}
    </Button>
  );
}
