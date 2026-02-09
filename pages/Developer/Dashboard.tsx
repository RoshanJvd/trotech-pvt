
import React, { useState } from 'react';
import { User, ProjectSubmission, BlogPost } from '../../types';

interface DeveloperDashboardProps {
  user: User;
  projects: ProjectSubmission[];
  logout: () => void;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const DeveloperDashboard: React.FC<DeveloperDashboardProps> = ({ user, projects, logout, blogs, setBlogs }) => {
  const [activeView, setActiveView] = useState<'work' | 'blogs'>('work');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogTopic, setBlogTopic] = useState('');

  const submitBlogRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: BlogPost = {
      id: `B${Math.floor(Math.random() * 900) + 100}`,
      title: blogTitle,
      excerpt: `Draft content about ${blogTopic}`,
      content: '',
      author: user.name,
      authorId: user.id,
      publishedAt: '',
      category: 'Engineering',
      imageUrl: 'https://picsum.photos/600/400?tech=10',
      isPublished: false,
      slug: blogTitle.toLowerCase().replace(/ /g, '-'),
      requestStatus: 'PENDING_APPROVAL'
    };
    setBlogs([...blogs, newRequest]);
    setBlogTitle('');
    setBlogTopic('');
    alert('Blog submission request sent to Admin!');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="w-20 md:w-64 bg-white border-r border-gray-100 flex flex-col p-6 space-y-8 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-10 overflow-hidden">
           <div className="w-10 h-10 bg-brand-red rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-white">T</div>
           <span className="hidden md:block font-bold text-xl tracking-tight text-brand-dark">Trotech Dev</span>
        </div>

        <nav className="space-y-2 flex-grow">
           <button onClick={() => setActiveView('work')} className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeView === 'work' ? 'bg-red-50 text-brand-red font-bold' : 'text-gray-500 hover:bg-gray-50 font-medium'}`}>
              <span className="w-6 mr-3 text-lg">🏠</span>
              <span className="hidden md:block">Workspace</span>
           </button>
           <button onClick={() => setActiveView('blogs')} className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeView === 'blogs' ? 'bg-red-50 text-brand-red font-bold' : 'text-gray-500 hover:bg-gray-50 font-medium'}`}>
              <span className="w-6 mr-3 text-lg">✍️</span>
              <span className="hidden md:block">Blog Drafts</span>
           </button>
        </nav>

        <button onClick={logout} className="w-full py-4 text-gray-400 font-bold hover:text-brand-red transition-all">Sign Out</button>
      </div>

      <div className="flex-grow flex flex-col overflow-hidden">
         <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 flex-shrink-0">
            <h2 className="text-xl font-bold text-brand-dark capitalize">{activeView === 'work' ? 'Engineering Workspace' : 'Blog Contributions'}</h2>
            <div className="flex items-center space-x-6">
               <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                     <p className="text-sm font-bold text-brand-dark">{user.name}</p>
                     <p className="text-xs text-gray-400">Senior Engineer</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
               </div>
            </div>
         </header>

         <main className="flex-grow overflow-y-auto p-10">
            {activeView === 'work' ? (
              <div className="space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-brand-red p-8 rounded-[2rem] text-white shadow-2xl">
                       <p className="text-white/70 font-bold mb-1 uppercase text-xs">Assigned Tasks</p>
                       <p className="text-4xl font-bold">{projects.length * 3 + 2}</p>
                    </div>
                    <div className="bg-brand-dark p-8 rounded-[2rem] text-white shadow-2xl">
                       <p className="text-white/70 font-bold mb-1 uppercase text-xs">Active Projects</p>
                       <p className="text-4xl font-bold">{projects.length}</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl">
                       <p className="text-gray-400 font-bold mb-1 uppercase text-xs">Hours Logged</p>
                       <p className="text-4xl font-bold text-brand-dark">164</p>
                    </div>
                 </div>

                 <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-50">
                    <h3 className="text-2xl font-bold text-brand-dark mb-8">Current Roadmap</h3>
                    {projects.map(p => (
                      <div key={p.id} className="p-8 bg-gray-50 rounded-[2.5rem] mb-6">
                         <div className="flex justify-between items-center mb-6">
                            <h4 className="text-2xl font-bold text-brand-dark">{p.projectType}</h4>
                            <span className="text-xs font-bold text-gray-400">ID: {p.id}</span>
                         </div>
                         <div className="space-y-4">
                            {['Implement API Gateway', 'Setup CI/CD Pipeline', 'Optimizing Database Queries'].map((task, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                                 <span className="font-semibold text-brand-dark">{task}</span>
                                 <button className="text-xs font-bold text-brand-red hover:underline">Complete</button>
                              </div>
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            ) : (
              <div className="max-w-3xl">
                 <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 mb-12">
                    <h3 className="text-2xl font-bold mb-8 text-brand-dark">Request New Blog Post</h3>
                    <form className="space-y-6" onSubmit={submitBlogRequest}>
                       <div>
                          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Post Title</label>
                          <input 
                             value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required
                             className="w-full px-6 py-4 bg-gray-50 border rounded-2xl font-bold outline-none"
                             placeholder="e.g. Scaling React Native Apps"
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Topic / Content Brief</label>
                          <textarea 
                             value={blogTopic} onChange={(e) => setBlogTopic(e.target.value)} required rows={4}
                             className="w-full px-6 py-4 bg-gray-50 border rounded-2xl font-bold outline-none"
                             placeholder="What is this post about?"
                          />
                       </div>
                       <button type="submit" className="w-full py-5 bg-brand-red text-white font-bold rounded-2xl shadow-xl">Submit for Approval</button>
                    </form>
                 </div>

                 <h3 className="text-xl font-bold mb-6 text-brand-dark">Your Drafts & Submissions</h3>
                 <div className="space-y-4">
                    {blogs.filter(b => b.authorId === user.id).map(b => (
                      <div key={b.id} className="bg-white p-6 rounded-2xl flex justify-between items-center shadow-sm">
                         <div>
                            <p className="font-bold text-brand-dark">{b.title}</p>
                            <p className="text-xs text-gray-400 font-medium">Status: {b.requestStatus || 'Approved'}</p>
                         </div>
                         <button className="text-sm font-bold text-brand-dark hover:underline">Edit Content</button>
                      </div>
                    ))}
                 </div>
              </div>
            )}
         </main>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
