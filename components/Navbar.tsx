
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { SERVICES } from '../constants';

interface NavbarProps {
  currentPage: string;
  navigate: (page: string, serviceId?: string) => void;
  user: User | null;
  logout: () => void;
  logoText: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate, user, logout, logoText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'blog', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer logo-container" onClick={() => navigate('home')}>
            <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center mr-3 shadow-lg logo-icon-box">
                <span className="text-white font-bold text-xl">{logoText.charAt(0)}</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-dark">{logoText}</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <div key={item.id} className="relative group" onMouseEnter={() => item.id === 'services' && setShowServices(true)} onMouseLeave={() => item.id === 'services' && setShowServices(false)}>
                <button
                  onClick={() => navigate(item.id)}
                  className={`text-sm font-bold transition-colors hover:text-brand-red uppercase tracking-widest ${
                    currentPage === item.id ? 'text-brand-red' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
                {item.id === 'services' && showServices && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 overflow-hidden animate-in fade-in zoom-in duration-300">
                       {SERVICES.map(s => (
                         <button 
                           key={s.id} 
                           onClick={() => { navigate('service-detail', s.id); setShowServices(false); }}
                           className="w-full text-left px-6 py-3 text-sm font-bold text-gray-500 hover:bg-red-50 hover:text-brand-red rounded-xl transition-all"
                         >
                           {s.title}
                         </button>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="h-8 w-px bg-gray-100"></div>

            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('portal')}
                  className="px-6 py-2.5 bg-brand-dark text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-xl"
                >
                  Portal
                </button>
                <button onClick={logout} className="text-sm font-bold text-gray-400 hover:text-brand-red">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <button onClick={() => navigate('login')} className="text-sm font-bold text-gray-600 hover:text-brand-red uppercase tracking-widest">Login</button>
                <button 
                  onClick={() => navigate('start-project')}
                  className="px-8 py-3 bg-brand-red text-white text-sm font-bold rounded-full hover:bg-red-800 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Start Project
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-6 px-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { navigate(item.id); setIsOpen(false); }}
              className="block w-full text-left py-3 text-xl font-bold text-brand-dark hover:text-brand-red"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('start-project'); setIsOpen(false); }}
            className="block w-full text-center py-5 bg-brand-red text-white rounded-2xl font-bold text-lg shadow-xl"
          >
            Start Project
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
