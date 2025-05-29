import { XMarkIcon } from '@heroicons/react/24/outline';

const StudentDetailsModal = ({ student, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'placed':
        return 'bg-green-100 text-green-800';
      case 'not_placed':
        return 'bg-yellow-100 text-yellow-800';
      case 'offer_received':
        return 'bg-blue-100 text-blue-800';
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
                Student Details
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
                  {student.user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {student.user.name}
                  </h4>
                  <p className="text-sm text-gray-500">{student.user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Roll Number
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {student.rollNumber}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Department
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {student.department}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Batch
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{student.batch}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    CGPA
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{student.cgpa}</p>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Skills
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {student.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Placement Status
                  </label>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        student.placementStatus
                      )}`}
                    >
                      {student.placementStatus.replace('_', ' ')}
                    </span>
                  </p>
                </div>
              </div>

              {student.applications && student.applications.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Recent Applications
                  </h4>
                  <div className="space-y-2">
                    {student.applications.map((application) => (
                      <div
                        key={application._id}
                        className="border rounded-lg p-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {application.job.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {application.job.company.name}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {application.status.replace('_', ' ')}
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

export default StudentDetailsModal;
