import React, { useState } from 'react';
import { Github, X } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface Project {
  id: number; title: string; description: string;
  highlights: string[]; tech: string[]; github: string; highlightLabel: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Secure Multi-Tier Dockerized Web App with Monitoring',
    description: 'Secure 3-tier containerized application using Nginx, Node.js/Express, and MongoDB with full observability through Prometheus and Grafana.',
    highlights: [
      'Built a secure 3-tier containerized application using Nginx, Node.js/Express, and MongoDB.',
      'Implemented isolated Docker bridge networks for frontend, backend, database, and monitoring.',
      'Integrated Prometheus and Grafana for backend metrics collection and visualization.',
    ],
    tech: ['Docker','Nginx','Node.js','Express.js','MongoDB','Prometheus','Grafana','Linux'],
    github: 'https://github.com/Uma-Pathade/secure-multi-tier-docker-app',
    highlightLabel: 'Network Isolation | Container Security | Monitoring | Observability',
  },
  {
    id: 2,
    title: 'Automated Docker Build & Deployment Pipeline',
    description: 'Fully automated CI/CD pipeline using GitHub Actions to build Docker images, push to Docker Hub, and verify Apache deployment.',
    highlights: [
      'Built an automated CI/CD pipeline using GitHub Actions to build and push Docker images.',
      'Automated container deployment and integration testing using a clean Ubuntu runner.',
      'Implemented Docker Hub authentication via GitHub Secrets and verified deployment using curl.',
    ],
    tech: ['GitHub Actions','Docker','Docker Hub','Ubuntu','Apache','Git'],
    github: 'https://github.com/Uma-Pathade/Docker-CICD-Pipeline-with-GitHubActions-Apache',
    highlightLabel: 'CI/CD | GitHub Actions | Docker | Automation | Integration Testing',
  },
  {
    id: 3,
    title: 'High-Availability WordPress on Terraform',
    description: 'Scalable multi-AZ WordPress infrastructure on AWS provisioned with Terraform — VPC, ALB, ASG, RDS, and EFS.',
    highlights: [
      'Provisioned a scalable multi-AZ WordPress infrastructure using Terraform.',
      'Implemented VPC with public/private subnets, NAT Gateways, ALB, and Auto Scaling Groups.',
      'Integrated RDS MySQL and encrypted EFS with security-group chaining and EC2 bootstrapping.',
    ],
    tech: ['Terraform','AWS','VPC','EC2','ALB','ASG','RDS','EFS','NAT Gateway','IAM'],
    github: 'https://github.com/Uma-Pathade/terraform-aws-wordpress-vpc-asg-alb-rds-efs/tree/main/Terraform-AWS-WordPress-ASG-ALB-RDS-EFS-main',
    highlightLabel: 'IaC | AWS | High Availability | Auto Scaling | Terraform',
  },
];

const tagColor = (tech: string) => {
  const map: Record<string,string> = {
    Docker:'border-blue-500/40 text-blue-400', Kubernetes:'border-blue-400/40 text-blue-300',
    Terraform:'border-purple-500/40 text-purple-400', AWS:'border-orange-500/40 text-orange-400',
    'GitHub Actions':'border-green-500/40 text-green-400', Prometheus:'border-red-500/40 text-red-400',
    Grafana:'border-orange-400/40 text-orange-300', Nginx:'border-green-600/40 text-green-400',
    Jenkins:'border-red-400/40 text-red-300',
  };
  for (const k of Object.keys(map)) if (tech.toLowerCase().includes(k.toLowerCase())) return map[k];
  return 'border-cyan-400/30 text-cyan-400';
};

const Projects: React.FC = () => {
  const headingRef = useReveal({ threshold: 0.1 });
  const gridRef    = useReveal({ threshold: 0.05, delay: '0.12s' });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="scroll-mt-16 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="section-inner container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Heading */}
        <div ref={headingRef} className="reveal-up text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 font-mono">
            Projects<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Real-world DevOps &amp; infrastructure projects
          </p>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="reveal-up grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

          {projects.map((project) => (
            <div key={project.id} className="group">
              <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-cyan-400/50 transition-all duration-400 p-4 sm:p-5 flex flex-col gap-3">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                <div className="relative">
                  <span className="font-mono text-cyan-400 text-xs">~/projects$</span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1 mb-1.5 leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">{project.description}</p>
                </div>
                <p className="relative text-xs text-purple-400 font-mono border-l-2 border-purple-500/40 pl-3 leading-relaxed">
                  {project.highlightLabel}
                </p>
                <div className="relative flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((tech) => (
                    <span key={tech} className={`px-2 py-0.5 text-xs rounded-md border bg-black/30 ${tagColor(tech)}`}>{tech}</span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="px-2 py-0.5 text-xs rounded-md border border-gray-600/40 text-gray-500">+{project.tech.length - 5} more</span>
                  )}
                </div>
                <div className="relative flex flex-wrap items-center gap-3 mt-auto pt-2 border-t border-gray-800/60">
                  <button onClick={() => setSelected(project)}
                    className="text-xs sm:text-sm text-cyan-400 hover:text-white transition-colors duration-200 font-medium">
                    Details →
                  </button>
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                    <Github size={13} /><span>View Project →</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Project 4 — no repo link */}
          <div className="group">
            <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-4 sm:p-5 flex flex-col gap-3">
              <div className="relative">
                <span className="font-mono text-cyan-400 text-xs">~/projects$</span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1 mb-1.5 leading-snug">
                  5-Tier Microservices Voting Application
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Containerized and orchestrated a 5-tier microservices voting application using Docker Compose, deployed and troubleshot on AWS EC2.
                </p>
              </div>
              <p className="relative text-xs text-purple-400 font-mono border-l-2 border-purple-500/40 pl-3 leading-relaxed">
                Microservices | Docker Compose | Redis | PostgreSQL | AWS EC2
              </p>
              <div className="relative flex flex-wrap gap-1.5">
                {['Docker','Docker Compose','Flask','Node.js','.NET Core','Redis'].map((tech) => (
                  <span key={tech} className="px-2 py-0.5 text-xs rounded-md border bg-black/30 border-cyan-400/30 text-cyan-400">{tech}</span>
                ))}
                <span className="px-2 py-0.5 text-xs rounded-md border border-gray-600/40 text-gray-500">+2 more</span>
              </div>
              <div className="relative mt-auto pt-2 border-t border-gray-800/60">
                <span className="text-xs text-gray-600 font-mono">repository coming soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <div className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black rounded-t-2xl sm:rounded-xl border border-gray-800">
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 rounded-full text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <div className="p-5 sm:p-7">
                <span className="font-mono text-cyan-400 text-xs">~/projects$</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 mb-3">{selected.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">{selected.description}</p>
                <div className="mb-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-purple-400 text-xs sm:text-sm font-mono">{selected.highlightLabel}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2 text-sm">Key Details</h4>
                  <ul className="space-y-2">
                    {selected.highlights.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm leading-relaxed">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />{pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {selected.tech.map((tech) => (
                    <span key={tech} className={`px-2.5 py-1 text-xs rounded-full border bg-black/30 ${tagColor(tech)}`}>{tech}</span>
                  ))}
                </div>
                <a href={selected.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                  <Github size={17} /><span>View Project on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
