import Link from 'next/link'

/**
 * Help Center Page
 * FAQ and support information for users
 * 
 * Author: Amit Kumar Pandey
 * Website: https://amitkp.com
 * GitHub: https://github.com/iamitkrp
 */

export default function HelpPage() {
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
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link href="/" className="text-black/70 hover:text-black transition-colors duration-300 text-sm flex items-center gap-2 cursor-pointer">
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </main>
      {/* Hero Section */}
      <div className="relative bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-black mb-6">
              Help <span className="font-normal">Center</span>
            </h1>
            <div className="w-24 h-0.5 bg-black/20 mx-auto mb-8"></div>
            <p className="text-xl text-black/70 font-light max-w-2xl mx-auto">
              Find answers to common questions and get the support you need to make the most of your Tier Events experience.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-8 py-16 bg-white/80 backdrop-blur-sm">
        <div className="space-y-12">
          
          {/* Getting Started */}
          <section>
            <h2 className="text-3xl font-light text-black mb-8 text-center">Getting Started</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How do I create an account?",
                  answer: "Click 'Get Started' on the homepage and sign up with your email address. You'll be automatically enrolled in our Free tier with immediate access to community events."
                },
                {
                  question: "What's included in each membership tier?",
                  answer: "Each tier builds upon the previous one. Free includes basic events, Silver adds workshops and priority booking, Gold provides VIP access and masterclasses, while Platinum offers private events and personal concierge service."
                },
                {
                  question: "Can I upgrade my membership anytime?",
                  answer: "Yes! You can upgrade your tier at any time from your dashboard. Upgrades take effect immediately, and you'll gain access to all higher-tier events and benefits."
                },
                {
                  question: "How do I book events?",
                  answer: "Browse available events in your dashboard. Events are filtered based on your current tier. Simply click 'Book Event' on any event you'd like to attend."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50/50 rounded-2xl p-6 border border-black/10">
                  <h3 className="text-lg font-medium text-black mb-3">{faq.question}</h3>
                  <p className="text-black/70 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Account Management */}
          <section>
            <h2 className="text-3xl font-light text-black mb-8 text-center">Account Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How do I update my profile?",
                  answer: "Go to your dashboard, click on 'Settings' in the top right, and update your personal information, preferences, and tier settings."
                },
                {
                  question: "Can I downgrade my tier?",
                  answer: "Yes, you can downgrade your tier from the settings menu. Changes take effect at your next billing cycle to ensure you keep current benefits."
                },
                {
                  question: "How do I cancel my membership?",
                  answer: "Contact our support team or use the cancellation option in your account settings. You'll retain access until the end of your billing period."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-black/10">
                  <h3 className="text-base font-medium text-black mb-3">{faq.question}</h3>
                  <p className="text-black/70 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Events & Booking */}
          <section>
            <h2 className="text-3xl font-light text-black mb-8 text-center">Events & Booking</h2>
            <div className="space-y-6">
              {[
                {
                  question: "What if an event is full?",
                  answer: "You can join the waitlist for sold-out events. Higher-tier members get priority when spots become available. We also often add additional sessions for popular events."
                },
                {
                  question: "Can I attend events from lower tiers?",
                  answer: "Absolutely! Your tier gives you access to all events at your level and below. This means Gold members can attend Free, Silver, and Gold events."
                },
                {
                  question: "What's your cancellation policy?",
                  answer: "You can cancel event bookings up to 24 hours before the event start time. Some premium events may have different cancellation policies, which will be clearly stated."
                },
                {
                  question: "Do you offer virtual events?",
                  answer: "Yes! We offer both in-person and virtual events across all tiers. Virtual events are perfect for members who can't attend in person or prefer remote participation."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50/50 rounded-2xl p-6 border border-black/10">
                  <h3 className="text-lg font-medium text-black mb-3">{faq.question}</h3>
                  <p className="text-black/70 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-black/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light text-black mb-4">Still Need Help?</h2>
              <p className="text-black/60">Our support team is here to assist you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mb-4">
                  <span className="text-lg">📧</span>
                </div>
                <h3 className="font-medium text-black mb-2">Email Support</h3>
                <p className="text-sm text-black/60 mb-3">Get detailed help via email</p>
                <p className="text-sm text-black">support@tierevents.com</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mb-4">
                  <span className="text-lg">💬</span>
                </div>
                <h3 className="font-medium text-black mb-2">Live Chat</h3>
                <p className="text-sm text-black/60 mb-3">Instant help when you need it</p>
                <p className="text-sm text-black">Available 9AM-6PM EST</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mb-4">
                  <span className="text-lg">📞</span>
                </div>
                <h3 className="font-medium text-black mb-2">Phone Support</h3>
                <p className="text-sm text-black/60 mb-3">Speak directly with our team</p>
                <p className="text-sm text-black">1-800-TIER-EVENTS</p>
              </div>
            </div>
            
            <div className="text-center mt-8 pt-6 border-t border-black/10">
              <p className="text-xs text-black/40">
                Response times: Email within 24 hours, Live chat within minutes, Phone support for Platinum members
              </p>
            </div>
          </section>
        </div>
      </div>


      </div>
    </div>
  )
}