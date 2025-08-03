import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg/ribbon.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Minimal Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 lg:px-12">
          <div className="flex items-center">
            <h1 className="text-xl font-medium text-white tracking-wide">Tier Events</h1>
          </div>
          <div className="flex items-center gap-6">
            <SignedIn>
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/login">
                <button className="text-white/80 hover:text-white transition-colors duration-300 text-sm">
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <Button 
                  className="bg-white text-black hover:bg-white/90 transition-all duration-300"
                  size="sm"
                >
                  Get Started
                </Button>
              </Link>
            </SignedOut>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl font-light text-white leading-tight tracking-tight">
                  Premium
                  <span className="block font-normal">Events</span>
                </h1>
                <div className="w-24 h-0.5 bg-white/60 mx-auto"></div>
              </div>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                Curated experiences tailored to your membership tier
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <SignedIn>
                  <Link href="/dashboard">
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-white/90 text-base px-8 py-3 rounded-full transition-all duration-300 min-w-[160px]"
                    >
                      View Events
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <Link href="/signup">
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-white/90 text-base px-8 py-3 rounded-full transition-all duration-300 min-w-[160px]"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="bg-transparent border-white/30 text-white hover:bg-white/10 text-base px-8 py-3 rounded-full transition-all duration-300 min-w-[160px] backdrop-blur-sm"
                    >
                      Sign In
                    </Button>
                  </Link>
                </SignedOut>
              </div>
            </div>
          </div>
        </main>

        {/* Minimal Tier Indicators */}
        <div className="pb-12 px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Free', desc: 'Community Access', color: 'bg-gray-400' },
                { name: 'Silver', desc: 'Enhanced Experience', color: 'bg-slate-300' },
                { name: 'Gold', desc: 'VIP Treatment', color: 'bg-yellow-400' },
                { name: 'Platinum', desc: 'Ultimate Access', color: 'bg-purple-400' }
              ].map((tier) => (
                <div key={tier.name} className="text-center space-y-3">
                  <div className={`w-3 h-3 ${tier.color} rounded-full mx-auto`}></div>
                  <div>
                    <h3 className="text-white font-medium text-sm">{tier.name}</h3>
                    <p className="text-white/60 text-xs mt-1">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
