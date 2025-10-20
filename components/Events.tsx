'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { format } from 'date-fns';
import { IEvent } from '@/models/Event';

interface EventsProps {
  events: IEvent[];
}

const Events = ({ events }: EventsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const eventTypeColors = {
    hackathon: 'from-purple-500 to-pink-500',
    conference: 'from-blue-500 to-cyan-500',
    summit: 'from-green-500 to-teal-500',
    workshop: 'from-orange-500 to-red-500',
    other: 'from-gray-500 to-gray-600',
  };

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Tech Events & <span className="gradient-text">Hackathons</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
              >
                <div className={`h-2 bg-gradient-to-r ${eventTypeColors[event.type]}`}></div>
                <div className="p-6">
                  {event.logo && (
                    <div className="mb-4 w-16 h-16 relative">
                      <Image
                        src={event.logo}
                        alt={event.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.name}
                  </h3>
                  <p className="text-primary-600 font-semibold mb-2">
                    {event.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(event.date), 'MMM dd, yyyy')}
                  </p>
                  {event.location && (
                    <p className="text-sm text-gray-600 mb-3">{event.location}</p>
                  )}
                  {event.description && (
                    <p className="text-sm text-gray-700">{event.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;

