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

const JobList = ({ jobs = [], onEdit, onDelete, onView }) => {
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
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button
                  onClick={() => onView(job)}
                  className="text-primary hover:text-primary-dark"
                  title="View Details"
                >
                  <EyeIcon className="h-5 w-5" />
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
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No jobs found.
        </div>
      )}
    </div>
  );
};

export default JobList;
