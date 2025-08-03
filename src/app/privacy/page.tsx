import Link from 'next/link'

/**
 * Privacy Policy Page
 * Privacy information and data handling policies
 * 
 * Author: Amit Kumar Pandey
 * Website: https://amitkp.com
 * GitHub: https://github.com/iamitkrp
 */

export default function PrivacyPage() {
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
              Privacy <span className="font-normal">Policy</span>
            </h1>
            <div className="w-24 h-0.5 bg-black/20 mx-auto mb-8"></div>
            <p className="text-xl text-black/70 font-light max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16 bg-white/80 backdrop-blur-sm">
        <div className="prose prose-lg max-w-none">
          <div className="space-y-12">
            
            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-light text-black mb-6">Information We Collect</h2>
              <div className="space-y-6 text-black/70">
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Name, email address, and contact information when you create an account</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Payment information for subscription processing (handled securely by our payment processor)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Event preferences and attendance history</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Usage Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>How you interact with our platform and services</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Device information and IP addresses</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Cookies and similar tracking technologies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-light text-black mb-6">How We Use Your Information</h2>
              <div className="space-y-4 text-black/70 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To provide and improve our event services</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To communicate with you about events and account updates</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To personalize your experience based on your tier and preferences</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To process payments and manage subscriptions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To comply with legal obligations and protect our rights</span>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-light text-black mb-6">Information Sharing</h2>
              <div className="bg-slate-50/50 p-6 rounded-2xl border border-black/10">
                <p className="text-black/70 text-sm mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <div className="space-y-3 text-sm text-black/60">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                    <span>With service providers who assist in operating our platform</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                    <span>When required by law or to protect our legal rights</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                    <span>In connection with a business transfer or acquisition</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-light text-black mb-6">Your Rights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black">Data Access & Control</h3>
                  <div className="space-y-3 text-sm text-black/70">
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Access your personal data</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Correct inaccurate information</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Delete your account and data</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black">Communication Preferences</h3>
                  <div className="space-y-3 text-sm text-black/70">
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Opt out of marketing emails</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Manage notification preferences</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Request data portability</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-light text-black mb-6">Contact Us</h2>
              <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-black/10">
                <p className="text-black/70 text-sm mb-4">
                  If you have questions about this Privacy Policy or want to exercise your rights, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-black/40">Email:</span>
                    <span className="text-black">privacy@tierevents.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-black/40">Mail:</span>
                    <span className="text-black">Privacy Officer, Tier Events, 123 Event St, City, State 12345</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <section className="border-t border-black/10 pt-8">
              <p className="text-xs text-black/40 text-center">
                Last updated: January 2024
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-black/10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="flex justify-center">
            <Link 
              href="/" 
              className="text-black/70 hover:text-black transition-colors duration-300 text-sm flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}