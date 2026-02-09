
import React from 'react';
import { SERVICES } from '../constants';
import { SiteSettings } from '../types';

interface HomeProps {
  navigate: (page: string, serviceId?: string) => void;
  settings: SiteSettings;
}

const Home: React.FC<HomeProps> = ({ navigate, settings }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-40 md:pb-64 bg-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-red-50 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[40rem] h-[40rem] bg-gray-50 rounded-full blur-[100px] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-block px-4 py-2 bg-red-50 text-brand-red rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                Engineering for the digital age
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-brand-dark mb-10 leading-[1.05]">
                {settings.heroTitle.replace(/-/g, ' ')}
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-xl font-medium">
                {settings.heroSubtitle.replace(/-/g, ' ')}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => navigate('start-project')}
                  className="w-full sm:w-auto px-12 py-5 bg-brand-red text-white text-xl font-bold rounded-full hover:bg-red-900 transition-all shadow-2xl hover:scale-105"
                >
                  Start a Project
                </button>
                <button 
                  onClick={() => navigate('contact')}
                  className="w-full sm:w-auto px-12 py-5 border-2 border-brand-dark text-brand-dark text-xl font-bold rounded-full hover:bg-brand-dark hover:text-white transition-all"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="aspect-square bg-gray-100 rounded-[5rem] overflow-hidden shadow-2xl rotate-3 scale-95 group hover:rotate-0 hover:scale-100 transition-all duration-700">
                 <img src={settings.heroImage} alt="Innovative tech" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-red rounded-full flex items-center justify-center p-8 text-white text-center font-bold text-sm shadow-2xl animate-bounce">
                 Driving Innovation Since 2013
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-gray-50 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4 text-left">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.2em] text-brand-red uppercase mb-6">Our Expertise</h2>
              <p className="text-5xl font-bold text-brand-dark leading-tight">We build robust digital infrastructure</p>
            </div>
            <button onClick={() => navigate('services')} className="text-brand-red font-bold hover:underline mb-2 flex items-center gap-2 group text-lg">
              View All Services
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                onClick={() => navigate('service-detail', service.id)}
                className="bg-white p-12 rounded-[3.5rem] border border-gray-100 hover:border-brand-red/10 hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center text-brand-red mb-10 group-hover:bg-brand-red group-hover:text-white transition-all shadow-md group-hover:shadow-red-200">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold text-brand-dark mb-6 leading-tight">{service.title.replace(/-/g, ' ')}</h3>
                <p className="text-gray-500 leading-relaxed font-medium text-lg mb-10">{service.description.replace(/-/g, ' ')}</p>
                <span className="text-brand-red font-bold text-sm uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">Explore Service</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
