import React, { useEffect, useState } from 'react';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import GlitchText from './GlitchText';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    const onMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth  - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 16,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('mousemove', onMove); };
  }, []);

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  const socials = [
    { icon: Github,   href: 'https://github.com/Uma-Pathade',                             label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/umapathade/',                     label: 'LinkedIn' },
    { icon: Mail,     href: 'mailto:umapathade2@gmail.com?subject=DevOps%20Opportunity',  label: 'Email' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      <ParticleBackground />

      {/* Parallax orb — desktop only so it doesn't affect mobile layout */}
      <div
        className="hidden md:block absolute top-1/4 right-1/4 w-36 h-36 lg:w-48 lg:h-48 rounded-full
                   bg-gradient-to-br from-cyan-400 to-purple-500 opacity-10 blur-2xl pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/*
        Content wrapper.
        - NO vertical padding (py-*) so flex centering is exact.
        - px for horizontal gutters on small screens.
        - max-w keeps text from stretching on ultra-wide screens.
      */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 sm:px-6 text-center">

        {/* ── Name ── */}
        <div className={`mb-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <GlitchText
            text="UMA PATHADE"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-mono
                       bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          />
        </div>

        {/* ── Title ── */}
        <div className={`mb-2 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-200 font-light tracking-wide">
            Linux &amp; DevOps Engineer
          </p>
        </div>

        {/* ── Subtitle ── */}
        <div className={`mb-5 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            RHCSA &amp; CLA Certified&nbsp;·&nbsp;Linux&nbsp;·&nbsp;AWS&nbsp;·&nbsp;Docker&nbsp;·&nbsp;Terraform
            &nbsp;·&nbsp;Kubernetes&nbsp;·&nbsp;OpenShift&nbsp;·&nbsp;CI/CD
          </p>
        </div>

        {/* ── Terminal card ── compact, tight line-spacing ── */}
        <div className={`
          mx-auto mb-5 w-full max-w-[290px] sm:max-w-xs text-left
          bg-black/70 backdrop-blur-sm border border-cyan-400/20 rounded-xl
          p-3 sm:p-4 font-mono text-xs shadow-lg shadow-cyan-400/5
          transition-all duration-700 delay-250
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {/* Window chrome dots */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500/90" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/90" />
            <span className="w-2 h-2 rounded-full bg-green-500/90" />
            <span className="text-gray-600 text-xs ml-1.5">uma@devops ~</span>
          </div>

          {/* whoami */}
          <p>
            <span className="text-purple-400">uma@devops</span>
            <span className="text-gray-600">:~$</span>
            <span className="text-cyan-400"> whoami</span>
          </p>
          <p className="text-gray-300 mb-1.5 pl-1">Uma Pathade</p>

          {/* certs */}
          <p>
            <span className="text-purple-400">uma@devops</span>
            <span className="text-gray-600">:~$</span>
            <span className="text-cyan-400"> cat certs.txt</span>
          </p>
          <p className="text-gray-300 mb-1.5 pl-1">RHCSA &nbsp;|&nbsp; CLA</p>

          {/* stack */}
          <p>
            <span className="text-purple-400">uma@devops</span>
            <span className="text-gray-600">:~$</span>
            <span className="text-cyan-400"> cat stack.txt</span>
          </p>
          <p className="text-gray-300 mb-1.5 pl-1">
            Linux · AWS · Docker · Terraform<br />
            Kubernetes · OpenShift · CI/CD
          </p>

          {/* status */}
          <p>
            <span className="text-purple-400">uma@devops</span>
            <span className="text-gray-600">:~$</span>
            <span className="text-cyan-400"> systemctl status career</span>
          </p>
          <p className="pl-1">
            <span className="text-green-400">●</span>
            <span className="text-gray-300"> Open to DevOps Opportunities</span>
          </p>
        </div>

        {/* ── Social icons ── */}
        <div className={`flex justify-center gap-3 mb-4 transition-all duration-700 delay-350 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              className="p-2.5 bg-black/30 backdrop-blur-sm rounded-full border border-cyan-400/20
                         text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5
                         transition-all duration-300 group"
            >
              <Icon size={19} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
          ))}
        </div>

        {/* ── CTA buttons ── */}
        <div className={`
          flex flex-col sm:flex-row justify-center gap-3
          transition-all duration-700 delay-450
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
        `}>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5
                       bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold
                       rounded-full hover:opacity-90 transition-all duration-300
                       shadow-md shadow-cyan-400/20 text-sm"
          >
            <FileText size={16} />
            Download Resume
          </a>
          <button
            onClick={scrollToProjects}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5
                       border border-cyan-400/40 text-cyan-400 font-semibold
                       rounded-full hover:bg-cyan-400/10 hover:border-cyan-400/70
                       transition-all duration-300 text-sm"
          >
            View Projects
          </button>
        </div>
      </div>

      {/* ── Scroll arrow ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce opacity-40 pointer-events-none">
        <ArrowDown className="text-cyan-400" size={22} />
      </div>

      {/* ── Static background glow blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-16 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-400/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-16 w-56 sm:w-80 h-56 sm:h-80 bg-purple-500/4 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;
