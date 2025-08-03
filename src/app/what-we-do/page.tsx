export default function WhatWeDoPage() {
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
      <div className="relative z-10 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-black mb-6">
              What We <span className="font-normal">Do</span>
            </h1>
            <div className="w-24 h-0.5 bg-black/20 mx-auto mb-8"></div>
            <p className="text-xl text-black/70 font-light max-w-2xl mx-auto">
              We curate and host premium events across four distinct membership tiers, each designed to deliver exceptional value and experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-8 py-16 bg-white/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              tier: 'Free Tier',
              emoji: '👥',
              color: 'from-gray-400/20 to-gray-600/20',
              border: 'border-gray-400/30',
              services: [
                'Community networking events',
                'Basic workshops and seminars',
                'Access to event recordings',
                'Community forum participation',
                'Monthly newsletter updates'
              ]
            },
            {
              tier: 'Silver Tier',
              emoji: '⚡',
              color: 'from-slate-300/20 to-slate-500/20',
              border: 'border-slate-300/30',
              services: [
                'Everything in Free tier',
                'Interactive workshops',
                'Priority event booking',
                'Exclusive member meetups',
                'Direct support access'
              ]
            },
            {
              tier: 'Gold Tier',
              emoji: '✨',
              color: 'from-yellow-400/20 to-yellow-600/20',
              border: 'border-yellow-400/30',
              services: [
                'Everything in Silver tier',
                'VIP networking sessions',
                'Expert-led masterclasses',
                'Premium venue access',
                'Personal event concierge'
              ]
            },
            {
              tier: 'Platinum Tier',
              emoji: '👑',
              color: 'from-purple-400/20 to-purple-600/20',
              border: 'border-purple-400/30',
              services: [
                'Everything in Gold tier',
                'Private exclusive events',
                'One-on-one expert sessions',
                'Custom experience design',
                'Global event access'
              ]
            }
          ].map((tier, index) => (
            <div 
              key={tier.tier}
              className={`
                relative overflow-hidden rounded-2xl bg-gradient-to-br ${tier.color} 
                border ${tier.border} backdrop-blur-sm p-8 hover:scale-102 
                transition-all duration-300 group
              `}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-light text-black">{tier.tier}</h3>
                <span className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {tier.emoji}
                </span>
              </div>
              
              <div className="space-y-3">
                {tier.services.map((service, serviceIndex) => (
                  <div 
                    key={serviceIndex}
                    className="flex items-start space-x-3 text-black/70"
                  >
                    <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm leading-relaxed">{service}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-black/10">
                <span className="text-black/40 text-xs uppercase tracking-wide">
                  Tier {index + 1} of 4
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-white/60 backdrop-blur-sm py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-black mb-4">Our Process</h2>
            <p className="text-black/60">How we create exceptional experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Curate',
                description: 'We carefully select speakers, venues, and experiences that align with each tier&apos;s value proposition.'
              },
              {
                step: '02',
                title: 'Customize',
                description: 'Each event is tailored to provide maximum value for the specific membership tier, ensuring relevant content and networking.'
              },
              {
                step: '03',
                title: 'Connect',
                description: 'We facilitate meaningful connections between attendees, creating lasting professional and personal relationships.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4 text-lg font-light">
                  {item.step}
                </div>
                <h3 className="text-xl font-medium text-black mb-3">{item.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-black/10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="flex justify-center">
            <a 
              href="/" 
              className="text-black/70 hover:text-black transition-colors duration-300 text-sm flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}