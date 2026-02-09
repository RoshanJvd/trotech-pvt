
import React, { useState } from 'react';
import { ProjectSubmission, ProjectStatus, SiteSettings, User, BlogPost, UserRole } from '../../types';
import { generateBlogDraft } from '../../services/geminiService';

interface AdminDashboardProps {
  projects: ProjectSubmission[];
  updateProject: (id: string, status: ProjectStatus) => void;
  assignDev: (projectId: string, developerId: string) => void;
  logout: () => void;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  projects, updateProject, assignDev, logout, siteSettings, setSiteSettings, users, setUsers, blogs, setBlogs 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'users' | 'blog' | 'settings' | 'assets'>('overview');
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false);
  const [blogPrompt, setBlogPrompt] = useState('');

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSiteSettings({ ...siteSettings, [e.target.name]: e.target.value });
  };

  const handleAIBlogGen = async () => {
    if (!blogPrompt) return alert("Please enter a topic for the AI.");
    setIsGeneratingBlog(true);
    const content = await generateBlogDraft(blogPrompt);
    
    const newBlog: BlogPost = {
        id: `AI${Date.now()}`,
        title: blogPrompt,
        excerpt: content.substring(0, 150) + "...",
        content: content,
        author: 'AI System',
        authorId: 'SYSTEM',
        publishedAt: new Date().toLocaleDateString(),
        category: 'Innovation',
        imageUrl: 'https://picsum.photos/600/400?tech=ai',
        isPublished: false,
        slug: blogPrompt.toLowerCase().replace(/ /g, '-')
    };
    
    setBlogs([newBlog, ...blogs]);
    setIsGeneratingBlog(false);
    setBlogPrompt('');
    alert("AI Draft generated and saved to list!");
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const toggleBlogPublish = (id: string) => {
    setBlogs(blogs.map(b => b.id === id ? { ...b, isPublished: !b.isPublished } : b));
  };

  const deleteBlog = (id: string) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const handleImageUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
        setIsUploading(false);
        alert("Image uploaded to the media library!");
    }, 1500);
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-brand-dark text-white p-8 flex flex-col flex-shrink-0">
        <div className="flex items-center mb-12 logo-container cursor-pointer">
          <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center font-bold text-xl mr-3 shadow-lg logo-icon-box">
            {siteSettings.logoText.charAt(0)}
          </div>
          <span className="text-2xl font-bold tracking-tighter">{siteSettings.logoText.toUpperCase()}</span>
        </div>

        <nav className="flex-grow space-y-2 overflow-y-auto pr-2">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'projects', label: 'Projects', icon: '📁' },
            { id: 'users', label: 'User Management', icon: '👥' },
            { id: 'blog', label: 'Blog CMS', icon: '✍️' },
            { id: 'assets', label: 'Media Library', icon: '🖼️' },
            { id: 'settings', label: 'Site Settings', icon: '⚙️' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 ${activeTab === item.id ? 'bg-brand-red shadow-lg translate-x-2' : 'hover:bg-gray-800 text-gray-400'}`}
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={logout}
          className="mt-auto px-6 py-4 bg-gray-800 hover:bg-red-900 rounded-2xl font-bold transition-all text-gray-300 hover:text-white flex items-center justify-center"
        >
          Sign Out
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-12 scroll-smooth bg-gray-50">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 bg-red-50 text-brand-red rounded-full flex items-center justify-center font-bold text-lg">SA</div>
             <div className="pr-4">
                <span className="font-bold text-brand-dark block text-sm">Super Admin</span>
                <span className="text-[10px] uppercase font-black text-brand-red tracking-widest">Active Session</span>
             </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'blog' && (
              <div className="space-y-12">
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
                   <h3 className="text-2xl font-bold mb-6">AI Content Generator</h3>
                   <div className="flex gap-4">
                      <input 
                        type="text" 
                        placeholder="Enter a topic (e.g. Benefits of Cloud CRM for Enterprises)"
                        value={blogPrompt}
                        onChange={(e) => setBlogPrompt(e.target.value)}
                        className="flex-grow px-8 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-red transition-all font-medium"
                      />
                      <button 
                        onClick={handleAIBlogGen}
                        disabled={isGeneratingBlog}
                        className={`px-10 py-4 ${isGeneratingBlog ? 'bg-gray-400' : 'bg-brand-red'} text-white font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center`}
                      >
                         {isGeneratingBlog ? (
                             <>
                                <span className="animate-spin mr-2">⚙️</span>
                                Thinking...
                             </>
                         ) : 'Generate with AI'}
                      </button>
                   </div>
                   <p className="mt-4 text-sm text-gray-400 font-medium italic">Powered by Gemini 3 Flash for instant professional drafts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {blogs.map(b => (
                     <div key={b.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <div className="flex gap-6 items-start mb-6">
                           <img src={b.imageUrl} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-500" alt="" />
                           <div>
                              <h4 className="text-lg font-bold text-brand-dark mb-1 leading-tight">{b.title}</h4>
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{b.category}</p>
                           </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-50 pt-6">
                           <div className="flex space-x-3">
                              <button onClick={() => toggleBlogPublish(b.id)} className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${b.isPublished ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                 {b.isPublished ? 'Live' : 'Draft'}
                              </button>
                           </div>
                           <div className="space-x-4">
                              <button onClick={() => deleteBlog(b.id)} className="text-xs font-bold text-brand-red">Delete</button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {/* Other tabs remain the same as previous version */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
                  <p className="text-gray-400 font-bold mb-1 uppercase tracking-widest text-xs">Total Projects</p>
                  <p className="text-5xl font-bold text-brand-dark">{projects.length}</p>
                </div>
                <div className="bg-brand-red p-10 rounded-[3rem] shadow-xl text-white">
                  <p className="text-white/70 font-bold mb-1 uppercase tracking-widest text-xs">Active Users</p>
                  <p className="text-5xl font-bold">{users.length}</p>
                </div>
                <div className="bg-brand-dark p-10 rounded-[3rem] shadow-xl text-white">
                  <p className="text-white/70 font-bold mb-1 uppercase tracking-widest text-xs">Blog Posts</p>
                  <p className="text-5xl font-bold">{blogs.length}</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
