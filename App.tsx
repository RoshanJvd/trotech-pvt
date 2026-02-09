
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Dynamic SEO handler
  useEffect(() => {
    const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    document.title = `${pageTitle} | Trotech Pvt Ltd Innovative Technology Solutions`;
  }, [currentPage]);

  // CMS State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    logoText: 'Trotech',
    heroTitle: 'Innovative Technology Solutions for Modern Businesses',
    heroSubtitle: 'We empower startups and enterprises with high performance digital solutions. Our team crafts bespoke software that drives growth and operational efficiency.',
    accentColor: '#530000',
    contactEmail: 'codespheresolutions1@gmail.com',
    heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80'
  });

  const [users, setUsers] = useState<User[]>([
    { id: 'ADM001', name: 'Super Admin', email: 'admin@trotech.com', role: UserRole.ADMIN, status: 'ACTIVE' },
    { id: 'DEV001', name: 'Lead Dev', email: 'dev@trotech.com', role: UserRole.DEVELOPER, status: 'ACTIVE' },
    { id: 'CLT001', name: 'Premium Client', email: 'client@trotech.com', role: UserRole.CLIENT, status: 'ACTIVE' }
  ]);

  const [blogs, setBlogs] = useState<BlogPost[]>([
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
      slug: 'ai-enterprise-erp'
    }
  ]);

  const [projects, setProjects] = useState<ProjectSubmission[]>([
    {
      id: 'PRJ001',
      clientName: 'Global Solutions Corp',
      clientEmail: 'contact@globalsol.com',
      projectType: 'Web Development',
      requirements: 'Enterprise grade e commerce platform with AI integration',
      budget: '$50,000 to $100,000',
      timeline: '6 months',
      status: ProjectStatus.IN_PROGRESS,
      submittedAt: new Date().toISOString(),
      assignedDeveloperId: 'DEV001'
    }
  ]);

  const navigate = (page: string, serviceId?: string) => {
    setCurrentPage(page);
    setCurrentServiceId(serviceId || null);
    window.scrollTo(0, 0);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
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
    setProjects(prev => [...prev, newProject]);
    alert(`Inquiry sent. Our team will review your project shortly.`);
    navigate('home');
  };

  const updateProjectStatus = (id: string, status: ProjectStatus) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const assignDeveloper = (projectId: string, developerId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, assignedDeveloperId: developerId } : p));
  };

  const renderContent = () => {
    if (currentPage === 'portal') {
      if (currentUser?.role === UserRole.ADMIN) {
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
      if (currentUser?.role === UserRole.CLIENT) {
        return <ClientDashboard user={currentUser} projects={projects.filter(p => p.clientEmail === currentUser.email)} logout={logout} />;
      }
      if (currentUser?.role === UserRole.DEVELOPER) {
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
      case 'login': return <Login onLogin={setCurrentUser} navigate={navigate} />;
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
        />
      )}
      
      <main className={`flex-grow ${!showNavAndFooter ? 'h-screen overflow-hidden' : ''}`}>
        {renderContent()}
      </main>

      {showNavAndFooter && <Footer navigate={navigate} logoText={siteSettings.logoText} />}
    </div>
  );
};

export default App;
