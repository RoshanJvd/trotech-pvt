
import React from 'react';
import { User, ProjectSubmission, ProjectStatus } from '../../types';

interface ClientDashboardProps {
  user: User;
  projects: ProjectSubmission[];
  logout: () => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, projects, logout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold text-brand-dark mb-2">Welcome back, {user.name}</h1>
            <p className="text-gray-500 font-medium">Track your project roadmap and collaborate with our team</p>
          </div>
          <button onClick={logout} className="px-6 py-3 border border-gray-200 rounded-2xl font-bold hover:bg-white hover:shadow-lg transition-all">Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-bold text-brand-dark">Active Projects</h3>
            {projects.length > 0 ? projects.map(p => (
              <div key={p.id} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-xs font-bold text-brand-red bg-red-50 px-3 py-1 rounded-full mb-3 inline-block uppercase">Ref: {p.id}</span>
                    <h4 className="text-3xl font-bold text-brand-dark">{p.projectType}</h4>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-bold text-gray-400 mb-1">STATUS</span>
                    <span className="text-xl font-bold text-brand-dark">{p.status}</span>
                  </div>
                </div>

                <div className="w-full bg-gray-100 h-3 rounded-full mb-12 relative overflow-hidden">
                   <div className={`h-full bg-brand-red transition-all duration-1000 ${
                     p.status === ProjectStatus.PENDING ? 'w-1/12' : 
                     p.status === ProjectStatus.IN_PROGRESS ? 'w-1/2' : 'w-full'
                   }`}></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400">Lead Developer</p>
                      <p className="font-bold text-brand-dark">{p.assignedDeveloperId ? 'Senior Engineering Lead' : 'Assigning Team...'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400">Target Launch</p>
                      <p className="font-bold text-brand-dark">{p.timeline}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                   <button className="flex-1 py-4 bg-brand-dark text-white rounded-2xl font-bold hover:bg-gray-800 transition-all">Message Team</button>
                   <button className="flex-1 py-4 bg-gray-100 text-brand-dark rounded-2xl font-bold hover:bg-gray-200 transition-all">Shared Files</button>
                </div>
              </div>
            )) : (
              <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-gray-300 text-center">
                 <p className="text-xl font-bold text-gray-400">No active projects found</p>
                 <p className="text-gray-400 mb-8 text-sm">Submit your first project inquiry to get started</p>
                 <button className="px-10 py-4 bg-brand-red text-white rounded-2xl font-bold">Start New Project</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-brand-dark text-white p-10 rounded-[2.5rem] shadow-xl">
               <h4 className="text-xl font-bold mb-6">Need Support?</h4>
               <p className="text-gray-400 text-sm mb-8 leading-relaxed">Our dedicated account managers are available 24/7 for premium enterprise clients.</p>
               <button className="w-full py-4 bg-brand-red text-white rounded-2xl font-bold hover:bg-red-800 transition-all">Priority Chat</button>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
               <h4 className="text-xl font-bold text-brand-dark mb-6">Recent Documents</h4>
               <div className="space-y-4">
                  {[
                    { name: 'Architecture Design.pdf', size: '2.4 MB' },
                    { name: 'Project Roadmap.xlsx', size: '1.1 MB' },
                    { name: 'Branding Guidelines.zip', size: '15.2 MB' }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-red-50 transition-all group">
                       <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400 mr-3 group-hover:text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                          <div>
                            <p className="text-sm font-bold text-brand-dark truncate w-32">{doc.name}</p>
                            <p className="text-xs text-gray-400 font-medium">{doc.size}</p>
                          </div>
                       </div>
                       <svg className="w-5 h-5 text-gray-300 group-hover:text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
