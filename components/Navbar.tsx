import React from 'react';
import { User } from '../types';

interface NavbarProps {
  currentPage: string;
  navigate: (page: string) => void;
  user: User | null;
  logout: () => void;
  logoText: string;
  logoUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate, user, logout, logoText, logoUrl }) => {
  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section - Updated to show image */}
          <div 
            onClick={() => navigate('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Logo Image */}
            <img 
              src={logoUrl} 
              alt={logoText}
              className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                const textLogo = e.currentTarget.nextElementSibling;
                if (textLogo) textLogo.classList.remove('hidden');
              }}
            />
            {/* Fallback Text Logo (hidden by default) */}
            <div className="hidden w-12 h-12 bg-brand-dark rounded-xl flex items-center justify-center text-white font-black text-xl">
              {logoText.charAt(0)}
            </div>
            {/* Logo Text */}
            <span className="text-2xl font-black text-brand-dark tracking-tight group-hover:text-brand-red transition-colors">
              {logoText}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  currentPage === item.page
                    ? 'bg-brand-dark text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-dark'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate('portal')}
                  className="px-6 py-2.5 bg-gray-100 text-brand-dark rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="px-6 py-2.5 bg-brand-dark text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('portal')}
                  className="hidden sm:block px-6 py-2.5 text-brand-dark font-bold hover:text-brand-red transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('start-project')}
                  className="px-6 py-2.5 bg-brand-dark text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Project
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;