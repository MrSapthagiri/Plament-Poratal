// import { useState, useEffect } from 'react';
// import { PlusIcon } from '@heroicons/react/24/outline';
// import axios from 'axios';
// import JobList from './components/JobList';
// import JobFilters from './components/JobFilters';
// import AddJobModal from './components/AddJobModal';
// import EditJobModal from './components/EditJobModal';
// import JobDetailsModal from './components/JobDetailsModal';
// import { useAuth } from '../../context/AuthContext';
// import { toast } from 'react-hot-toast';

// const Jobs = () => {
//   const { user } = useAuth();
//   const [jobs, setJobs] = useState([]);
//   const [filters, setFilters] = useState({
//     searchQuery: '',
//     type: '',
//     location: '',
//     experience: '',
//     salary: '',
//   });
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get('/api/jobs');
//       setJobs(response.data);
//     } catch (error) {
//       toast.error('Error fetching jobs');
//       console.error('Error fetching jobs:', error);
//     }
//   };

//   const handleAddJob = async (jobData) => {
//     try {
//       await axios.post('/api/jobs', jobData);
//       toast.success('Job posted successfully');
//       fetchJobs();
//       setShowAddModal(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error posting job');
//     }
//   };

//   const handleEditJob = async (jobData) => {
//     try {
//       await axios.patch(`/api/jobs/${selectedJob._id}`, jobData);
//       toast.success('Job updated successfully');
//       fetchJobs();
//       setShowEditModal(false);
//       setSelectedJob(null);
//     } catch (error) {
//       toast.error('Error updating job');
//       console.error('Error updating job:', error);
//     }
//   };

//   const handleDeleteJob = async (jobId) => {
//     if (!window.confirm('Are you sure you want to delete this job?')) return;

//     try {
//       await axios.delete(`/api/jobs/${jobId}`);
//       toast.success('Job deleted successfully');
//       fetchJobs();
//     } catch (error) {
//       toast.error('Error deleting job');
//       console.error('Error deleting job:', error);
//     }
//   };

//   // const filteredJobs = jobs.filter((job) => {
//   //   const matchesSearch =
//   //     job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//   //     job.company?.name?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//   //     job.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

//   //   const matchesType = !filters.type || job.type === filters.type;
//   //   const matchesLocation =
//   //     !filters.location ||
//   //     job.location.toLowerCase().includes(filters.location.toLowerCase());
//   //   const matchesExperience =
//   //     !filters.experience || job.experience?.min >= parseInt(filters.experience);
//   //   const matchesSalary =
//   //     !filters.salary || job.salary?.min >= parseInt(filters.salary);

//   //   return (
//   //     matchesSearch &&
//   //     matchesType &&
//   //     matchesLocation &&
//   //     matchesExperience &&
//   //     matchesSalary
//   //   );
//   // });

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
//         {(user?.role === 'super_admin' ||
//           user?.role === 'admin' ||
//           user?.role === 'company') && (
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
//           >
//             <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
//             Post New Job
//           </button>
//         )}
//       </div>

//       <JobFilters filters={filters} setFilters={setFilters} />

//       <JobList
//         // jobs={filteredJobs}
//         onEdit={(job) => {
//           setSelectedJob(job);
//           setShowEditModal(true);
//         }}
//         onDelete={handleDeleteJob}
//         onView={(job) => {
//           setSelectedJob(job);
//           setShowDetailsModal(true);
//         }}
//       />

//       {showAddModal && (
//         <AddJobModal onClose={() => setShowAddModal(false)} onAdd={handleAddJob} />
//       )}

//       {showEditModal && selectedJob && (
//         <EditJobModal
//           job={selectedJob}
//           onClose={() => {
//             setShowEditModal(false);
//             setSelectedJob(null);
//           }}
//           onSave={handleEditJob}
//         />
//       )}

//       {showDetailsModal && selectedJob && (
//         <JobDetailsModal
//           job={selectedJob}
//           onClose={() => {
//             setShowDetailsModal(false);
//             setSelectedJob(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Jobs;


import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import JobList from './components/JobList';
import JobFilters from './components/JobFilters';
import AddJobModal from './components/AddJobModal';
import EditJobModal from './components/EditJobModal';
import JobDetailsModal from './components/JobDetailsModal';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: '',
    type: '',
    location: '',
    experience: '',
    salary: '',
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobs(response.data || []); // fallback in case response.data is undefined
    } catch (error) {
      toast.error('Error fetching jobs');
      console.error('Error fetching jobs:', error);
    }
  };

  const handleAddJob = async (jobData) => {
    try {
      await axios.post('/api/jobs', jobData);
      toast.success('Job posted successfully');
      fetchJobs();
      setShowAddModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error posting job');
    }
  };

  const handleEditJob = async (jobData) => {
    try {
      await axios.patch(`/api/jobs/${selectedJob._id}`, jobData);
      toast.success('Job updated successfully');
      fetchJobs();
      setShowEditModal(false);
      setSelectedJob(null);
    } catch (error) {
      toast.error('Error updating job');
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await axios.delete(`/api/jobs/${jobId}`);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      toast.error('Error deleting job');
      console.error('Error deleting job:', error);
    }
  };

  // const filteredJobs = jobs.filter((job) => {
  //   const matchesSearch =
  //     job.title?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
  //     job.company?.name?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
  //     job.description?.toLowerCase().includes(filters.searchQuery.toLowerCase());

  //   const matchesType = !filters.type || job.type === filters.type;
  //   const matchesLocation =
  //     !filters.location || job.location?.toLowerCase().includes(filters.location.toLowerCase());
  //   const matchesExperience =
  //     !filters.experience || (job.experience?.min >= parseInt(filters.experience));
  //   const matchesSalary =
  //     !filters.salary || (job.salary?.min >= parseInt(filters.salary));

  //   return (
  //     matchesSearch &&
  //     matchesType &&
  //     matchesLocation &&
  //     matchesExperience &&
  //     matchesSalary
  //   );
  // });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        {(user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'company') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Post New Job
          </button>
        )}
      </div>

      <JobFilters filters={filters} setFilters={setFilters} />

      <JobList
        // jobs={filteredJobs} // ✅ this was missing before
        onEdit={(job) => {
          setSelectedJob(job);
          setShowEditModal(true);
        }}
        onDelete={handleDeleteJob}
        onView={(job) => {
          setSelectedJob(job);
          setShowDetailsModal(true);
        }}
      />

      {showAddModal && (
        <AddJobModal onClose={() => setShowAddModal(false)} onAdd={handleAddJob} />
      )}

      {showEditModal && selectedJob && (
        <EditJobModal
          job={selectedJob}
          onClose={() => {
            setShowEditModal(false);
            setSelectedJob(null);
          }}
          onSave={handleEditJob}
        />
      )}

      {showDetailsModal && selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
};

export default Jobs;
