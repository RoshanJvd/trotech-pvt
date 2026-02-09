
import React from 'react';
import { SiteSettings } from '../types';

interface ContactProps {
  settings: SiteSettings;
}

const Contact: React.FC<ContactProps> = ({ settings }) => {
  return (
    <div className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
           <div>
              <h1 className="text-6xl md:text-8xl font-bold text-brand-dark mb-10 tracking-tight">Let's connect</h1>
              <p className="text-2xl text-gray-500 mb-16 leading-relaxed font-medium">
                 Ready to take your business to the next level? Our technical experts are waiting to hear from you.
              </p>

              <div className="space-y-12">
                 <div className="flex items-start">
                    <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-brand-red mr-8 flex-shrink-0 shadow-sm">
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                       <h4 className="text-2xl font-bold text-brand-dark mb-2">Direct Inquiry</h4>
                       <p className="text-xl text-gray-500 font-bold hover:text-brand-red cursor-pointer transition-colors">{settings.contactEmail}</p>
                       <p className="text-xs text-gray-400 font-bold uppercase mt-2">Mon Fri 9am 6pm EST</p>
                    </div>
                 </div>
                 <div className="flex items-start">
                    <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-brand-red mr-8 flex-shrink-0 shadow-sm">
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                       <h4 className="text-2xl font-bold text-brand-dark mb-2">Headquarters</h4>
                       <p className="text-xl text-gray-500 font-medium leading-relaxed">123 Tech Avenue, Suite 500 <br/>San Francisco, CA 94105</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-gray-50 p-12 md:p-20 rounded-[4rem] border border-gray-100 shadow-2xl relative">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl"></div>
              <form className="space-y-8 relative" onSubmit={(e) => {
                e.preventDefault();
                alert(`Your message has been sent to ${settings.contactEmail}`);
              }}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">First Name</label>
                       <input required type="text" className="w-full px-8 py-5 bg-white border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-brand-red shadow-sm font-bold" placeholder="John" />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Last Name</label>
                       <input required type="text" className="w-full px-8 py-5 bg-white border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-brand-red shadow-sm font-bold" placeholder="Doe" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Email Address</label>
                    <input required type="email" className="w-full px-8 py-5 bg-white border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-brand-red shadow-sm font-bold" placeholder="john@company.com" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Message Brief</label>
                    <textarea required rows={6} className="w-full px-8 py-5 bg-white border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-brand-red shadow-sm font-bold resize-none" placeholder="Describe your project or inquiry..."></textarea>
                 </div>
                 <button className="w-full py-6 bg-brand-dark text-white text-xl font-bold rounded-[2rem] hover:bg-gray-800 transition-all shadow-2xl active:scale-95">Send Message</button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
