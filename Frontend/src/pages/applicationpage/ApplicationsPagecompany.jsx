import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentApplicationsList from './StudentApplicationsList';


const ApplicationsPageCompany = () => {
  const [applications, setApplications] = useState([]);


  useEffect(() => {
   
      axios
        .get(`http://localhost:5000/api/students/all/applications`)
        .then((res) => setApplications(res.data))
        .catch((err) => console.error('Fetch error:', err));
    
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Applications</h2>
      <StudentApplicationsList applications={applications} />
    </div>
  );
};

export default ApplicationsPageCompany;
