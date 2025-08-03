import { getTierColor, getTierDisplayName, type TierType } from '@/lib/tierUtils'
import { cn } from '@/lib/utils'

interface TierBadgeProps {
  tier: TierType
  className?: string
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getTierColor(tier),
        className
      )}
    >
      {getTierDisplayName(tier)}
    </span>
  )
}