import React from 'react';
import { Shield, Award, ExternalLink, Eye } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const CERT_CONFIG = {
  rhcsa: { file: '/certificates/rhcsa.pdf', verify: 'https://rhtapps.redhat.com/verify?certId=260-006-648' },
  cla:   { file: '/certificates/cla.pdf',   verify: 'https://linuxacademy.org/verifyCertificate' },
} as const;

type CertId = keyof typeof CERT_CONFIG;

interface CertItem {
  id: CertId; title: string; credentialLabel: string; issuer: string;
  description: string; icon: React.ElementType; iconColor: string;
}

const certifications: CertItem[] = [
  {
    id: 'rhcsa', title: 'Red Hat Certified System Administrator',
    credentialLabel: 'EX200 · ID: 260-006-648', issuer: 'Red Hat',
    description: 'Validates core RHEL administration skills — storage, networking, security, service management, and system troubleshooting.',
    icon: Shield, iconColor: 'from-red-500 to-red-700',
  },
  {
    id: 'cla', title: 'Certified Linux Administrator',
    credentialLabel: 'LX101', issuer: 'Linux Professional Institute (LPI)',
    description: 'Demonstrates practical Linux administration: command line, filesystem, processes, networking, and security fundamentals.',
    icon: Award, iconColor: 'from-cyan-400 to-blue-500',
  },
];

const Certifications: React.FC = () => {
  const headingRef = useReveal({ threshold: 0.1 });
  const card0Ref   = useReveal({ threshold: 0.1, delay: '0.1s' });
  const card1Ref   = useReveal({ threshold: 0.1, delay: '0.22s' });
  const cardRefs   = [card0Ref, card1Ref];

  return (
    <section
      id="certifications"
      className="scroll-mt-16 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="section-inner container mx-auto px-4 sm:px-6 max-w-4xl">

        {/* Heading */}
        <div ref={headingRef} className="reveal-up text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 font-mono">
            Certifications<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Industry-recognized certifications validating Linux &amp; DevOps expertise
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {certifications.map((cert, index) => (
            <div key={cert.id} ref={cardRefs[index]}
              className="reveal-up group bg-black/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-gray-800 hover:border-cyan-400/30 transition-all duration-300 flex flex-col gap-4">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${cert.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                <cert.icon size={22} className="text-white" />
              </div>
              {/* Text */}
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-purple-400 text-sm">{cert.issuer}</p>
                <p className="text-gray-500 text-xs font-mono mt-0.5">{cert.credentialLabel}</p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow">{cert.description}</p>
              {/* Buttons */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/60">
                <a href={CERT_CONFIG[cert.id].file} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all duration-200">
                  <Eye size={12} />View Certificate
                </a>
                <a href={CERT_CONFIG[cert.id].verify} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-all duration-200">
                  <ExternalLink size={12} />Verify
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
