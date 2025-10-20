'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { format } from 'date-fns';
import { IEducation } from '@/models/Education';

interface EducationProps {
  education: IEducation[];
}

const Education = ({ education }: EducationProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="gradient-text">Education</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-lg shadow-lg card-hover"
              >
                {edu.schoolLogo && (
                  <div className="mb-4 w-20 h-20 relative">
                    <Image
                      src={edu.schoolLogo}
                      alt={edu.school}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {edu.degree}
                </h3>
                <h4 className="text-lg text-primary-600 font-semibold mb-2">
                  {edu.school}
                </h4>
                {edu.location && (
                  <p className="text-sm text-gray-600 mb-2">{edu.location}</p>
                )}
                <p className="text-sm text-gray-500 mb-4">
                  {format(new Date(edu.startDate), 'MMM yyyy')} -{' '}
                  {edu.current ? 'Present' : format(new Date(edu.endDate!), 'MMM yyyy')}
                </p>
                {edu.cgpa && (
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">CGPA:</span> {edu.cgpa}
                  </p>
                )}
                {edu.description && (
                  <p className="text-gray-700 mb-3">{edu.description}</p>
                )}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white px-3 py-1 rounded-full text-gray-700"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

