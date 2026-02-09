
import React from 'react';
import { SERVICES } from '../constants';

// Added ServicesProps to fix missing navigate prop error
interface ServicesProps {
  navigate: (page: string, serviceId?: string) => void;
}

const Services: React.FC<ServicesProps> = ({ navigate }) => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-bold text-brand-dark mb-8">Our Core Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">We provide comprehensive technology solutions designed to solve complex business challenges through innovation and engineering excellence.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SERVICES.map((service, idx) => (
            <div key={service.id} className="group relative bg-white p-12 rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 text-brand-dark">
                  <span className="text-8xl font-black">0{idx + 1}</span>
               </div>
               <div className="w-20 h-20 bg-brand-red text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform">
                  {service.icon}
               </div>
               <h3 className="text-3xl font-bold text-brand-dark mb-6">{service.title}</h3>
               <p className="text-lg text-gray-600 leading-relaxed mb-10">{service.description}</p>
               <ul className="space-y-4 mb-10">
                  <li className="flex items-center text-gray-700 font-medium">
                    <svg className="w-5 h-5 text-brand-red mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Enterprise Scale Implementation
                  </li>
                  <li className="flex items-center text-gray-700 font-medium">
                    <svg className="w-5 h-5 text-brand-red mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    High Performance Optimization
                  </li>
               </ul>
               <button 
                 onClick={() => navigate('service-detail', service.id)}
                 className="text-brand-red font-bold flex items-center group-hover:underline"
               >
                  Learn more about {service.title}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
