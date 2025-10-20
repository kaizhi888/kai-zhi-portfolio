'use client';

import Link from 'next/link';
import { FiHome, FiBriefcase, FiBook, FiAward, FiCode, FiUsers, FiSettings, FiTool } from 'react-icons/fi';

const cards = [
  { name: 'About', href: '/admin/dashboard/about', icon: FiHome, description: 'Manage your profile and bio', color: 'from-blue-500 to-cyan-500' },
  { name: 'Experience', href: '/admin/dashboard/experience', icon: FiBriefcase, description: 'Add or edit work experiences', color: 'from-purple-500 to-pink-500' },
  { name: 'Education', href: '/admin/dashboard/education', icon: FiBook, description: 'Manage your education history', color: 'from-green-500 to-teal-500' },
  { name: 'Skills', href: '/admin/dashboard/skills', icon: FiTool, description: 'Update your skills and expertise', color: 'from-orange-500 to-red-500' },
  { name: 'Projects', href: '/admin/dashboard/projects', icon: FiCode, description: 'Showcase your projects', color: 'from-indigo-500 to-purple-500' },
  { name: 'Certifications', href: '/admin/dashboard/certifications', icon: FiAward, description: 'Add certifications and badges', color: 'from-yellow-500 to-orange-500' },
  { name: 'Awards', href: '/admin/dashboard/awards', icon: FiAward, description: 'Highlight your achievements', color: 'from-pink-500 to-rose-500' },
  { name: 'Events', href: '/admin/dashboard/events', icon: FiUsers, description: 'Manage hackathons and events', color: 'from-cyan-500 to-blue-500' },
  { name: 'Contact', href: '/admin/dashboard/contact', icon: FiSettings, description: 'Update contact information', color: 'from-gray-500 to-gray-700' },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your portfolio management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.name}
              href={card.href}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{card.name}</h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

