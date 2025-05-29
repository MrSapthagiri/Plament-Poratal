import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  DocumentIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const StudentProfile = ({ profile, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    rollNumber: profile.rollNumber || '',
    department: profile.department || '',
    year: profile.year || '',
    cgpa: profile.cgpa || '',
    skills: profile.skills?.join(', ') || '',
    interests: profile.interests?.join(', ') || '',
    about: profile.about || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('/api/students/profile', {
        ...formData,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
        interests: formData.interests.split(',').map((interest) => interest.trim()),
      });
      toast.success('Profile updated successfully');
      onUpdate();
      setEditing(false);
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      await axios.post('/api/students/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Resume uploaded successfully');
      onUpdate();
    } catch (error) {
      toast.error('Error uploading resume');
      console.error('Error uploading resume:', error);
    }
  };

  const handleCertificationUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    formData.append('name', e.target.name.value);
    formData.append('issuer', e.target.issuer.value);
    formData.append('date', e.target.date.value);

    try {
      await axios.post('/api/students/certifications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Certification added successfully');
      onUpdate();
      e.target.reset();
    } catch (error) {
      toast.error('Error adding certification');
      console.error('Error adding certification:', error);
    }
  };

  const handleDeleteCertification = async (certId) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;

    try {
      await axios.delete(`/api/students/certifications/${certId}`);
      toast.success('Certification deleted successfully');
      onUpdate();
    } catch (error) {
      toast.error('Error deleting certification');
      console.error('Error deleting certification:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Student Information
          </h2>
          <button
            onClick={() => setEditing(!editing)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Roll Number
                </label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, rollNumber: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={(e) =>
                    setFormData({ ...formData, cgpa: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interests (comma-separated)
              </label>
              <input
                type="text"
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                About
              </label>
              <textarea
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
                <p className="mt-1 text-sm text-gray-900">{profile.rollNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Department</h3>
                <p className="mt-1 text-sm text-gray-900">{profile.department}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Year</h3>
                <p className="mt-1 text-sm text-gray-900">{profile.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">CGPA</h3>
                <p className="mt-1 text-sm text-gray-900">{profile.cgpa}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Interests</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">About</h3>
              <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                {profile.about}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 px-6 py-5">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resume</h3>
        <div className="flex items-center space-x-4">
          {profile.resume ? (
            <>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <DocumentIcon className="h-5 w-5 mr-2" />
                View Resume
              </a>
              <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer">
                <PencilIcon className="h-5 w-5 mr-2" />
                Update Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>
            </>
          ) : (
            <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer">
              <PlusIcon className="h-5 w-5 mr-2" />
              Upload Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-5">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Certifications
        </h3>
        <form onSubmit={handleCertificationUpload} className="mb-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issuer
              </label>
              <input
                type="text"
                name="issuer"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Certificate File
            </label>
            <input
              type="file"
              name="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Certification
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {profile.certifications?.map((cert) => (
            <div
              key={cert._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <AcademicCapIcon className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {cert.issuer} • {new Date(cert.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  <DocumentIcon className="h-5 w-5" />
                </a>
                <button
                  onClick={() => handleDeleteCertification(cert._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
