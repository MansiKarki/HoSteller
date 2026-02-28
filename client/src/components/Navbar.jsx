import { useState } from 'react';
import logo from '../assets/logo.png';

export default function Navbar({ onShowLogin, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div>
      <nav className="bg-white shadow-md border-b-2 border-green-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 flex items-center">
                <img src={logo} alt="Hosteller Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold text-green-700 ml-1">
                  Hosteller
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onNavigate ? onNavigate('home') : window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                FAQ
              </button>
            </div>

            {/* Login/Signup Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => onShowLogin('login')}
                className="text-green-600 hover:text-green-700 px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={() => onShowLogin('signup')}
                className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm"
              >
                Signup
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 p-2 rounded-md"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => { onNavigate ? onNavigate('home') : window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => { scrollToSection('features'); setMobileMenuOpen(false); }}
                  className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }}
                  className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  About
                </button>
                <button
                  onClick={() => { scrollToSection('faq'); setMobileMenuOpen(false); }}
                  className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  FAQ
                </button>
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={() => { onShowLogin('login'); setMobileMenuOpen(false); }}
                  className="text-green-600 hover:text-green-700 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => { onShowLogin('signup'); setMobileMenuOpen(false); }}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm text-center"
                >
                  Signup
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
