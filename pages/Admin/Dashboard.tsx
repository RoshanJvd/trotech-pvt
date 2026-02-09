
import { ProjectSubmission, ProjectStatus, SiteSettings, User, BlogPost } from '../../types';
import React, { useState, ChangeEvent, FormEvent } from 'react';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'users' | 'blog' | 'settings' | 'health'>('overview');
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false);
  const [blogPrompt, setBlogPrompt] = useState('');

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteSettings({ ...siteSettings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIBlogGen = async () => {
    if (!blogPrompt) return;
    setIsGeneratingBlog(true);
    
    try {
      const aiResponse: string = await generateBlogDraft(blogPrompt);
      const safeContent: string = aiResponse || "Draft generation failed.";
      
      const newBlog: BlogPost = {
          id: `AI${Date.now()}`,
          title: blogPrompt,
          excerpt: safeContent.substring(0, 150) + "...",
          content: safeContent,
          author: 'AI System',
          authorId: 'SYSTEM',
          publishedAt: new Date().toLocaleDateString(),
          category: 'Innovation',
          imageUrl: `https://picsum.photos/600/400?tech=${Math.floor(Math.random() * 10)}`,
          isPublished: false,
          slug: blogPrompt.toLowerCase().replace(/[^a-z0-9]/g, ' ')
      };
      
      setBlogs([newBlog, ...blogs]);
      setBlogPrompt('');
    } catch (err) {
      console.error("Blog Generation UI Error:", err);
    } finally {
      setIsGeneratingBlog(false);
    }
  };

  const approveUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'ACTIVE' } : u));
  };

  const deleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
        setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-brand-dark">
      {/* Sidebar */}
      <div className="w-72 bg-brand-dark text-white p-8 flex flex-col flex-shrink-0">
        <div className="flex items-center mb-12 logo-container cursor-pointer">
          {siteSettings.logoUrl ? (
            <img src={siteSettings.logoUrl} alt="Logo" className="w-10 h-10 object-contain mr-3" />
          ) : (
            <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center font-bold text-xl mr-3 shadow-lg logo-icon-box">
              {siteSettings.logoText.charAt(0)}
            </div>
          )}
          <span className="text-2xl font-bold tracking-tighter">{siteSettings.logoText.toUpperCase()}</span>
        </div>

        <nav className="flex-grow space-y-2 overflow-y-auto pr-2 scrollbar-hide">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'projects', label: 'Project Control', icon: '📁' },
            { id: 'users', label: 'User Management', icon: '👥' },
            { id: 'blog', label: 'Blog CMS', icon: '✍️' },
            { id: 'health', label: 'System Health', icon: '🛡️' },
            { id: 'settings', label: 'Global Settings', icon: '⚙️' },
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

        <button onClick={logout} className="mt-auto px-6 py-4 bg-gray-800 hover:bg-red-900 rounded-2xl font-bold transition-all text-gray-300 hover:text-white flex items-center justify-center">Sign Out</button>
      </div>

      {/* Main Panel */}
      <div className="flex-grow overflow-y-auto p-12 bg-gray-50">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h1>
          <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 bg-red-50 text-brand-red rounded-full flex items-center justify-center font-bold text-lg">SA</div>
             <div className="pr-4">
                 <span className="font-bold text-brand-dark block text-sm">Super Admin</span>
                 <span className="text-[10px] uppercase font-black text-brand-red tracking-widest">Master Session</span>
             </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'overview' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
                    <p className="text-gray-400 font-bold mb-1 uppercase tracking-widest text-xs">Total Projects</p>
                    <p className="text-5xl font-bold text-brand-dark">{projects.length}</p>
                    </div>
                    <div className="bg-brand-red p-10 rounded-[3rem] shadow-xl text-white">
                    <p className="text-white/70 font-bold mb-1 uppercase tracking-widest text-xs">System Users</p>
                    <p className="text-5xl font-bold">{users.length}</p>
                    </div>
                    <div className="bg-brand-dark p-10 rounded-[3rem] shadow-xl text-white">
                    <p className="text-white/70 font-bold mb-1 uppercase tracking-widest text-xs">Blog Posts</p>
                    <p className="text-5xl font-bold">{blogs.length}</p>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-brand-dark mb-8">AI Marketing Engine</h3>
                    <div className="flex gap-4">
                        <input 
                            value={blogPrompt}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setBlogPrompt(e.target.value)}
                            placeholder="Enter a trending topic for AI blog generation..."
                            className="flex-grow px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-red"
                        />
                        <button 
                            onClick={handleAIBlogGen}
                            disabled={isGeneratingBlog}
                            className={`px-10 py-5 bg-brand-dark text-white rounded-2xl font-bold transition-all shadow-xl ${isGeneratingBlog ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                        >
                            {isGeneratingBlog ? 'Generating...' : 'Auto Build Blog'}
                        </button>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
                <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-10 py-6 text-xs font-black uppercase text-gray-400 tracking-widest">Name</th>
                                <th className="px-10 py-6 text-xs font-black uppercase text-gray-400 tracking-widest">Role</th>
                                <th className="px-10 py-6 text-xs font-black uppercase text-gray-400 tracking-widest">Status</th>
                                <th className="px-10 py-6 text-xs font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 font-bold text-gray-400">{u.name.charAt(0)}</div>
                                            <div>
                                                <p className="font-bold text-brand-dark">{u.name}</p>
                                                <p className="text-xs text-gray-400">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-full text-gray-500">{u.role}</span>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${u.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : u.status === 'PENDING' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right space-x-4">
                                        {u.status === 'PENDING' && (
                                            <button onClick={() => approveUser(u.id)} className="text-xs font-bold text-green-600 hover:underline">Approve</button>
                                        )}
                                        <button onClick={() => deleteUser(u.id)} className="text-xs font-bold text-brand-red hover:underline">Revoke</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-brand-dark mb-10">Brand Identity</h3>
                        <div className="space-y-8">
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Company Logo</label>
                                <div className="flex items-center space-x-6">
                                    <div className="w-24 h-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                        {siteSettings.logoUrl ? (
                                            <img src={siteSettings.logoUrl} className="w-full h-full object-contain p-2" alt="Preview" />
                                        ) : (
                                            <span className="text-gray-300 font-bold">No Logo</span>
                                        )}
                                    </div>
                                    <label className="px-6 py-3 bg-brand-dark text-white rounded-xl font-bold text-sm cursor-pointer hover:bg-gray-800 transition-all">
                                        Upload New
                                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Company Name</label>
                                <input 
                                    type="text" 
                                    value={siteSettings.logoText}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSiteSettings({ ...siteSettings, logoText: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-brand-red font-bold"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-brand-dark mb-10">Hero Configuration</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Headline</label>
                                <textarea 
                                    value={siteSettings.heroTitle}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })}
                                    rows={2}
                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-brand-red font-bold resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Contact Gateway</label>
                                <input 
                                    type="email" 
                                    value={siteSettings.contactEmail}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-brand-red font-bold"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
