import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tier Events</h1>
        </div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </SignedOut>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Discover Events by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Your Tier
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Access exclusive events based on your membership level. From free community gatherings 
              to premium platinum experiences, there&apos;s something for every tier.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="text-base">
                    View Your Events
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/signup">
                  <Button size="lg" className="text-base">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="text-base">
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Tier-Based Access</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Events tailored to your membership
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <span className="text-sm font-medium">F</span>
                  </div>
                  Free Tier
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Community events and basic networking opportunities.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <span className="text-sm font-medium">S</span>
                  </div>
                  Silver Tier
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Enhanced workshops and professional development events.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                    <span className="text-sm font-medium">G</span>
                  </div>
                  Gold Tier
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Exclusive conferences and VIP networking sessions.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <span className="text-sm font-medium">P</span>
                  </div>
                  Platinum Tier
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Premium experiences and direct access to industry leaders.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  )
}
