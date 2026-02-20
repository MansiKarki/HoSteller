import { useState } from 'react';

export default function AdminNavbar({ setPage, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div>
      <nav className="bg-gray-800 shadow-md border-b-2 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-green-500">
                  Hosteller Admin
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setPage('dashboard')}
                className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => setPage('nightout')}
                className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Night Out Approvals
              </button>
              <button
                onClick={() => setPage('maintenance')}
                className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Maintenance Requests
              </button>
              <button
                onClick={() => setPage('verify')}
                className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Student Verification
              </button>
              <button
                onClick={handleLogout}
                className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm"
              >
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 p-2 rounded-md"
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
                  onClick={() => { setPage('dashboard'); setMobileMenuOpen(false); }}
                  className="text-gray-300 hover:text-green-400 hover:bg-gray-700 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { setPage('nightout'); setMobileMenuOpen(false); }}
                  className="text-gray-300 hover:text-green-400 hover:bg-gray-700 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  Night Out Approvals
                </button>
                <button
                  onClick={() => { setPage('maintenance'); setMobileMenuOpen(false); }}
                  className="text-gray-300 hover:text-green-400 hover:bg-gray-700 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  Maintenance Requests
                </button>
                <button
                  onClick={() => { setPage('verify'); setMobileMenuOpen(false); }}
                  className="text-gray-300 hover:text-green-400 hover:bg-gray-700 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                >
                  Student Verification
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm text-center"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
