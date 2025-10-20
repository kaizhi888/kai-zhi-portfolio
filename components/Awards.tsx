'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { format } from 'date-fns';
import { FiAward } from 'react-icons/fi';
import { IAward } from '@/models/Award';

interface AwardsProps {
  awards: IAward[];
}

const Awards = ({ awards }: AwardsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="awards" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Awards & <span className="gradient-text">Achievements</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-lg card-hover border-2 border-yellow-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {award.icon ? (
                      <div className="w-16 h-16 relative">
                        <Image
                          src={award.icon}
                          alt={award.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <FiAward className="text-white" size={32} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {award.title}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-2">
                      {award.issuer}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      {format(new Date(award.date), 'MMM yyyy')}
                    </p>
                    {award.description && (
                      <p className="text-sm text-gray-700">{award.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;

