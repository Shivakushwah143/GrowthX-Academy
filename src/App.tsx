import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Timer Component
const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex gap-3 justify-center mt-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-black/60 backdrop-blur rounded-lg px-3 py-2 text-center min-w-[70px]">
          <span className="text-2xl font-bold text-yellow-500">{value}</span>
          <p className="text-xs text-gray-300 capitalize">{unit}</p>
        </div>
      ))}
    </div>
  );
};

// Lead Form Modal
const LeadFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', profession: '', goal: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 rounded-2xl max-w-md w-full p-6 border border-yellow-500/30"
      >
        {!submitted ? (
          <>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Apply Now</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              <input type="tel" placeholder="Phone Number" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              <input type="email" placeholder="Email Address" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              <input type="text" placeholder="Current Profession" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} />
              <textarea placeholder="Your Career Goal" rows={2} className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white" value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} />
              <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full">Submit Application</button>
            </form>
            <button onClick={onClose} className="mt-4 text-gray-400 text-sm w-full">Close</button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold">Application Received!</h3>
            <p className="text-gray-300 mt-2">Book your free career consultation:</p>
            <a href="https://wa.me/918889587206" className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-full">WhatsApp Founder</a>
            <button onClick={onClose} className="block mt-4 text-gray-400 text-sm mx-auto">Close</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fixed: cast to any to bypass strict easing type check
  const fadeUpVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] } }
  };

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <div className="bg-black text-white font-sans">
      {/* Sticky Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-yellow-500/30 z-50 md:hidden">
        <div className="flex justify-around py-2">
          <a href="https://wa.me/918889587206" className="flex flex-col items-center text-green-500">
            <span className="text-xl">WhatsApp</span>
            <span className="text-xs">Chat</span>
          </a>
          <a href="tel:+918889587206" className="flex flex-col items-center text-blue-500">
            <span className="text-xl">Call</span>
            <span className="text-xs">Contact</span>
          </a>
          <button onClick={() => setIsModalOpen(true)} className="flex flex-col items-center text-yellow-500">
            <span className="text-xl">Apply</span>
            <span className="text-xs">Now</span>
          </button>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/918889587206" className="fixed bottom-20 right-4 z-50 bg-green-600 p-3 rounded-full shadow-lg hover:bg-green-700 transition md:bottom-6">
        <span className="text-white font-bold text-sm">WhatsApp</span>
      </a>

      {/* Header with Hamburger Menu */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-40 border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
            GrowthX Academy
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <a href="#home" className="hover:text-yellow-500">Home</a>
            <a href="#mentor" className="hover:text-yellow-500">Mentor</a>
            <a href="#curriculum" className="hover:text-yellow-500">Curriculum</a>
            <a href="#pricing" className="hover:text-yellow-500">Pricing</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex gap-2">
            <a href="https://wa.me/918889587206" className="bg-green-600 px-4 py-1 rounded-full text-sm">WhatsApp</a>
            <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 text-black px-4 py-1 rounded-full font-semibold text-sm">Apply Now</button>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-b border-yellow-500/20 overflow-hidden"
            >
              <div className="flex flex-col py-4 px-4 space-y-3">
                <a href="#home" onClick={handleNavClick} className="hover:text-yellow-500 py-2">Home</a>
                <a href="#mentor" onClick={handleNavClick} className="hover:text-yellow-500 py-2">Mentor</a>
                <a href="#curriculum" onClick={handleNavClick} className="hover:text-yellow-500 py-2">Curriculum</a>
                <a href="#pricing" onClick={handleNavClick} className="hover:text-yellow-500 py-2">Pricing</a>
                <div className="flex gap-3 pt-2">
                  <a href="https://wa.me/918889587206" className="bg-green-600 px-4 py-2 rounded-full text-sm text-center flex-1">WhatsApp</a>
                  <button onClick={() => { setIsModalOpen(true); handleNavClick(); }} className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold text-sm flex-1">Apply Now</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16 pb-20 md:pb-0">
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden py-12 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-yellow-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                Learn Digital Marketing <br />
                From Someone Who <span className="text-yellow-500">Actually Builds Businesses</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-4">
                Work directly with <strong className="text-yellow-400">Pawan Kose</strong> – Digital Marketer, E-Commerce Strategist, WordPress & Shopify Developer, SEBI-Registered Mutual Fund Distributor
              </p>
              <p className="text-md text-gray-400 mt-2">11,000+ LinkedIn Followers | Shopify Expert | Funnel Building Expert</p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold">Apply Now – Save ₹5,000</button>
                <a href="https://wa.me/918889587206" className="border border-yellow-500 text-yellow-500 px-6 py-3 rounded-full font-bold">Talk to Mentor</a>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm">
                {['Build Real Skills', 'Work On Real Projects', 'Become Industry Ready', 'Personal Mentorship'].map(b => (
                  <span key={b} className="bg-white/10 px-3 py-1 rounded-full">✓ {b}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Meet Your Mentor */}
        <section id="mentor" className="py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
                  alt="Pawan Kose"
                  className="rounded-2xl shadow-2xl border-2 border-yellow-500 w-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold">Meet Your Mentor: <span className="text-yellow-500">Pawan Kose</span></h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">Digital Marketer</span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">E-Commerce Strategist</span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">WordPress & Shopify Developer</span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">SEBI-Registered Mutual Fund Distributor</span>
                </div>
                <div className="mt-4 space-y-3 text-gray-200">
                  <p>“I started my journey as a freelance web developer, then built a digital agency from scratch. Today, I’ve managed over ₹3Cr in ad spend, built 50+ funnels, and helped brands scale their online presence.”</p>
                  <p>“But I saw a problem: most courses teach theory, not execution. So I created GrowthX Academy – a 90-day intensive where you learn by doing real client work. You won't just get a certificate; you'll get a portfolio, real skills, and my direct mentorship.”</p>
                  <p className="font-semibold">11,000+ LinkedIn followers | Shopify Expert Partner | Meta Ads Certified | SEBI-Registered Research Analyst</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <a href="https://wa.me/918889587206" className="bg-green-600 px-5 py-2 rounded-full text-white">WhatsApp Founder</a>
                  <button onClick={() => setIsModalOpen(true)} className="border border-yellow-500 px-5 py-2 rounded-full">Apply Now</button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Inside Our Agency */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold">Inside <span className="text-yellow-500">Our Agency</span></h2>
              <p className="text-gray-300 mt-2">This is where you'll train – real team, real clients, real results.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  "https://images.unsplash.com/photo-1676276375773-add2cbdd1cc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
                  "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNvY2lhbCUyMG1lZGlhJTIwbWFya2V0aW5nfGVufDB8fDB8fHww",
                  "https://media.istockphoto.com/id/2170434294/photo/3d-rendering-smartphone-app-icons-colorful-blocks-isometric-design-vibrant-colors-yellow.webp?a=1&b=1&s=612x612&w=0&k=20&c=NjNsm3mm8wFVXiza7YHzKCK_Cm9sGK99zOJhBnBGeCY=",
                  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNvY2lhbCUyMG1lZGlhJTIwbWFya2V0aW5nfGVufDB8fDB8fHww"
                ].map((url, i) => (
                  <img key={i} src={url} className="rounded-xl border border-yellow-500/30 w-full h-32 object-cover" alt="agency" />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-yellow-500 text-2xl">📊</span><p className="text-sm">Campaign Dashboards</p></div>
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-yellow-500 text-2xl">📈</span><p className="text-sm">Client Reports</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="text-center"
            >
              <h2 className="text-3xl font-bold">Trusted by <span className="text-yellow-500">Thousands</span></h2>
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                <div className="bg-white/5 p-4 rounded-2xl text-center">
                  <span className="text-4xl">🔵</span>
                  <p className="text-2xl font-bold text-yellow-500">11,000+</p>
                  <p>LinkedIn Followers</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl text-center">
                  <span className="text-4xl">📦</span>
                  <p className="text-2xl font-bold text-yellow-500">Shopify</p>
                  <p>Expert Partner</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl text-center">
                  <span className="text-4xl">🎓</span>
                  <p className="text-2xl font-bold text-yellow-500">200+</p>
                  <p>Students Trained (Live)</p>
                </div>
              </div>
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="bg-white/5 p-4 rounded-xl flex gap-3 items-start">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" className="w-12 h-12 rounded-full" alt="student" />
                  <div><p className="font-bold">Priya S.</p><p className="text-yellow-500 text-sm">Digital Marketing Associate | Placed at XYZ Agency</p><p className="text-gray-300 text-sm">“Pawan’s mentorship changed my career. I went from zero to managing ₹5L ad budgets in 3 months.”</p><a href="#" className="text-yellow-500 text-xs">View LinkedIn →</a></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Learn From Pawan + Agency */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-white/5 p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-yellow-500">Why Learn From Pawan Kose?</h3>
                <ul className="mt-4 space-y-2">
                  {['✓ Real business experience, not just theory', '✓ Daily agency workflows shared', '✓ Direct access to mentor', '✓ Proven track record with brands'].map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-yellow-500">Why Learn From An Agency?</h3>
                <ul className="mt-4 space-y-2">
                  {['✓ Work on real client projects', '✓ Use professional tools (Meta Ads, Google Ads, SEMrush)', '✓ Learn client communication & reporting', '✓ Build a portfolio that gets you hired'].map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Career Outcomes */}
        <section className="py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="text-center"
            >
              <h2 className="text-3xl font-bold">After Completing This Program, You Will Be Able To:</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {['Run Meta Ads', 'Run Google Ads', 'Generate Leads', 'Create Funnels', 'Build Websites', 'Manage Clients', 'Create Reports', 'Freelance Professionally', 'Apply for Jobs'].map(skill => (
                  <div key={skill} className="bg-white/5 p-2 rounded-lg text-sm">✓ {skill}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Career Roadmap */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="text-center"
            >
              <h2 className="text-3xl font-bold">Your <span className="text-yellow-500">Career Roadmap</span></h2>
              <div className="relative max-w-md mx-auto mt-10">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-yellow-500/30"></div>
                {['Beginner (No experience needed)', 'Digital Marketing Foundation', 'Live Client Projects', 'Portfolio Development', 'Mock Interviews & Placement Support', 'Digital Marketing Professional'].map((step, idx) => (
                  <div key={idx} className="relative flex gap-4 items-center mb-8 ml-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold z-10">{idx+1}</div>
                    <div className="bg-white/5 p-3 rounded-xl flex-1 text-left">{step}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold">90-Day <span className="text-yellow-500">Transformation</span></h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { month: 'Month 1', title: 'Foundation & Organic Growth', outcome: 'Understand how businesses acquire customers. Build SEO & social media strategies.' },
                { month: 'Month 2', title: 'Paid Ads & Analytics', outcome: 'Launch real Meta & Google Ads campaigns. Analyze data like a pro.' },
                { month: 'Month 3', title: 'Career & Freelancing', outcome: 'Build portfolio, learn client acquisition, interview prep, placement support.' }
              ].map(m => (
                <div key={m.month} className="bg-black/60 border border-yellow-500/30 p-5 rounded-2xl">
                  <div className="text-yellow-500 text-xl font-bold">{m.month}</div>
                  <h3 className="text-lg font-semibold mt-1">{m.title}</h3>
                  <p className="text-gray-300 text-sm mt-2">{m.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 md:p-8 border border-yellow-500/40 shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-center">Program Investment</h2>
              <div className="text-center mt-4">
                <span className="line-through text-gray-400 text-2xl">₹25,000</span>
                <span className="text-5xl font-bold text-yellow-500 ml-3">₹20,000</span>
                <p className="text-green-400">Launch Scholarship – Save ₹5,000</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
                {['✓ 90 Days Live Training', '✓ Real Client Projects', '✓ Career Support', '✓ Portfolio Building', '✓ Placement Assistance', '✓ Direct Mentor Access'].map(f => <div key={f}>{f}</div>)}
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 text-black py-3 rounded-full font-bold text-lg">Apply Now – Reserve Your Seat</button>
                <a href="https://wa.me/918889587206" className="border border-yellow-500 text-yellow-500 py-3 rounded-full font-bold text-center">Chat on WhatsApp</a>
              </div>
              <Timer />
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked <span className="text-yellow-500">Questions</span></h2>
            <div className="space-y-3">
              {[
                { q: "I have zero experience. Can I join?", a: "Absolutely. The program starts from fundamentals and builds up." },
                { q: "Is this online or offline?", a: "Live online classes + recorded sessions + practical assignments." },
                { q: "Will I get a certificate?", a: "Yes, a completion certificate. More importantly, a portfolio of real work." },
                { q: "How does placement assistance work?", a: "Resume reviews, mock interviews, and connections to our hiring partners." }
              ].map(faq => (
                <div key={faq.q} className="bg-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-yellow-500">{faq.q}</h3>
                  <p className="text-gray-300 text-sm mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-yellow-500/20 to-black text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to work with a real industry expert?</h2>
            <p className="text-gray-300 mt-2">Limited seats available. Start your career transformation today.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold">Apply Now</button>
              <a href="https://wa.me/918889587206" className="border border-white px-8 py-3 rounded-full font-bold">Talk to Pawan</a>
            </div>
          </div>
        </section>

        <footer className="bg-black border-t border-yellow-500/30 py-8 text-center text-gray-500 text-sm">
          © 2025 GrowthX Academy – Led by Pawan Kose. Real skills, real projects, real career.
        </footer>
      </main>

      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;