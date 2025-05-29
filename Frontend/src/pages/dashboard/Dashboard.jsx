import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    companies: 0,
    jobs: 0,
    placements: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Students', value: stats.students, icon: UserGroupIcon, color: 'bg-blue-500' },
    { title: 'Companies', value: stats.companies, icon: BuildingOfficeIcon, color: 'bg-green-500' },
    { title: 'Active Jobs', value: stats.jobs, icon: BriefcaseIcon, color: 'bg-yellow-500' },
    { title: 'Placements', value: stats.placements, icon: CheckCircleIcon, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon
                    className={`h-6 w-6 text-white ${card.color} rounded-full p-1`}
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.title}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Job Postings
          </h2>
          {/* Add job listings here */}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Interviews
          </h2>
          {/* Add interview schedule here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
