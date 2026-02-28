import { useState, useRef, useEffect } from 'react';
import Login from '../pages/Login';
import Navbar from '../components/Navbar';
// import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';

// Custom hook: animates count from 0 → target over `duration` ms
function useCountUp(target, start, duration = 2000) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return count;
}

// Scroll-reveal hook
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Reveal wrapper component
function Reveal({ children, variant = 'reveal-up', delay = '', className = '' }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${variant} ${delay} ${className}`}>
      {children}
    </div>
  );
}

export default function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState('login');
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleShowLogin = (mode = 'login') => {
    setLoginMode(mode);
    setShowLogin(true);
  };

  const handleNavigate = (sectionId) => {
    setShowLogin(false);
    // Use a small timeout to let the landing page sections mount before scrolling
    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-[#F3FAED]">
        <Navbar onShowLogin={handleShowLogin} onNavigate={handleNavigate} />
        <Login onLogin={onLogin} mode={loginMode} initialMode={loginMode} />
      </div>
    );
  }

  return (
    <div id="home" className="min-h-screen bg-[#F3FAED]">
      <Navbar onShowLogin={handleShowLogin} onNavigate={handleNavigate} />
      <HeroCarousel />

      {/* Hero Section */}


      {/* College & Hostel Info Section */}
      <section id="hostel-info" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="reveal-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Welcome to HoSteller Hub</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Everything you need for a comfortable stay — from room info and daily meals to maintenance help and announcements, all just a click away.
            </p>
          </Reveal>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Reveal variant="reveal-up" delay="reveal-delay-1"><StatCard number="10,000+" label="Students" start={statsVisible} /></Reveal>
            <Reveal variant="reveal-up" delay="reveal-delay-2"><StatCard number="600+" label="Rooms" start={statsVisible} /></Reveal>
            <Reveal variant="reveal-up" delay="reveal-delay-3"><StatCard number="15+" label="Amenities" start={statsVisible} /></Reveal>
            <Reveal variant="reveal-up" delay="reveal-delay-4"><StatCard number="25+" label="Years of Excellence" start={statsVisible} /></Reveal>
          </div>

          {/* Hostel Info */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Reveal variant="reveal-left">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Our Hostel Facilities</h3>
              <p className="text-gray-600 mb-4">
                We provide comfortable and safe accommodation for our students with modern amenities
                and a supportive living environment. Our hostels are designed to promote academic
                success and personal growth.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Well-furnished rooms with AC and non-AC options</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 24/7 security and CCTV surveillance</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Hygienic mess facilities with multi-cuisine options</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Library and study rooms</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Recreation rooms with TV and games</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Medical room and ambulance service</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Laundry and housekeeping services</li>
              </ul>
            </Reveal>
            <Reveal variant="reveal-right">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">Hostel Statistics</h4>
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4"><p className="text-3xl font-bold">8</p><p className="text-sm">Hostel Blocks</p></div>
                  <div className="bg-white/20 rounded-lg p-4"><p className="text-3xl font-bold">2,500+</p><p className="text-sm">Total Beds</p></div>
                  <div className="bg-white/20 rounded-lg p-4"><p className="text-3xl font-bold">150+</p><p className="text-sm">Wardens & Staff</p></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-[#F3FAED]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal variant="reveal-left">
              <h2 className="text-3xl font-bold text-green-600 mb-4">About Hosteller</h2>
              <p className="text-gray-600 mb-4">
                Hosteller is a comprehensive hostel management system designed to streamline
                administrative tasks and enhance the student experience at Green Valley University.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform enables students to easily request night outs, report maintenance
                issues, access digital ID cards, and communicate with hostel administrators.
                For administrators, we provide powerful tools to manage approvals, track requests,
                and ensure student safety.
              </p>
              <p className="text-gray-600">
                Built with modern technology and powered by AI, Hosteller is your trusted
                partner in efficient hostel management.
              </p>
            </Reveal>
            <Reveal variant="reveal-right">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-green-600 mb-4">Why Choose Hosteller?</h3>
                <div className="space-y-3">
                  {[{ title: 'Easy to Use', desc: 'Intuitive interface for students and administrators' }, { title: 'Secure & Reliable', desc: 'Enterprise-grade security for your data' }, { title: '24/7 Support', desc: 'Round-the-clock assistance for all users' }, { title: 'AI-Powered', desc: 'Smart automation for efficient operations' }].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-green-600">
        <Reveal variant="reveal-zoom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-green-100 mb-8">
              Join thousands of students and administrators using Hosteller for seamless hostel management.
            </p>
            <button
              onClick={() => handleShowLogin('login')}
              className="bg-white text-green-600 px-8 py-3 rounded-xl font-medium hover:bg-green-50 transition shadow-lg"
            >
              Login / Signup Now
            </button>
          </div>
        </Reveal>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal variant="reveal-up" className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <FAQList />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatCard({ number, label, start }) {
  // Parse target value and suffix (e.g. "10,000+" → target=10000, suffix="+")
  const raw = number.replace(/,/g, '');
  const suffix = raw.replace(/[0-9]/g, '');
  const target = parseInt(raw.replace(/[^0-9]/g, ''), 10);

  const count = useCountUp(target, start, 2000);

  // Format count with commas
  const formatted = count.toLocaleString();

  return (
    <div className="bg-[#F3FAED] rounded-xl p-6 text-center transition-transform duration-300 hover:-translate-y-1">
      <p className="text-3xl font-bold text-green-600">
        {start ? formatted + suffix : '0'}
      </p>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
    </div>
  );
}

const FAQ_DATA = [
  {
    question: "How is hostel security managed?",
    answer: "Each hostel block is monitored 24×7 with CCTV cameras and dedicated wardens stationed at entry and exit points. Only registered students with valid ID cards are allowed access after verification.",
  },
  {
    question: "What are the hostel office working hours?",
    answer: "The hostel office operates from 9:00 AM to 6:00 PM on weekdays and 10:00 AM to 2:00 PM on Saturdays. For after-hours emergencies, you can contact the on-duty warden directly.",
  },
  {
    question: "What are the check-in timings for hostel residents?",
    answer: "Students must return to the hostel premises by 10:00 PM on weekdays and 11:00 PM on weekends. Night-out requests must be submitted through the HoSteller app at least 24 hours in advance.",
  },
  {
    question: "What should I do in case of maintenance issues in my room?",
    answer: "You can submit a maintenance request directly through the HoSteller app under the 'Maintenance' section. Our team typically resolves standard issues within 24–48 hours of the request being logged.",
  },
  {
    question: "Are visitors allowed inside the hostel?",
    answer: "Visitors are allowed in the common areas only, between 10:00 AM and 7:00 PM. They must register at the gate with a valid ID. Access to residential floors is strictly restricted to residents.",
  },
  {
    question: "How do I apply for a night out?",
    answer: "Log in to the HoSteller app, navigate to 'Night Out Requests', fill in the required details including destination and expected return time, and submit. Approval is granted by the warden and notified via the app.",
  },
];

function FAQList() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <div className="space-y-2">
      {FAQ_DATA.map((item, i) => (
        <FAQItem
          key={i}
          question={item.question}
          answer={item.answer}
          open={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}

function FAQItem({ question, answer, open, onToggle }) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${open ? 'border-t-2 border-green-500 shadow-sm' : 'border-t-2 border-transparent'
      }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className={`text-base font-medium transition-colors duration-200 ${open ? 'text-green-600' : 'text-gray-800 group-hover:text-green-600'
          }`}>
          {question}
        </span>
        <span className={`ml-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-green-500' : 'text-gray-400'
          }`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Divider */}
      <div className="mx-6 border-t border-green-100" />

      {/* Answer */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="px-6 py-5 text-gray-500 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
