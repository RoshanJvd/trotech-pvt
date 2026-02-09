
import React from 'react';
import { SERVICES } from '../constants';

interface ServiceDetailProps {
  serviceId: string | null;
  navigate: (page: string) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, navigate }) => {
  const service = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  const features = [
    "Enterprise integration capabilities",
    "Cloud native architecture",
    "Security first development lifecycle",
    "24 7 maintenance and support",
    "Scalable infrastructure design"
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('services')}
          className="flex items-center text-brand-red font-bold mb-12 hover:translate-x-1 transition-transform"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="w-16 h-16 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center mb-8">
               {service.icon}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-dark mb-8 leading-tight">{service.title}</h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We specialize in building robust {service.title.toLowerCase()} solutions that help businesses thrive in a digital first economy. 
              Our engineering team focuses on performance, security, and exceptional user experience to ensure your success.
            </p>
            
            <div className="space-y-4 mb-12">
               {features.map((f, i) => (
                 <div key={i} className="flex items-center text-lg font-medium text-gray-700">
                    <div className="w-2 h-2 bg-brand-red rounded-full mr-4"></div>
                    {f}
                 </div>
               ))}
            </div>

            <button 
              onClick={() => navigate('start-project')}
              className="px-12 py-5 bg-brand-red text-white text-xl font-bold rounded-full hover:bg-red-900 transition-all shadow-xl"
            >
              Consult an Expert
            </button>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-100 rounded-[4rem] overflow-hidden shadow-2xl">
               <img src={`https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800`} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand-dark p-12 rounded-[3rem] text-white hidden md:block max-w-sm shadow-2xl">
               <p className="text-2xl font-bold mb-4">Why Trotech?</p>
               <p className="text-gray-400 leading-relaxed font-medium">Our methodology combines agile development with enterprise grade stability to deliver results that exceed expectations.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-32 py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-brand-dark">Our Process for {service.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {['Discovery', 'Planning', 'Development', 'Deployment'].map((step, i) => (
                 <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 text-center">
                    <div className="text-brand-red font-bold text-6xl mb-6 opacity-10">0{i+1}</div>
                    <h4 className="text-xl font-bold text-brand-dark mb-2">{step}</h4>
                    <p className="text-sm text-gray-500 font-medium">Ensuring every detail aligns with your business goals.</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
