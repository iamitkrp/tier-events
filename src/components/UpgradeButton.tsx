'use client'

import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { getNextTier, getTierDisplayName, type TierType } from '@/lib/tierUtils'
import { ArrowUp, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface UpgradeButtonProps {
  currentTier: TierType
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function UpgradeButton({ 
  currentTier, 
  className, 
  variant = 'default',
  size = 'default'
}: UpgradeButtonProps) {
  const { user } = useUser()
  const [isUpgrading, setIsUpgrading] = useState(false)
  const nextTier = getNextTier(currentTier)

  if (!nextTier) {
    return null // Already at highest tier
  }

  const handleUpgrade = async () => {
    if (!user) return

    try {
      setIsUpgrading(true)
      
      // Update user tier in Clerk metadata
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          tier: nextTier
        }
      } as Parameters<typeof user.update>[0])

      // Show success feedback
      setTimeout(() => {
        window.location.reload()
      }, 1000)

    } catch (error) {
      console.error('Error upgrading tier:', error)
      setIsUpgrading(false)
    }
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={isUpgrading}
      variant={variant}
      size={size}
      className={className}
    >
      {isUpgrading ? (
        <>
          <Sparkles className="h-4 w-4 mr-2 animate-spin" />
          Upgrading...
        </>
      ) : (
        <>
          <ArrowUp className="h-4 w-4 mr-2" />
          Upgrade to {getTierDisplayName(nextTier)}
        </>
      )}
    </Button>
  )
}