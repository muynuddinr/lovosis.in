"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  IoGridOutline, 
  IoCartOutline, 
  IoCalendarOutline, 
  IoNewspaperOutline, 
  IoMailOutline, 
  IoMailUnreadOutline,
  IoLogOutOutline 
} from 'react-icons/io5';

const menuItems = [
  { title: 'Dashboard', icon: IoGridOutline, path: '/admin' },
  { title: 'Products', icon: IoCartOutline, path: '/admin/products' },
  { title: 'Events', icon: IoCalendarOutline, path: '/admin/events' },
  { title: 'Blogs', icon: IoNewspaperOutline, path: '/admin/blogs' },
  { title: 'Contact', icon: IoMailOutline, path: '/admin/contact' },
  { title: 'Newsletter', icon: IoMailUnreadOutline, path: '/admin/newsletter' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="w-64 bg-white h-full shadow-lg">
      <div className="p-6">
        <Link href="/admin" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </Link>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200
              ${pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="ml-3">{item.title}</span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
        >
          <IoLogOutOutline className="w-6 h-6" />
          <span className="ml-3">Logout</span>
        </button>
      </nav>
    </div>
  );
} 