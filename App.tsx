import React, { useState, useEffect } from 'react';
import { UserRole, User, ProjectSubmission, ProjectStatus, SiteSettings, BlogPost } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import StartProject from './pages/StartProject';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ClientDashboard from './pages/Client/Dashboard';
import DeveloperDashboard from './pages/Developer/Dashboard';
import { generateSEOContent } from './services/geminiService';

// Toast Notification Component
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => (
  <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right duration-300">
    <div className={`px-8 py-5 rounded-[2rem] shadow-2xl flex items-center space-x-4 border ${type === 'success' ? 'bg-white border-green-100' : 'bg-white border-red-100'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-brand-red'}`}>
        {type === 'success' ? '✓' : '✕'}
      </div>
      <div>
        <p className="font-bold text-brand-dark">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-300 hover:text-gray-500 font-bold ml-4">✕</button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const getStoredData = (key: string, fallback: any) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  };

  const [users, setUsers] = useState<User[]>(() => getStoredData('trotech_users', [
    { id: 'ADM001', name: 'Super Admin', email: 'Admin@trotech.com', role: UserRole.ADMIN, status: 'ACTIVE', joinedAt: '2023 01 01' },
    { id: 'DEV001', name: 'Lead Dev', email: 'dev@trotech.com', role: UserRole.DEVELOPER, status: 'ACTIVE', joinedAt: '2023 05 12' },
    { id: 'CLT001', name: 'Premium Client', email: 'client@trotech.com', role: UserRole.CLIENT, status: 'ACTIVE', joinedAt: '2024 02 20' }
  ]));

  const [blogs, setBlogs] = useState<BlogPost[]>(() => getStoredData('trotech_blogs', [
    {
      id: 'B001',
      title: 'The Future of AI in Enterprise Resource Planning',
      excerpt: 'How artificial intelligence is reshaping the way large scale businesses manage their assets and workflows.',
      content: 'Full content here...',
      author: 'David Chen',
      authorId: 'DEV001',
      publishedAt: '2024 10 12',
      category: 'Innovation',
      imageUrl: 'https://picsum.photos/600/400?tech=4',
      isPublished: true,
      slug: 'ai enterprise erp'
    }
  ]));

  const [projects, setProjects] = useState<ProjectSubmission[]>(() => getStoredData('trotech_projects', [
    {
      id: 'PRJ001',
      clientName: 'Global Solutions Corp',
      clientEmail: 'contact@globalsol.com',
      projectType: 'Web Development',
      requirements: 'Enterprise grade ecommerce platform with AI integration',
      budget: '$50,000 to $100,000',
      timeline: '6 months',
      status: ProjectStatus.IN_PROGRESS,
      submittedAt: new Date().toISOString(),
      assignedDeveloperId: 'DEV001'
    }
  ]));

  // --- SITE SETTINGS CONFIGURATION ---
  // Updated to use the new logo image file
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getStoredData('trotech_settings', {
    logoText: 'TROTECH',
    logoUrl: '/assets/trotech-logo.png', // Updated to reference the image file
    heroTitle: 'Innovative Technology Solutions for Modern Businesses',
    heroSubtitle: 'We empower startups and enterprises with high performance digital solutions. Our team crafts bespoke software that drives growth and operational efficiency.',
    accentColor: '#530000',
    contactEmail: 'codespheresolutions1@gmail.com',
    heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80'
  }));

  useEffect(() => { localStorage.setItem('trotech_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('trotech_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('trotech_blogs', JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem('trotech_settings', JSON.stringify(siteSettings)); }, [siteSettings]);

  useEffect(() => {
    const updateSEO = async () => {
      const pageName = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
      const seo = await generateSEOContent(pageName, `Trotech Pvt Ltd official ${pageName} page`);
      if (seo) {
        document.title = seo.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', seo.metaDescription);
      } else {
        document.title = `${pageName} | Trotech Pvt Ltd Innovative Technology Solutions`;
      }
    };
    updateSEO();
  }, [currentPage]);

  const navigate = (page: string, serviceId?: string) => {
    setCurrentPage(page);
    setCurrentServiceId(serviceId || null);
    window.scrollTo(0, 0);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    showToast("Successfully logged out");
  };

  const handleProjectSubmit = (data: Partial<ProjectSubmission>) => {
    const newProject: ProjectSubmission = {
      id: `PRJ${Math.floor(Math.random() * 9000) + 1000}`,
      clientName: data.clientName || 'Anonymous',
      clientEmail: data.clientEmail || '',
      projectType: data.projectType || 'General',
      requirements: data.requirements || '',
      budget: data.budget || 'Not specified',
      timeline: data.timeline || 'Not specified',
      status: ProjectStatus.PENDING,
      submittedAt: new Date().toISOString()
    };
    
    const newUser: User = {
        id: `USR${Date.now()}`,
        name: data.clientName || 'New Client',
        email: data.clientEmail || '',
        role: UserRole.CLIENT,
        status: 'PENDING',
        joinedAt: new Date().toLocaleDateString()
    };

    setProjects(prev => [...prev, newProject]);
    setUsers(prev => [...prev, newUser]);
    
    showToast("Inquiry sent successfully! Our team will review it shortly.");
    navigate('home');
  };

  const updateProjectStatus = (id: string, status: ProjectStatus) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    showToast(`Project status updated to ${status}`);
  };

  const assignDeveloper = (projectId: string, developerId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, assignedDeveloperId: developerId } : p));
    showToast("Developer assigned successfully");
  };

  const renderContent = () => {
    if (currentPage === 'portal') {
      if (!currentUser) return <Login onLogin={(u) => { setCurrentUser(u); showToast(`Welcome back, ${u.name}`); }} navigate={navigate} />;
      
      if (currentUser.status === 'PENDING') {
          return (
              <div className="flex items-center justify-center h-full bg-gray-50 p-10">
                  <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center max-w-xl">
                      <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse text-3xl">⏳</div>
                      <h2 className="text-3xl font-bold text-brand-dark mb-4">Account Pending Approval</h2>
                      <p className="text-gray-500 mb-8 leading-relaxed">Your project inquiry is being reviewed by our engineering team. Once approved, you will receive full access to the client portal and project roadmap.</p>
                      <button onClick={logout} className="px-10 py-4 bg-brand-dark text-white rounded-2xl font-bold">Return to Website</button>
                  </div>
              </div>
          );
      }

      if (currentUser.role === UserRole.ADMIN) {
        return <AdminDashboard 
          projects={projects} 
          updateProject={updateProjectStatus} 
          assignDev={assignDeveloper} 
          logout={logout}
          siteSettings={siteSettings}
          setSiteSettings={setSiteSettings}
          users={users}
          setUsers={setUsers}
          blogs={blogs}
          setBlogs={setBlogs}
        />;
      }
      if (currentUser.role === UserRole.CLIENT) {
        return <ClientDashboard user={currentUser} projects={projects.filter(p => p.clientEmail === currentUser.email)} logout={logout} />;
      }
      if (currentUser.role === UserRole.DEVELOPER) {
        return <DeveloperDashboard 
          user={currentUser} 
          projects={projects.filter(p => p.assignedDeveloperId === currentUser.id)} 
          logout={logout} 
          blogs={blogs}
          setBlogs={setBlogs}
        />;
      }
    }

    switch (currentPage) {
      case 'home': return <Home navigate={navigate} settings={siteSettings} />;
      case 'about': return <About />;
      case 'services': return <Services navigate={navigate} />;
      case 'service-detail': return <ServiceDetail serviceId={currentServiceId} navigate={navigate} />;
      case 'blog': return <Blog blogs={blogs.filter(b => b.isPublished)} />;
      case 'contact': return <Contact settings={siteSettings} />;
      case 'start-project': return <StartProject onSubmit={handleProjectSubmit} />;
      case 'login': return <Login onLogin={(u) => { setCurrentUser(u); showToast(`Welcome back, ${u.name}`); }} navigate={navigate} />;
      default: return <Home navigate={navigate} settings={siteSettings} />;
    }
  };

  const showNavAndFooter = currentPage !== 'portal';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {showNavAndFooter && (
        <Navbar 
          currentPage={currentPage} 
          navigate={navigate} 
          user={currentUser} 
          logout={logout} 
          logoText={siteSettings.logoText}
          logoUrl={siteSettings.logoUrl}
        />
      )}
      
      <main className={`flex-grow ${!showNavAndFooter ? 'h-screen overflow-hidden' : ''}`}>
        {renderContent()}
      </main>

      {showNavAndFooter && <Footer navigate={navigate} logoText={siteSettings.logoText} logoUrl={siteSettings.logoUrl} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;