
import React from 'react';
import { BlogPost } from '../types';

// Defined BlogProps to fix missing blogs prop error in App.tsx
interface BlogProps {
  blogs: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ blogs }) => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-dark mb-8">Engineering Insights</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">Thought leadership on the latest trends in technology and digital transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="aspect-[16/10] bg-gray-100 rounded-[2.5rem] overflow-hidden mb-8 relative">
                 <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-brand-red uppercase tracking-widest">{post.category}</div>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4 leading-tight group-hover:text-brand-red transition-colors">{post.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed font-medium line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                 <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <span className="text-sm font-bold text-brand-dark">{post.author}</span>
                 </div>
                 <span className="text-sm font-medium text-gray-400">{post.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-gray-50 rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center">
           <h3 className="text-3xl font-bold text-brand-dark mb-6">Subscribe to our Newsletter</h3>
           <p className="text-lg text-gray-500 mb-10 max-w-xl">Get the latest technical articles and company updates delivered straight to your inbox.</p>
           <form className="w-full max-w-md flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-8 py-5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-red transition-all"
              />
              <button className="px-10 py-5 bg-brand-red text-white font-bold rounded-2xl hover:bg-red-800 transition-all shadow-xl">Join Now</button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
