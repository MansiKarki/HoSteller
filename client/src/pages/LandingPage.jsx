import { useState } from 'react';
import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return (
      <div className="min-h-screen bg-[#F3FAED]">
        <Navbar onShowLogin={() => setShowLogin(true)} />
        <Login onLogin={onLogin} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3FAED]">
      <Navbar onShowLogin={() => setShowLogin(true)} />
      
      {/* Hero Section */}
      <Hero />

      {/* College & Hostel Info Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Welcome to Green Valley University</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Green Valley University is a premier educational institution committed to excellence in academics, 
              research, and student development. Our state-of-the-art campus provides world-class facilities 
              for over 10,000 students across various disciplines.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <StatCard number="10,000+" label="Students" />
            <StatCard number="500+" label="Faculty Members" />
            <StatCard number="50+" label="Courses Offered" />
            <StatCard number="25+" label="Years of Excellence" />
          </div>

          {/* Hostel Info */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Our Hostel Facilities</h3>
              <p className="text-gray-600 mb-4">
                We provide comfortable and safe accommodation for our students with modern amenities 
                and a supportive living environment. Our hostels are designed to promote academic 
                success and personal growth.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Well-furnished rooms with AC and non-AC options
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 24/7 security and CCTV surveillance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Hygienic mess facilities with multi-cuisine options
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Library and study rooms
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Recreation rooms with TV and games
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Medical room and ambulance service
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Laundry and housekeeping services
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Hostel Statistics</h4>
              <div className="space-y-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-sm">Hostel Blocks</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-3xl font-bold">2,500+</p>
                  <p className="text-sm">Total Beds</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-3xl font-bold">150+</p>
                  <p className="text-sm">Wardens & Staff</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* About Section */}
      <section className="py-16 px-6 bg-[#F3FAED]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-green-600 mb-4">Why Choose Hosteller?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Easy to Use</p>
                    <p className="text-sm text-gray-600">Intuitive interface for students and administrators</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Secure & Reliable</p>
                    <p className="text-sm text-gray-600">Enterprise-grade security for your data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">24/7 Support</p>
                    <p className="text-sm text-gray-600">Round-the-clock assistance for all users</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">AI-Powered</p>
                    <p className="text-sm text-gray-600">Smart automation for efficient operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-green-100 mb-8">
            Join thousands of students and administrators using Hosteller for seamless hostel management.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-green-600 px-8 py-3 rounded-xl font-medium hover:bg-green-50 transition shadow-lg"
          >
            Login / Signup Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-green-100 rounded-2xl">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">info@greenvalley.edu</p>
            </div>
            <div className="text-center p-6 border border-green-100 rounded-2xl">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
            </div>
            <div className="text-center p-6 border border-green-100 rounded-2xl">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600 text-sm">123 University Road, City - 12345</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="bg-[#F3FAED] rounded-xl p-6 text-center">
      <p className="text-3xl font-bold text-green-600">{number}</p>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
}
