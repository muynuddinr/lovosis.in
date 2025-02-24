import { 
  IoCartOutline, 
  IoCalendarOutline, 
  IoNewspaperOutline, 
  IoMailOutline 
} from 'react-icons/io5';

const stats = [
  { title: 'Total Products', value: '120', icon: IoCartOutline, color: 'bg-blue-500' },
  { title: 'Total Events', value: '45', icon: IoCalendarOutline, color: 'bg-purple-500' },
  { title: 'Total Blogs', value: '89', icon: IoNewspaperOutline, color: 'bg-green-500' },
  { title: 'New Messages', value: '23', icon: IoMailOutline, color: 'bg-yellow-500' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
} 