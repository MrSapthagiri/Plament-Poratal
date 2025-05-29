import { XMarkIcon } from '@heroicons/react/24/outline';

const CompanyDetailsModal = ({ company, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Company Details
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl">
                  {company.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {company.name}
                  </h4>
                  <p className="text-sm text-gray-500">{company.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Industry
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{company.industry}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Location
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{company.location}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Contact Person
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {company.contactPerson}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Contact Phone
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {company.contactPhone}
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Website
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark"
                      >
                        {company.website}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {company.description}
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Verification Status
                  </label>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        company.verificationStatus
                      )}`}
                    >
                      {company.verificationStatus}
                    </span>
                  </p>
                </div>
              </div>

              {company.activeJobs && company.activeJobs.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Active Jobs</h4>
                  <div className="space-y-2">
                    {company.activeJobs.map((job) => (
                      <div key={job._id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {job.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {job.location} • {job.type}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {job.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsModal;
