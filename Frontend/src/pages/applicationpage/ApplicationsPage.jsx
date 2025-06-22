import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentApplicationsList from './StudentApplicationsList';


const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:5000/api/students/applications/${user._id}`)
        .then((res) => setApplications(res.data))
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Applications</h2>
      <StudentApplicationsList applications={applications} />
    </div>
  );
};

export default ApplicationsPage;
