
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  let userde = JSON.parse(localStorage.getItem('user'));
  const userId = userde._id;
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${userId}`)
      .then(res => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleArrayChange = (e, index, field, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = e.target.value;
    setFormData(prev => ({ ...prev, [section]: updatedSection }));
  };

  const addSectionItem = (section, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), defaultItem]
    }));
  };

  const handleSave = () => {
    const form = new FormData();

    for (const key in formData) {
      if (key === 'experience' || key === 'certifications' || key === 'education') {
        form.append(key, JSON.stringify(formData[key]));
      } else if (key === 'profileImage' || key === 'resume') {
        if (formData[key] instanceof File) form.append(key, formData[key]);
      } else {
        form.append(key, formData[key]);
      }
    }

    axios.put(`http://localhost:5000/api/users/update-profile/${userId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        setUser(res.data.user);
        setIsEditing(false);
      })
      .catch(err => console.error(err));
  };

  if (!user) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">👤 Student Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark shadow transition"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 shadow transition"
          >
            Save Changes
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        {formData.profileImage && !isEditing && (
          <a
            href={`http://localhost:5000/${formData.profileImage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`http://localhost:5000/${formData.profileImage}`}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg"//bg-primary 
            />
          </a>
        )}

        {formData.resume && !isEditing && (
          <a
            href={`http://localhost:5000/${formData.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white bg-primary hover:bg-primary-700 px-4 py-2 rounded shadow mt-2 md:mt-6 ml-[700px]"
          >
            📄 View Resume
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {['name', 'email', 'role'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-600">Placement Status</label>
          <select
            name="placementStatus"
            value={formData.placementStatus || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full mt-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          >
            <option value="not_placed">Not Placed</option>
            <option value="placed">Placed</option>
            <option value="offer_received">Offer Received</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            disabled={!isEditing}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Resume</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            disabled={!isEditing}
            className="w-full mt-1"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">🧠 Skills</h3>
        <div className="flex flex-wrap gap-2">
          {formData.skills?.map((skill, index) => (
            isEditing ? (
              <input
                key={index}
                value={skill}
                onChange={(e) => {
                  const updatedSkills = [...formData.skills];
                  updatedSkills[index] = e.target.value;
                  setFormData(prev => ({ ...prev, skills: updatedSkills }));
                }}
                className="border px-2 py-1 rounded-md text-sm shadow-sm"
                placeholder="Skill"
              />
            ) : (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            )
          ))}
        </div>
        {isEditing && (
          <button
            onClick={() =>
              setFormData(prev => ({ ...prev, skills: [...(prev.skills || []), ''] }))
            }
            className="text-sm text-blue-600 mt-2 inline-block"
          >
            + Add Skill
          </button>
        )}
      </div>

      {/* Experience, Certification, Education */}
      {[
        { label: '🏢 Experience', section: 'experience', fields: ['title', 'company', 'startDate', 'endDate', 'description'] },
        { label: '📜 Certifications', section: 'certifications', fields: ['name', 'issuer', 'date', 'credential'] },
        { label: '🎓 Education', section: 'education', fields: ['degree', 'department', 'institution', 'passedOutYear'] }
      ].map(({ label, section, fields }) => (
        <div className="mt-8" key={section}>
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">{label}</h3>
          {formData[section]?.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
              {fields.map((field) => (
                <div key={field} className="mb-2">
                  {isEditing ? (
                    <input
                      type={field.toLowerCase().includes('date') || field === 'passedOutYear' ? 'date' : 'text'}
                      value={item[field] || ''}
                      onChange={(e) => handleArrayChange(e, index, field, section)}
                      placeholder={field}
                      className="w-full border rounded px-3 py-1 text-sm focus:outline-none focus:ring"
                    />
                  ) : (
                    <p><strong>{field}:</strong> {field.toLowerCase().includes('date') ? new Date(item[field]).toLocaleDateString() : item[field]}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
          {isEditing && (
            <button
              onClick={() =>
                addSectionItem(section, Object.fromEntries(fields.map(f => [f, ''])))
              }
              className="text-sm text-blue-600"
            >
              + Add {section.slice(0, 1).toUpperCase() + section.slice(1)}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
