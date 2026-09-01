import React from 'react';
import { useReveal } from '../hooks/useReveal';

interface SkillCategory { title: string; color: string; skills: string[]; }

const skillCategories: SkillCategory[] = [
  { title: 'Linux & System Administration', color: 'from-cyan-400 to-blue-500',
    skills: ['RHEL / Rocky Linux','Ubuntu / openSUSE','Users, Groups & Permissions','ACL / LVM / File Systems','Systemd / SELinux','NFS / Autofs / Samba','Logs & Troubleshooting'] },
  { title: 'Cloud & AWS', color: 'from-purple-400 to-pink-500',
    skills: ['EC2 / EBS / EFS / S3','VPC / Subnets / NAT Gateway','IAM / Security Groups','ALB / ASG / RDS','CloudWatch / Route 53','Lambda / EKS'] },
  { title: 'Containers & Orchestration', color: 'from-green-400 to-emerald-500',
    skills: ['Docker','Docker Compose','Podman / Containerfile','Kubernetes','OpenShift – Fundamentals','Docker Swarm','Container Networking','Volumes & Storage'] },
  { title: 'CI/CD & DevOps', color: 'from-orange-400 to-amber-500',
    skills: ['Jenkins','GitHub Actions','Git / GitHub','CI/CD Pipelines','Docker Hub'] },
  { title: 'Infrastructure as Code', color: 'from-pink-400 to-rose-500',
    skills: ['Terraform','AWS / Azure / GCP','Modules & Workspaces','State Management','Remote Backends'] },
  { title: 'Scripting & Automation', color: 'from-teal-400 to-cyan-500',
    skills: ['Bash / Shell Scripting','Cron Jobs','Text Processing (awk/sed/grep)','Automation Scripts'] },
  { title: 'Monitoring & Observability', color: 'from-violet-400 to-purple-500',
    skills: ['Nagios','Prometheus','Grafana','CloudWatch'] },
  { title: 'Networking, Security & Web', color: 'from-blue-400 to-indigo-500',
    skills: ['IPv4 / IPv6 / SSH / SCP','FirewallD / SSL / HTTPS','LDAP / iSCSI / Rsync','Apache / Nginx','MySQL / PostgreSQL / MongoDB'] },
];

const topSkills = new Set([
  'RHEL / Rocky Linux','Docker','Kubernetes','OpenShift – Fundamentals',
  'Terraform','Jenkins','GitHub Actions','Bash / Shell Scripting',
  'EC2 / EBS / EFS / S3','Prometheus','Grafana','Docker Compose','Podman / Containerfile','Apache / Nginx',
]);

const Skills: React.FC = () => {
  const headingRef = useReveal({ threshold: 0.1 });
  const stripRef   = useReveal({ threshold: 0.1, delay: '0.1s' });
  const gridRef    = useReveal({ threshold: 0.05, delay: '0.2s' });

  return (
    <section
      id="skills"
      className="scroll-mt-16 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="section-inner container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Heading */}
        <div ref={headingRef} className="reveal-up text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 font-mono">
            Skills<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Tools and technologies across the Linux &amp; DevOps stack
          </p>
        </div>

        {/* Top-skills highlight strip */}
        <div ref={stripRef} className="reveal-up flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {['Linux','RHEL','AWS','Docker','Podman','Kubernetes','OpenShift','Terraform',
            'Jenkins','GitHub Actions','Bash','Prometheus','Grafana','CI/CD'].map((s) => (
            <span key={s}
              className="px-3 py-1 text-xs sm:text-sm rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400 font-medium whitespace-nowrap">
              {s}
            </span>
          ))}
        </div>

        {/* Category grid */}
        <div ref={gridRef} className="reveal-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {skillCategories.map((cat, idx) => (
            <div key={cat.title}
              className="group bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-all duration-300 p-4"
              style={{ transitionDelay: `${idx * 0.04}s` }}
            >
              <div className="mb-3">
                <div className={`inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br ${cat.color} mb-2`} />
                <h3 className={`text-xs font-bold bg-gradient-to-r ${cat.color} bg-clip-text text-transparent leading-tight`}>
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span key={skill}
                    className={`px-2 py-0.5 text-xs rounded-md border transition-all duration-200
                      ${topSkills.has(skill)
                        ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:border-cyan-400/60'
                        : 'border-gray-700/50 bg-gray-800/60 text-gray-300 hover:border-cyan-400/30 hover:text-cyan-400'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
