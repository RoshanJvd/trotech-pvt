import React from 'react';

interface FooterProps {
  navigate: (page: string) => void;
  logoText: string;
  logoUrl: string;
}

const Footer: React.FC<FooterProps> = ({ navigate, logoText, logoUrl }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">

              <img
                src={logoUrl}
                alt={logoText}
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  console.error("Footer logo failed to load:", logoUrl);
                  e.currentTarget.style.display = "none";

                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement | null;

                  if (fallback) {
                    fallback.classList.remove("hidden");
                    fallback.classList.add("flex");
                  }
                }}
              />

              {/* Fallback */}
              <div className="hidden w-12 h-12 bg-white rounded-xl items-center justify-center text-brand-dark font-black text-xl">
                {logoText.charAt(0)}
              </div>

              <span className="text-3xl font-black tracking-tight">
                {logoText}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-md">
              Empowering businesses through innovative technology solutions.
              We build scalable, high-performance software that drives growth
              and transforms operations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("about")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("services")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("blog")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("contact")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get Started</h3>

            <button
              onClick={() => navigate("start-project")}
              className="w-full px-6 py-3 bg-white text-brand-dark rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              Start a Project
            </button>

            <button
              onClick={() => navigate("portal")}
              className="w-full mt-3 px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Client Portal
            </button>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} {logoText} Pvt Ltd. All rights reserved.
            Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;