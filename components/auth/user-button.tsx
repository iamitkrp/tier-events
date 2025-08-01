'use client';

import { UserButton as ClerkUserButton } from '@clerk/nextjs';

interface UserButtonProps {
  afterSignOutUrl?: string;
}

export function UserButton({ afterSignOutUrl = '/' }: UserButtonProps) {
  return (
    <ClerkUserButton 
      afterSignOutUrl={afterSignOutUrl}
      appearance={{
        elements: {
          avatarBox: "h-8 w-8"
        }
      }}
    />
  );
}
