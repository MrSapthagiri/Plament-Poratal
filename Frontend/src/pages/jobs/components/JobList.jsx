// import {
//   PencilIcon,
//   TrashIcon,
//   EyeIcon,
//   BriefcaseIcon,
//   MapPinIcon,
//   CurrencyRupeeIcon,
//   ClockIcon,
// } from '@heroicons/react/24/outline';

// const JobList = ({ jobs, onEdit, onDelete, onView }) => {
//   const formatSalary = (min, max) => {
//     const formatNumber = (num) => {
//       if (num >= 100000) {
//         return `${(num / 100000).toFixed(1)}L`;
//       } else if (num >= 1000) {
//         return `${(num / 1000).toFixed(1)}K`;
//       }
//       return num;
//     };

//     return `₹${formatNumber(min)} - ₹${formatNumber(max)}`;
//   };

//   const getJobTypeColor = (type) => {
//     switch (type) {
//       case 'full_time':
//         return 'bg-green-100 text-green-800';
//       case 'part_time':
//         return 'bg-blue-100 text-blue-800';
//       case 'internship':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {jobs.map((job) => (
//         <div
//           key={job._id}
//           className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-primary transition-colors duration-200"
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                   {job.title}
//                 </h3>
//                 <p className="text-sm text-gray-600">{job.company.name}</p>
//               </div>
//               <span
//                 className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getJobTypeColor(
//                   job.type
//                 )}`}
//               >
//                 {job.type.replace('_', ' ')}
//               </span>
//             </div>

//             <div className="space-y-2 mb-4">
//               <div className="flex items-center text-sm text-gray-500">
//                 <MapPinIcon className="h-4 w-4 mr-2" />
//                 {job.location}
//               </div>
//               <div className="flex items-center text-sm text-gray-500">
//                 <CurrencyRupeeIcon className="h-4 w-4 mr-2" />
//                 {formatSalary(job.salary.min, job.salary.max)}
//               </div>
//               <div className="flex items-center text-sm text-gray-500">
//                 <BriefcaseIcon className="h-4 w-4 mr-2" />
//                 {job.experience.min}-{job.experience.max} years
//               </div>
//               <div className="flex items-center text-sm text-gray-500">
//                 <ClockIcon className="h-4 w-4 mr-2" />
//                 Posted {new Date(job.createdAt).toLocaleDateString()}
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2 mb-4">
//               {job.skills.slice(0, 3).map((skill, index) => (
//                 <span
//                   key={index}
//                   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-white"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {job.skills.length > 3 && (
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                   +{job.skills.length - 3} more
//                 </span>
//               )}
//             </div>

//             <div className="flex justify-end space-x-2 pt-4 border-t">
//               <button
//                 onClick={() => onView(job)}
//                 className="text-primary hover:text-primary-dark"
//                 title="View Details"
//               >
//                 <EyeIcon className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => onEdit(job)}
//                 className="text-blue-600 hover:text-blue-900"
//                 title="Edit Job"
//               >
//                 <PencilIcon className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => onDelete(job._id)}
//                 className="text-red-600 hover:text-red-900"
//                 title="Delete Job"
//               >
//                 <TrashIcon className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default JobList;


import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  BriefcaseIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';


const JobList = ({ jobs = [], onEdit, onDelete, onView }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  let user = JSON.parse(localStorage.getItem('user'));

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 100000) {
        return `${(num / 100000).toFixed(1)}L`;
      } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
      }
      return num;
    };

    return `₹${formatNumber(min)} - ₹${formatNumber(max)}`;
  };


  const applyjob = async (jobId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    console.log('userId:', userId);


    if (!userId) {
      alert('User not logged in!');
      return;
    }

    const coverLetter = prompt('Enter a short cover letter for this job:');

    if (!coverLetter) {
      alert('Application cancelled. Cover letter is required.');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/students/applications/${jobId}/${userId}`,
        { coverLetter }
      );

      if (res.status === 200 || res.status === 201) {
        alert('Application submitted successfully!');
        console.log('Application Response:', res.data);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error applying:', error);
      alert(error?.response?.data?.message || 'Failed to apply. Please try again.');
    }
  };


  const getJobTypeColor = (type) => {
    switch (type) {
      case 'full_time':
        return 'bg-green-100 text-green-800';
      case 'part_time':
        return 'bg-blue-100 text-blue-800';
      case 'internship':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.isArray(jobs) && jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-primary transition-colors duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">{job.company?.name || 'Unknown'}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getJobTypeColor(
                    job.type
                  )}`}
                >
                  {job.type?.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CurrencyRupeeIcon className="h-4 w-4 mr-2" />
                  {formatSalary(job.salary?.min || 0, job.salary?.max || 0)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BriefcaseIcon className="h-4 w-4 mr-2" />
                  {job.experience?.min || 0}-{job.experience?.max || 0} years
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {(job.skills || []).slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-white"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills?.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{job.skills.length - 3} more
                  </span>
                )}
              </div>'




              <div className="flex justify-end space-x-2 pt-4 border-t">

                {


                  user?.role === 'student' ? (<>
                    <button
                      onClick={() => applyjob(job._id)}
                      className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-pulse"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => openModal(job)}
                      className="relative px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:from-green-500 hover:to-teal-500 focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                      View Now
                    </button>


                    {
                      console.log(job)
                    }

                  </>) : <>

                    <button
                      onClick={() => openModal(job)}
                      className="relative px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:from-green-500 hover:to-teal-500 focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                      View Now
                    </button>
                    <button
                      onClick={() => onEdit(job)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Job"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(job._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Job"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </>
                }




              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No jobs found.
        </div>
      )}

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white max-w-3xl w-full mx-4 p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>

            {/* Job Title & Location */}
            <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Location:</strong> {selectedJob.location} |{' '}
              <strong>Type:</strong> {selectedJob.type?.replace('_', ' ')}
            </p>

            {/* Description */}
            <p className="text-gray-700 mb-4">{selectedJob.description}</p>

            {/* Experience */}
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800">Experience:</h4>
              <p>
                {selectedJob.experience?.min} - {selectedJob.experience?.max} years
              </p>
            </div>

            {/* Salary */}
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800">Salary:</h4>
              <p>
                ₹{selectedJob.salary?.min.toLocaleString()} - ₹
                {selectedJob.salary?.max.toLocaleString()}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 mb-1">Requirements:</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm max-h-40 overflow-y-auto">
                {selectedJob.requirements?.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 mb-1">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default JobList;
