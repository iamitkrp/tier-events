import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="bg-gray-200 rounded"></div>
    </div>
  )
}

export function EventCardSkeleton() {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <LoadingSkeleton className="h-48 w-full bg-gray-200" />
      <div className="p-6">
        <LoadingSkeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
        <LoadingSkeleton className="h-4 w-full mb-1 bg-gray-200" />
        <LoadingSkeleton className="h-4 w-2/3 mb-4 bg-gray-200" />
        <div className="flex gap-4">
          <LoadingSkeleton className="h-4 w-24 bg-gray-200" />
          <LoadingSkeleton className="h-4 w-20 bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <LoadingSkeleton className="h-8 w-64 mb-2 bg-gray-200" />
        <LoadingSkeleton className="h-4 w-96 bg-gray-200" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <LoadingSkeleton className="w-8 h-8 rounded-lg bg-gray-200" />
              <div className="ml-4 flex-1">
                <LoadingSkeleton className="h-4 w-24 mb-1 bg-gray-200" />
                <LoadingSkeleton className="h-6 w-12 bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Events grid skeleton */}
      <div className="mb-8">
        <LoadingSkeleton className="h-6 w-48 mb-6 bg-gray-200" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}