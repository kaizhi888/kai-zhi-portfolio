'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiBriefcase, FiBook, FiAward, FiCode, FiUsers, FiSettings, FiLogOut, FiTool } from 'react-icons/fi';

const navigation = [
  { name: 'About', href: '/admin/dashboard/about', icon: FiHome },
  { name: 'Experience', href: '/admin/dashboard/experience', icon: FiBriefcase },
  { name: 'Education', href: '/admin/dashboard/education', icon: FiBook },
  { name: 'Skills', href: '/admin/dashboard/skills', icon: FiTool },
  { name: 'Projects', href: '/admin/dashboard/projects', icon: FiCode },
  { name: 'Certifications', href: '/admin/dashboard/certifications', icon: FiAward },
  { name: 'Awards', href: '/admin/dashboard/awards', icon: FiAward },
  { name: 'Events', href: '/admin/dashboard/events', icon: FiUsers },
  { name: 'Contact', href: '/admin/dashboard/contact', icon: FiSettings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold gradient-text">Portfolio Admin</h1>
            <p className="text-sm text-gray-600 mt-1">{session.user?.email}</p>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
            >
              <FiHome size={20} />
              <span>View Site</span>
            </Link>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}

