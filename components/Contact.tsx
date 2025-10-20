'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiGlobe } from 'react-icons/fi';

interface ContactProps {
  contact?: {
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const Contact = ({ contact }: ContactProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactLinks = [
    { icon: FiMail, label: 'Email', value: contact?.email, href: contact?.email ? `mailto:${contact.email}` : null },
    { icon: FiGithub, label: 'GitHub', value: contact?.github, href: contact?.github },
    { icon: FiLinkedin, label: 'LinkedIn', value: contact?.linkedin, href: contact?.linkedin },
    { icon: FiTwitter, label: 'Twitter', value: contact?.twitter, href: contact?.twitter },
    { icon: FiGlobe, label: 'Website', value: contact?.website, href: contact?.website },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Get In <span className="gradient-text">Touch</span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center text-lg text-gray-600 mb-12"
            >
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and cybersecurity!
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactLinks.map((link, index) => {
                if (!link.value || !link.href) return null;

                const Icon = link.icon;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{link.label}</p>
                      <p className="text-gray-900 font-semibold truncate">
                        {link.label === 'Email' ? link.value : link.value.replace(/^https?:\/\//, '')}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-600 mb-4">
                Feel free to reach out through any of these platforms. I usually respond within 24 hours!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

