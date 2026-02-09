
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Vision section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-brand-dark mb-10 tracking-tight">We build the future of <span className="text-brand-red underline decoration-8 decoration-brand-red/10 underline-offset-8">Enterprise Technology</span></h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                   At Trotech, we believe that technology should be an enabler of business vision, not a bottleneck. Founded in 2013, our mission has been to provide sophisticated, scalable software solutions for modern challenges.
                </p>
                <div className="grid grid-cols-2 gap-8">
                   <div>
                     <h4 className="text-3xl font-bold text-brand-red mb-2">12+</h4>
                     <p className="text-gray-500 font-medium">Years in Market</p>
                   </div>
                   <div>
                     <h4 className="text-3xl font-bold text-brand-red mb-2">300+</h4>
                     <p className="text-gray-500 font-medium">Success Stories</p>
                   </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden">
                  <img src="https://picsum.photos/800/800?tech=1" alt="Trotech Office" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-brand-red p-10 rounded-[2rem] text-white hidden md:block shadow-2xl">
                   <p className="text-3xl font-bold">Innovation first</p>
                   <p className="text-white/80 font-medium">is our cultural core</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-24 bg-brand-dark text-white rounded-t-[5rem]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-16 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: 'Customer Success', desc: 'Your growth is our primary metric for success. We partner with you for the long term.' },
                 { title: 'Agile Mindset', desc: 'We adapt rapidly to changing markets to ensure your solutions remain future proof.' },
                 { title: 'Absolute Integrity', desc: 'Transparency in communication and development is the bedrock of our trust.' }
               ].map((v, i) => (
                 <div key={i} className="bg-gray-800 p-10 rounded-[2.5rem] border border-gray-700">
                    <h3 className="text-2xl font-bold text-brand-red mb-4">{v.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-medium">{v.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
