'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AboutProps {
  about?: {
    description: string;
  };
}

const About = ({ about }: AboutProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {about?.description || 
                  'I am a passionate cybersecurity enthusiast and blockchain advocate with a strong background in computer science. My journey in tech has been driven by curiosity and a desire to solve complex problems. I specialize in security operations, threat detection, and Web3 technologies.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

