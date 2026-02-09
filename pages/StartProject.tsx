
import React, { useState } from 'react';
import { ProjectSubmission } from '../types';

interface StartProjectProps {
  onSubmit: (data: Partial<ProjectSubmission>) => void;
}

const StartProject: React.FC<StartProjectProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProjectSubmission>>({
    clientName: '',
    clientEmail: '',
    projectType: 'Web Development',
    requirements: '',
    budget: '',
    timeline: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Contact Details</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-red focus:bg-white outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-red focus:bg-white outline-none transition-all"
              />
            </div>
            <button onClick={nextStep} className="w-full py-5 bg-brand-dark text-white rounded-2xl font-bold hover:bg-gray-800 transition-all">Continue</button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Project Scope</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type</label>
              <select 
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-red focus:bg-white outline-none transition-all"
              >
                <option>Web Development</option>
                <option>Mobile App Development</option>
                <option>UI UX Design</option>
                <option>Blockchain Web3 Solutions</option>
                <option>CRM Automation</option>
                <option>Cybersecurity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Requirements</label>
              <textarea 
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                placeholder="Describe what you want to build..."
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-red focus:bg-white outline-none transition-all"
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 py-5 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all">Back</button>
              <button onClick={nextStep} className="flex-1 py-5 bg-brand-dark text-white rounded-2xl font-bold hover:bg-gray-800 transition-all">Continue</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Budget & Timeline</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Budget</label>
              <input 
                type="text" 
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. $10,000 to $25,000"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-red focus:bg-white outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Timeline</label>
              <input 
                type="text" 
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g. 3 months"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-red focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 py-5 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all">Back</button>
              <button onClick={() => onSubmit(formData)} className="flex-1 py-5 bg-brand-red text-white rounded-2xl font-bold hover:bg-red-900 transition-all shadow-xl">Submit Inquiry</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-2xl border border-gray-100">
          <div className="mb-12">
             <div className="flex items-center justify-between mb-8">
               {[1, 2, 3].map((s) => (
                 <div key={s} className="flex flex-col items-center">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-400'}`}>
                     {s}
                   </div>
                   <div className="h-1 w-24 bg-gray-100 mt-2 rounded-full overflow-hidden">
                      <div className={`h-full bg-brand-red transition-all duration-500 ${step >= s ? 'w-full' : 'w-0'}`}></div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          {renderStep()}
        </div>
        <p className="text-center text-gray-500 mt-8 text-sm">
          Secure and confidential. Our team handles every submission with privacy.
        </p>
      </div>
    </div>
  );
};

export default StartProject;
