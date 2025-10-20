'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { format } from 'date-fns';
import { FiExternalLink } from 'react-icons/fi';
import { ICertification } from '@/models/Certification';

interface CertificationsProps {
  certifications: ICertification[];
}

const Certifications = ({ certifications }: CertificationsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="gradient-text">Certifications</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-lg card-hover"
              >
                {cert.badgeImage && (
                  <div className="mb-4 w-24 h-24 relative mx-auto">
                    <Image
                      src={cert.badgeImage}
                      alt={cert.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {cert.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-2 text-center">
                  {cert.issuer}
                </p>
                <p className="text-sm text-gray-500 mb-3 text-center">
                  {format(new Date(cert.issueDate), 'MMM yyyy')}
                </p>
                {cert.description && (
                  <p className="text-sm text-gray-600 mb-4">{cert.description}</p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <FiExternalLink size={16} />
                    <span className="text-sm">View Credential</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;

