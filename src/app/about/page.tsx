export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-black mb-6">
              About <span className="font-normal">Us</span>
            </h1>
            <div className="w-24 h-0.5 bg-black/20 mx-auto mb-8"></div>
            <p className="text-xl text-black/70 font-light max-w-2xl mx-auto">
              We&apos;re passionate about creating exclusive experiences that bring people together through meaningful events.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-black">Our Story</h2>
            <p className="text-black/70 leading-relaxed">
              Founded in 2024, Tier Events emerged from a simple idea: that exceptional experiences should be accessible to everyone, while premium members deserve something truly extraordinary.
            </p>
            <p className="text-black/70 leading-relaxed">
              We believe in the power of community and the magic that happens when like-minded individuals come together. Our tiered approach ensures that every member, regardless of their subscription level, gets value while creating aspirational pathways for enhanced experiences.
            </p>
          </div>
          <div className="lg:pl-8">
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-black/10">
              <h3 className="text-2xl font-light text-black mb-6">Our Values</h3>
              <div className="space-y-4">
                {[
                  { title: 'Inclusivity', desc: 'Everyone deserves great experiences' },
                  { title: 'Excellence', desc: 'Quality in every detail' },
                  { title: 'Community', desc: 'Building lasting connections' },
                  { title: 'Innovation', desc: 'Always pushing boundaries' }
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black/30 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-black">{value.title}</h4>
                      <p className="text-sm text-black/60">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-16 border-t border-black/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Active Members' },
              { number: '500+', label: 'Events Hosted' },
              { number: '50+', label: 'Cities Worldwide' },
              { number: '98%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl lg:text-4xl font-light text-black">{stat.number}</div>
                <div className="text-sm text-black/60 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-black/10 bg-slate-50/50">
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
  )
}