import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Tier Events</h1>
            </div>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to{' '}
            <span className="text-blue-600">Tier Events</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover exclusive events based on your membership tier. From free events to platinum experiences.
          </p>
          
          <div className="mt-8">
            <SignedOut>
              <div className="text-center">
                <p className="text-gray-600 mb-4">Sign in to access tier-based events</p>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors">
                    Get Started
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
            
            <SignedIn>
              <div className="space-y-4">
                <p className="text-green-600 font-medium">Welcome back! You&apos;re signed in.</p>
                <Link
                  href="/events"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
                >
                  Browse Events
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-600 font-bold">FREE</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Tier</h3>
            <p className="text-gray-600">Access to basic events and webinars</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold">SILVER</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Silver Tier</h3>
            <p className="text-gray-600">Premium talks and networking events</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-yellow-600 font-bold">GOLD</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gold Tier</h3>
            <p className="text-gray-600">Exclusive masterclasses and workshops</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 font-bold">PLATINUM</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Platinum Tier</h3>
            <p className="text-gray-600">VIP summits and private events</p>
          </div>
        </div>
      </main>
    </div>
  );
}
