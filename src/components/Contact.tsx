import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, FileText } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const Contact: React.FC = () => {
  const headingRef  = useReveal({ threshold: 0.1 });
  const leftRef     = useReveal<HTMLDivElement>({ threshold: 0.08, delay: '0.1s' });
  const rightRef    = useReveal<HTMLDivElement>({ threshold: 0.08, delay: '0.22s' });

  const [formData, setFormData]     = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [errorMsg, setErrorMsg]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const formEl = e.target as HTMLFormElement;
      const data   = new FormData(formEl);
      const key    = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

      if (!key) {
        setErrorMsg('Form not configured. Please email umapathade2@gmail.com directly.');
        setSubmitting(false);
        return;
      }
      data.append('access_key', key);

      const res    = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        formEl.reset();
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(`Something went wrong: ${result.message ?? 'unknown error'}`);
      }
    } catch {
      setErrorMsg('Network error — please try again or email me directly.');
    }
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const contactInfo = [
    { icon: Mail,   label: 'Email',    value: 'umapathade2@gmail.com',                  href: 'mailto:umapathade2@gmail.com?subject=DevOps%20Opportunity' },
    { icon: Phone,  label: 'Phone',    value: '+91 9923438561',                          href: 'tel:+919923438561' },
    { icon: MapPin, label: 'Location', value: 'Chh. Sambhajinagar, Maharashtra, India',  href: '#' },
  ];

  const socialLinks = [
    { icon: Github,   href: 'https://github.com/Uma-Pathade',                             label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/umapathade/',                    label: 'LinkedIn' },
    { icon: Mail,     href: 'mailto:umapathade2@gmail.com?subject=DevOps%20Opportunity', label: 'Email' },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-16 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="section-inner container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Heading */}
        <div ref={headingRef} className="reveal-up text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 font-mono">
            Contact<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Let's build reliable infrastructure together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left — contact info */}
          <div ref={leftRef} className="reveal-left space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Get In Touch</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Open to DevOps, Linux administration, and cloud infrastructure roles.
                Feel free to reach out for opportunities, collaborations, or just a conversation about tech.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a key={info.label} href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 group interactive">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="text-black" size={16} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{info.label}</p>
                    <p className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300 text-sm">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Find Me On</h4>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={s.label}
                    className="p-2.5 bg-black/20 backdrop-blur-sm rounded-full border border-gray-800 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-300 interactive group">
                    <s.icon size={17} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Resume */}
            <a href="/resume.pdf" download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300 interactive text-sm">
              <FileText size={16} />Download Resume
            </a>
          </div>

          {/* Right — form */}
          <div ref={rightRef} className="reveal-right">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-center p-8 bg-black/40 border border-green-500/30 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-4">
                  <span className="text-green-400 text-xl">✓</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Message sent successfully!</h3>
                <p className="text-gray-400 text-sm">Thanks for reaching out. I'll reply to umapathade2@gmail.com soon.</p>
                <button onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs text-cyan-400 hover:text-white transition-colors">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-gray-300 text-xs font-medium">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm"
                      placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-gray-300 text-xs font-medium">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-gray-300 text-xs font-medium">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                    className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm"
                    placeholder="Opportunity / Collaboration / Question" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-gray-300 text-xs font-medium">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                    className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none text-sm"
                    placeholder="Tell me about the role or project..." />
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                    {errorMsg}
                  </p>
                )}

                <button type="submit" disabled={isSubmitting}
                  className="w-full group relative px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg text-black font-semibold text-sm overflow-hidden interactive disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting
                      ? <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Sending…</>
                      : <><Send size={16} />Send Message</>}
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
