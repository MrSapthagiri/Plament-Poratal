import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import StudentDetailsModal from './StudentDetailsModal';

const StudentList = ({ students, onRefresh }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Roll Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CGPA
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student, index) => {
            const createdDate = new Date(student.createdAt);
            const formattedDate = createdDate.toISOString().split('T')[0].replace(/-/g, '');
            const paddedIndex = String(index + 1).padStart(3, '0');
            const generatedRollNumber = `STU-${formattedDate}-${paddedIndex}`;

            return (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                        {student.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {generatedRollNumber}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.department || 'N/A'}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.cgpa || 'N/A'}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.placementStatus)}`}>
                    {student.placementStatus?.replace('_', ' ') || 'Not Updated'}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowDetailsModal(true);
                    }}
                    className="text-white bg-primary hover:bg-primary-dark transition px-3 py-1 rounded text-xs font-medium"
                  >
                    <EyeIcon className="h-4 w-4 inline mr-1" />
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showDetailsModal && selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
};

export default StudentList;
