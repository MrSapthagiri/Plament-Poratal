import { XMarkIcon } from '@heroicons/react/24/outline';

const JobDetailsModal = ({ job, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                {job.title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900">Company</h4>
                <p className="mt-1 text-gray-600">{job.company.name}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900">Description</h4>
                <p className="mt-1 text-gray-600 whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900">Requirements</h4>
                <ul className="mt-1 list-disc list-inside text-gray-600">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Job Type</h4>
                  <p className="mt-1 text-gray-600">
                    {job.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Location</h4>
                  <p className="mt-1 text-gray-600">{job.location}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Salary</h4>
                  <p className="mt-1 text-gray-600">
                    {formatSalary(job.salary.min, job.salary.max)}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Experience</h4>
                  <p className="mt-1 text-gray-600">
                    {job.experience.min}-{job.experience.max} years
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  Skills Required
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    Application Deadline
                  </h4>
                  <p className="mt-1 text-gray-600">
                    {new Date(job.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    Number of Positions
                  </h4>
                  <p className="mt-1 text-gray-600">{job.positions}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
