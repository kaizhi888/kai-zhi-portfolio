'use client';

import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

interface FooterProps {
  contact?: {
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const Footer = ({ contact }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: contact?.github, label: 'GitHub' },
    { icon: FiLinkedin, href: contact?.linkedin, label: 'LinkedIn' },
    { icon: FiTwitter, href: contact?.twitter, label: 'Twitter' },
    { icon: FiMail, href: contact?.email ? `mailto:${contact.email}` : null, label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              if (!link.href) return null;
              
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {currentYear} Kai Zhi. All rights reserved.</p>
            <p className="mt-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

