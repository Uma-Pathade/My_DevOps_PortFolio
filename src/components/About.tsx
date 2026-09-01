import React from 'react';
import { Calendar, GraduationCap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const About: React.FC = () => {
  // Three independent observers: heading, left col, right col
  const headingRef = useReveal({ threshold: 0.1 });
  const leftRef    = useReveal<HTMLDivElement>({ threshold: 0.08, delay: '0.12s' });
  const rightRef   = useReveal<HTMLDivElement>({ threshold: 0.08, delay: '0.24s' });

  const skills = [
    { name: 'Linux System Administration', level: 85, color: 'from-cyan-400 to-blue-500' },
    { name: 'Cloud & Infrastructure (AWS)', level: 78, color: 'from-purple-400 to-pink-500' },
    { name: 'Containers & Orchestration',   level: 80, color: 'from-green-400 to-emerald-500' },
    { name: 'CI/CD & Automation',           level: 75, color: 'from-orange-400 to-red-500' },
  ];

  const education = [
    { year: '2023 – 2026', title: 'B.Tech in Computer Science and Engineering',
      institution: 'CSMSS Chh. Shahu College of Engineering, Chh. Sambhajinagar', detail: 'CGPA: 8.30 / 10' },
    { year: '2020 – 2023', title: 'Diploma in Computer Engineering',
      institution: 'Government Polytechnic College, Jalna', detail: 'Percentage: 82.96%' },
    { year: '2019 – 2020', title: 'SSC',
      institution: 'Shri Balaji High School, Chh. Sambhajinagar', detail: 'Percentage: 91.40%' },
  ];

  return (
    <section
      id="about"
      /* scroll-mt accounts for right-side nav height; py keeps section compact */
      className="scroll-mt-16 bg-gradient-to-b from-black to-gray-900"
      style={{ paddingTop: 'clamp(48px, 6vw, 80px)', paddingBottom: 'clamp(48px, 6vw, 80px)' }}
    >
      <div className="section-inner container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Heading */}
        <div ref={headingRef} className="reveal-up text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 font-mono">
            About<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            DevOps-focused engineer passionate about Linux, automation, and reliable infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left — bio + skill bars */}
          <div ref={leftRef} className="reveal-left space-y-5">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-black/60 backdrop-blur-sm p-5 sm:p-7 rounded-xl border border-gray-800 group-hover:border-cyan-400/30 transition-all duration-500">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Who I Am</h3>
                <p className="text-gray-300 leading-relaxed mb-3 text-sm">
                  DevOps-focused Computer Science Engineering student with hands-on experience in
                  Linux system administration, cloud infrastructure, containerization, CI/CD,
                  infrastructure as code, and troubleshooting.
                </p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Experienced with RHEL, Ubuntu, openSUSE, AWS, Docker, Kubernetes, Terraform,
                  Jenkins, GitHub Actions, Bash, and monitoring tools.
                </p>
              </div>
            </div>

            {/* Animated skill bars */}
            <div className="space-y-3">
              {skills.map((skill, i) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-cyan-400 font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`skill-bar h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      style={{
                        '--target-width': `${skill.level}%`,
                        '--bar-delay': `${i * 0.15 + 0.2}s`,
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — education */}
          <div ref={rightRef} className="reveal-right space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Education</h3>
            {education.map((item, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="text-black" size={15} />
                </div>
                <div className="flex-grow min-w-0 bg-black/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-800 group-hover:border-cyan-400/30 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-cyan-400 font-mono text-xs">{item.year}</span>
                    <Calendar size={9} className="text-gray-600 flex-shrink-0" />
                  </div>
                  <h4 className="text-white font-semibold text-xs sm:text-sm leading-snug mb-0.5">{item.title}</h4>
                  <p className="text-purple-400 text-xs mb-0.5">{item.institution}</p>
                  <p className="text-gray-500 text-xs font-mono">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
