'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ISkill } from '@/models/Skill';

interface SkillsProps {
  skills: ISkill[];
}

const Skills = ({ skills }: SkillsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = {
    programming: 'Programming Languages',
    tools: 'Tools & Technologies',
    languages: 'Spoken Languages',
    other: 'Other Skills',
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, ISkill[]>);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {categories[category as keyof typeof categories]}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill._id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        {skill.proficiency && (
                          <span className="text-sm text-gray-500">
                            {skill.proficiency}/5
                          </span>
                        )}
                      </div>
                      {skill.proficiency && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${(skill.proficiency / 5) * 100}%` } : {}}
                            transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                          ></motion.div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

