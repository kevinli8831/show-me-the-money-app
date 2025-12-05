import { useAuthStore as useAuth } from '@/app/store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import * as React from 'react';

export function UserAvatar({ className, ...props }: Omit<React.ComponentProps<typeof Avatar>, 'alt'>) {
    const { user } = useAuth();

    return (
    <Avatar alt={`${user?.id}'s avatar`} className={cn('size-8', className)} {...props}>
      <AvatarImage source={{ uri: user?.avatarUrl }} />
      <AvatarFallback>
      </AvatarFallback>
    </Avatar>
  );
}