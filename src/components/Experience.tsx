import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface ExperienceItem { period: string; title: string; company: string; points: string[]; }

const experiences: ExperienceItem[] = [
  {
    period: 'Jan 2026 – Jun 2026',
    title: 'Technical Support Intern',
    company: 'Global IT Providers',
    points: [
      'Configured and managed Linux-based infrastructure across Ubuntu and openSUSE environments, including users, permissions, services, monitoring, and troubleshooting.',
      'Deployed vsftpd, Apache with SSL/HTTPS, MySQL, WordPress, NFS, Samba, FTP, LDAP, and SSH key-based authentication across Linux systems.',
      'Implemented iSCSI target-initiator storage, LVM, Nagios monitoring, Docker/Podman containerization, Jenkins CI/CD, and Bash-based automation.',
    ],
  },
  {
    period: 'Apr 2025 – Dec 2025',
    title: 'Trainee – Linux & Cloud Administration',
    company: 'Unnati Development & Training Centre',
    points: [
      'Managed Linux lab environments using Ubuntu, RHEL, and openSUSE on AWS EC2.',
      'Gained hands-on experience with EC2, networking, Security Groups, EBS, IAM, Linux administration, troubleshooting, and cloud infrastructure.',
    ],
  },
];

const Experience: React.FC = () => {
  const headingRef  = useReveal({ threshold: 0.1 });
  const card0Ref    = useReveal({ threshold: 0.08, delay: '0.1s' });
  const card1Ref    = useReveal({ threshold: 0.08, delay: '0.22s' });
  const cardRefs    = [card0Ref, card1Ref];

  return (
    <section
      id="experience"
      className="scroll-mt-16 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="section-inner container mx-auto px-4 sm:px-6 max-w-4xl">

        {/* Heading */}
        <div ref={headingRef} className="reveal-up text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 font-mono">
            Experience<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Hands-on internship experience in Linux infrastructure and cloud administration
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-5 sm:space-y-6">
          {experiences.map((item, index) => (
            <div key={index} ref={cardRefs[index]} className="reveal-up flex items-start gap-3 sm:gap-4 group">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="text-black" size={16} />
              </div>
              {/* Card */}
              <div className="flex-grow min-w-0 bg-black/40 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-gray-800 group-hover:border-cyan-400/30 transition-all duration-300">
                <span className="text-cyan-400 font-mono text-xs flex items-center gap-1 mb-1">
                  <Calendar size={10} className="text-gray-500" />{item.period}
                </span>
                <h3 className="text-white font-semibold text-sm sm:text-base leading-tight mb-0.5">{item.title}</h3>
                <p className="text-purple-400 text-xs sm:text-sm mb-3">{item.company}</p>
                <ul className="space-y-1.5">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400/70" />{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
