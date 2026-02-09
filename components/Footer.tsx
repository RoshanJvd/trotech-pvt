
import React from 'react';

// Added logoText to FooterProps and matched navigate signature to fix props error
interface FooterProps {
  navigate: (page: string, serviceId?: string) => void;
  logoText: string;
}

const Footer: React.FC<FooterProps> = ({ navigate, logoText }) => {
  return (
    <footer className="bg-brand-dark text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center font-bold text-white mr-3">T</div>
              <span className="text-2xl font-bold tracking-tight">{logoText}</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Innovative Technology Solutions for Modern Businesses. Empowering global enterprises with cutting edge engineering.
            </p>
            <div className="flex space-x-4">
               {['fb', 'tw', 'li', 'ig'].map(s => (
                 <div key={s} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-brand-red transition-all">
                    <span className="text-xs font-bold uppercase">{s}</span>
                 </div>
               ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('about')} className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => navigate('blog')} className="text-gray-400 hover:text-white transition-colors">Insights</button></li>
              <li><button onClick={() => navigate('careers')} className="text-gray-400 hover:text-white transition-colors">Careers</button></li>
              <li><button onClick={() => navigate('contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Services</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('services')} className="text-gray-400 hover:text-white transition-colors">Web Apps</button></li>
              <li><button onClick={() => navigate('services')} className="text-gray-400 hover:text-white transition-colors">Mobile Dev</button></li>
              <li><button onClick={() => navigate('services')} className="text-gray-400 hover:text-white transition-colors">Blockchain</button></li>
              <li><button onClick={() => navigate('services')} className="text-gray-400 hover:text-white transition-colors">Cybersecurity</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Contact Us</h4>
            <ul className="space-y-4">
              <li className="text-gray-400">info@trotech pvt.com</li>
              <li className="text-gray-400">+1 (555) 123 4567</li>
              <li className="text-gray-400">123 Tech Avenue, <br/>Innovation City, CA 94105</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">© 2025 {logoText} Pvt Ltd. All rights reserved.</p>
          <div className="flex space-x-8 text-sm text-gray-500">
            <button className="hover:text-white">Privacy Policy</button>
            <button className="hover:text-white">Terms of Service</button>
            <button className="hover:text-white">Cookies Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
