'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { format } from 'date-fns';
import { IExperience } from '@/models/Experience';

interface ExperienceProps {
  experiences: IExperience[];
}

const Experience = ({ experiences }: ExperienceProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Work <span className="gradient-text">Experience</span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-1/2 z-10"></div>

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg card-hover">
                      {exp.companyLogo && (
                        <div className="mb-4 w-16 h-16 relative">
                          <Image
                            src={exp.companyLogo}
                            alt={exp.company}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg text-primary-600 font-semibold mb-2">
                        {exp.company}
                      </h4>
                      {exp.location && (
                        <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
                      )}
                      <p className="text-sm text-gray-500 mb-4">
                        {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                        {exp.current ? 'Present' : format(new Date(exp.endDate!), 'MMM yyyy')}
                      </p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

