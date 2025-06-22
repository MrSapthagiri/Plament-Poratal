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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            {student.profileImage ? (
              <img
                src={`http://localhost:5000/${student.profileImage.replace(/\\/g, '/')}`}
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover border"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {student.name?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{student.name || 'N/A'}</h2>
              <p className="text-sm text-gray-500">{student.email || 'No Email'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Placement Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.placementStatus)}`}>
                {student.placementStatus?.replace('_', ' ') || 'Not Updated'}
              </span>
            </div>
            <div>
              <p className="text-gray-500">Resume</p>
              {student.resume ? (
                <a
                  href={`http://localhost:5000/${student.resume.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block mt-1"
                >
                  View Resume
                </a>
              ) : (
                <p className="mt-1 text-gray-700">Not uploaded</p>
              )}
            </div>
          </div>

          {/* Skills */}
          {student.skills?.length > 0 && (
            <div className="mt-5">
              <p className="text-sm text-gray-500 mb-1">Skills</p>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, i) => (
                  <span key={i} className="bg-primary-light text-white px-3 py-1 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {student.education?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
              <div className="grid grid-cols-1 gap-2">
                {student.education.map((edu, idx) => (
                  <div key={idx} className="border rounded-md p-3">
                    <p className="text-sm text-gray-900 font-medium">{edu.degree} - {edu.department}</p>
                    <p className="text-xs text-gray-500">{edu.institution}</p>
                    <p className="text-xs text-gray-400">Passed out: {edu.passedOutYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {student.experience?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
              <div className="grid grid-cols-1 gap-2">
                {student.experience.map((exp, idx) => (
                  <div key={idx} className="border rounded-md p-3">
                    <p className="text-sm font-medium text-gray-900">{exp.title}</p>
                    <p className="text-xs text-gray-500">{exp.company}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs mt-1 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {student.certifications?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
              <div className="grid grid-cols-1 gap-2">
                {student.certifications.map((cert, idx) => (
                  <div key={idx} className="border rounded-md p-3">
                    <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-500">Issued by: {cert.issuer}</p>
                    <p className="text-xs text-gray-400">Date: {new Date(cert.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-600">Credential ID: {cert.credential}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-right rounded-b-xl">
          <button
            onClick={onClose}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
