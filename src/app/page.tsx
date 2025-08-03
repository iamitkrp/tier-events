/**
 * Tier Events - Landing Page
 * A premium event management platform with tier-based access
 * 
 * Author: Amit Kumar Pandey
 * Website: https://amitkp.com
 * GitHub: https://github.com/iamitkrp
 */

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

      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Minimal Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 lg:px-12">
          <div className="flex items-center">
            <h1 className="text-xl font-medium text-black tracking-wide">Tier Events</h1>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/about">
              <button className="text-black/70 hover:text-black transition-colors duration-300 text-sm cursor-pointer">
                About Us
              </button>
            </Link>
            <Link href="/what-we-do">
              <button className="text-black/70 hover:text-black transition-colors duration-300 text-sm cursor-pointer">
                What We Do
              </button>
            </Link>
            <Link href="/privacy">
              <button className="text-black/70 hover:text-black transition-colors duration-300 text-sm cursor-pointer">
                Privacy Policy
              </button>
            </Link>
            <Link href="/help">
              <button className="text-black/70 hover:text-black transition-colors duration-300 text-sm cursor-pointer">
                Help
              </button>
            </Link>

          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl font-light text-black leading-tight tracking-tight">
                  Premium
                  <span className="block font-normal">Events</span>
                </h1>
                <div className="w-24 h-0.5 bg-black/60 mx-auto"></div>
              </div>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-black/80 font-light max-w-2xl mx-auto leading-relaxed">
                Curated experiences tailored to your membership tier
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <SignedIn>
                  <Link href="/dashboard">
                    <Button 
                      size="lg" 
                      className="bg-black text-white hover:bg-black/90 text-base px-8 py-3 rounded-full transition-all duration-300 min-w-[160px]"
                    >
                      View Events
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <Link href="/signup">
                    <Button 
                      size="lg" 
                      className="bg-black text-white hover:bg-black/90 text-base px-8 py-3 rounded-full transition-all duration-300 min-w-[160px]"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="bg-transparent border-black/30 text-black hover:bg-black/10 text-base px-8 py-3 rounded-full transition-all duration-300 min-w-[160px] backdrop-blur-sm"
                    >
                      Sign In
                    </Button>
                  </Link>
                </SignedOut>
              </div>
            </div>
          </div>
        </main>

        {/* Premium Tier Showcase */}
        <div className="pb-16 px-8 lg:px-12 mt-24">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-sm uppercase tracking-[0.2em] text-black/60 font-light">
                Membership Tiers
              </h2>
            </div>
            
            {/* Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: 'Free', 
                  desc: 'Community Access', 
                  gradient: 'from-gray-400/20 to-gray-600/20',
                  border: 'border-gray-400/30',
                  dot: 'bg-gray-400',
                  features: ['Basic Events', 'Community Support'],
                  icon: '👥'
                },
                { 
                  name: 'Silver', 
                  desc: 'Enhanced Experience', 
                  gradient: 'from-slate-300/20 to-slate-500/20',
                  border: 'border-slate-300/30',
                  dot: 'bg-slate-300',
                  features: ['Workshop Access', 'Priority Support'],
                  icon: '⚡'
                },
                { 
                  name: 'Gold', 
                  desc: 'VIP Treatment', 
                  gradient: 'from-yellow-400/20 to-yellow-600/20',
                  border: 'border-yellow-400/30',
                  dot: 'bg-yellow-400',
                  features: ['Exclusive Events', 'VIP Networking'],
                  icon: '✨'
                },
                { 
                  name: 'Platinum', 
                  desc: 'Ultimate Access', 
                  gradient: 'from-purple-400/20 to-purple-600/20',
                  border: 'border-purple-400/30',
                  dot: 'bg-purple-400',
                  features: ['Private Events', 'One-on-One Access'],
                  icon: '👑'
                }
              ].map((tier, index) => (
                <div 
                  key={tier.name} 
                  className={`
                    group relative overflow-hidden rounded-2xl bg-gradient-to-br ${tier.gradient} 
                    border ${tier.border} backdrop-blur-sm transition-all duration-500 
                    hover:scale-105 hover:bg-white/5 cursor-pointer
                  `}
                >
                  {/* Card Content */}
                  <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-2 h-2 ${tier.dot} rounded-full`}></div>
                      <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        {tier.icon}
                      </span>
                    </div>
                    
                    {/* Tier Info */}
                    <div className="flex-1">
                      <h3 className="text-black font-medium text-lg mb-1 group-hover:text-black transition-colors">
                        {tier.name}
                      </h3>
                      <p className="text-black/60 text-sm mb-4 group-hover:text-black/80 transition-colors">
                        {tier.desc}
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex}
                            className="flex items-center space-x-2 text-black/50 group-hover:text-black/70 transition-colors"
                          >
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            <span className="text-xs font-light">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tier Number */}
                    <div className="mt-6 pt-4 border-t border-black/10">
                      <span className="text-black/40 text-xs font-light">
                        Tier {index + 1} of 4
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black/10">
                    <div 
                      className={`h-full ${tier.dot} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-black/40 text-xs font-light">
                Each tier unlocks access to previous tier benefits
              </p>
            </div>
          </div>
        </div>

        {/* Footer Attribution */}
        <div className="absolute bottom-4 right-4 z-20">
          <p className="text-black/50 text-xs font-light">
            Made by -{' '}
            <a 
              href="https://amitkp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black/70 hover:text-black transition-colors duration-300 cursor-pointer"
            >
              Amit
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
