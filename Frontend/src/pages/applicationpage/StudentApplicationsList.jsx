import {
  EyeIcon,
  DocumentArrowDownIcon,
  ClockIcon,
  BriefcaseIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const statusColorMap = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const StudentApplicationsList = ({ applications = [] }) => {
  const statusOptions = [
    'pending',
    'shortlisted',
    'rejected',
    'interview_scheduled',
    'selected',
    'offer_sent',
    'offer_accepted',
    'offer_declined',
    'scheduled',
    'completed',
    'cancelled',
  ];

  const fileBaseUrl = 'http://localhost:5000/';
  const user = JSON.parse(localStorage.getItem('user'));
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setUpdatingId(applicationId);
      const res = await axios.put(`http://localhost:5000/api/students/applications/status/${applicationId}`, {
        status: newStatus,
      });
      alert('Status updated successfully!');
      // Ideally, trigger a re-fetch or update local state
    } catch (error) {
      alert('Error updating status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {applications.length > 0 ? (
        applications.map((app) => {
          const job = app.jobdetails || {};

          return (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Job Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {job.title || 'Job Title'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Application ID: <span className="text-primary">{app._id}</span>
                </p>
              </div>

              {/* Job Info */}
              <div className="space-y-2 mb-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-2 text-gray-500" />
                  Experience: {job.experience?.min} - {job.experience?.max} years
                </div>
                <div className="flex items-center">
                  <CurrencyRupeeIcon className="w-4 h-4 mr-2 text-gray-500" />
                  Salary: ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                  Location: {job.location}
                </div>
                <div>
                  <span className="font-medium">Type:</span>{' '}
                  <span className="capitalize text-blue-700">{job.type?.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mb-3">
                <span className="text-sm font-semibold text-gray-800">Cover Letter:</span>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{app.coverLetter}</p>
              </div>

              {/* Resume */}
              {app.resume && (
                <a
                  href={`${fileBaseUrl}${app.resume.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:underline mt-2"
                >
                  <DocumentArrowDownIcon className="w-4 h-4 mr-1" />
                  View Resume
                </a>
              )}

              {/* Skills */}
              {job.skills?.length > 0 && (
                <div className="my-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 6).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 6 && (
                      <span className="text-xs text-gray-500">
                        +{job.skills.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {job.requirements?.length > 0 && (
                <div className="mb-4 max-h-32 overflow-y-auto border border-gray-100 rounded p-2 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Requirements:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-700">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColorMap[app.status] || 'bg-gray-200 text-gray-700'}`}
                  >
                    {app.status.toUpperCase()}
                  </span>

                  {user?.role === "company" && (
                    <select
                      value={app.status}
                      disabled={updatingId === app._id}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-primary"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </option>
                      ))}
                    </select>

                  )}
                </div>


                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {new Date(app.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Offer indicator */}
              {app.offer?.documents?.length > 0 && (
                <div className="mt-3 text-sm text-green-600 font-medium">
                  🎉 Offer documents available
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center text-gray-500">No applications found.</div>
      )}
    </div>
  );
};

export default StudentApplicationsList;
