import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, Briefcase, FolderOpen, Award, Mail } from 'lucide-react';

const navItems = [
  { id: 'hero',           label: 'Home',           icon: Home },
  { id: 'about',          label: 'About',          icon: User },
  { id: 'skills',         label: 'Skills',         icon: Code },
  { id: 'experience',     label: 'Experience',     icon: Briefcase },
  { id: 'projects',       label: 'Projects',       icon: FolderOpen },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'contact',        label: 'Contact',        icon: Mail },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [activeSection, setActive]    = useState('hero');
  const [scrolled, setScrolled]       = useState(false);

  /* ── scroll spy ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const mid = window.scrollY + window.innerHeight / 2;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          setActive(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── close mobile menu on resize to desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Desktop: right-side vertical pill (lg+) ── */}
      <nav
        aria-label="Site navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      >
        <div className="flex flex-col gap-3 bg-black/25 backdrop-blur-md rounded-full py-4 px-3 border border-cyan-400/20">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
              className={`
                relative p-3 rounded-full transition-all duration-300 group
                ${activeSection === item.id
                  ? 'bg-cyan-400/20 text-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.25)]'
                  : 'text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10'}
              `}
            >
              <item.icon size={18} />
              {/* Tooltip */}
              <span className="
                pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2
                bg-black/90 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-lg
                whitespace-nowrap opacity-0 group-hover:opacity-100
                transition-opacity duration-200 border border-gray-700/50
              ">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── Mobile / Tablet: hamburger button ── */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          className={`
            fixed top-4 right-4 z-[60] p-3 rounded-full border
            backdrop-blur-md transition-all duration-300
            ${scrolled || isOpen
              ? 'bg-black/70 border-cyan-400/40 text-cyan-400'
              : 'bg-black/30 border-cyan-400/20 text-cyan-400'}
          `}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Fullscreen overlay */}
        <div
          className={`
            fixed inset-0 z-50 bg-black/95 backdrop-blur-xl
            flex flex-col items-center justify-center
            transition-all duration-300
            ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          aria-hidden={!isOpen}
        >
          {/* Brand name at top */}
          <div className="absolute top-6 left-6">
            <span className="font-mono text-cyan-400 text-sm tracking-widest">UMA PATHADE</span>
          </div>

          <nav className="flex flex-col items-center gap-2 w-full px-8">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`
                  flex items-center gap-4 w-full max-w-xs px-6 py-4 rounded-xl
                  text-lg font-medium transition-all duration-200
                  ${activeSection === item.id
                    ? 'bg-cyan-400/15 text-cyan-400 border border-cyan-400/30'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-white/5 border border-transparent'}
                `}
                style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Quick contact at bottom */}
          <div className="absolute bottom-8 flex gap-4 text-xs text-gray-600">
            <a href="mailto:umapathade2@gmail.com?subject=DevOps%20Opportunity"
               className="hover:text-cyan-400 transition-colors">
              umapathade2@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
