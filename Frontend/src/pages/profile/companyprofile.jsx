import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyProfile = () => {
    const companyId = "6857b6b0841043964e6c69f1"; // Or fetch dynamically from auth/localStorage
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/companies/getcompany/${companyId}`)
            .then(res => {
                const data = res.data;
                setFormData({
                    about: data.about || '',
                    website: data.website || '',
                    companySize: data.companySize || '',
                    companyType: data.companyType || '',
                    address: {
                        street: data.address?.street || '',
                        city: data.address?.city || '',
                        state: data.address?.state || '',
                        country: data.address?.country || '',
                        pincode: data.address?.pincode || '',
                    },
                    hrContact: {
                        name: data.hrContact?.name || '',
                        email: data.hrContact?.email || '',
                        phone: data.hrContact?.phone || '',
                    },
                    logo: data.logo || ''
                });
            })
            .catch(err => console.error('Fetch error:', err));
    }, [companyId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('hrContact.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                hrContact: {
                    ...prev.hrContact,
                    [key]: value
                }
            }));
        } else if (name.startsWith('address.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [key]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setFormData(prev => ({ ...prev, logo: files[0] }));
    };

    const handleSave = async () => {
        const form = new FormData();
        for (const key in formData) {
            if (key === 'address') {
                form.append('street', formData.address.street);
                form.append('city', formData.address.city);
                form.append('state', formData.address.state);
                form.append('country', formData.address.country);
                form.append('pincode', formData.address.pincode);
            } else if (key === 'hrContact') {
                form.append('hrName', formData.hrContact.name);
                form.append('hrEmail', formData.hrContact.email);
                form.append('hrPhone', formData.hrContact.phone);
            } else if (key === 'logo' && formData.logo instanceof File) {
                form.append('logo', formData.logo);
            } else {
                form.append(key, formData[key]);
            }
        }


        try {
            const res = await axios.put(`http://localhost:5000/api/companies/${companyId}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(res.data.data);
            setIsEditing(false);
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    if (!formData) return <div className="text-center p-10">Loading...</div>;

    // return (
    //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
    //         <div className="flex justify-between items-center mb-6 border-b pb-4">
    //             <h2 className="text-3xl font-bold text-gray-800">🏢 Company Profile</h2>
    //             {!isEditing ? (
    //                 <button onClick={() => setIsEditing(true)} className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark shadow">
    //                     Edit Profile
    //                 </button>
    //             ) : (
    //                 <button onClick={handleSave} className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 shadow">
    //                     Save Changes
    //                 </button>
    //             )}
    //         </div>

    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //             {['about', 'website', 'companySize', 'companyType'].map((field) => (
    //                 <div key={field}>
    //                     <label className="block text-sm font-medium text-gray-600 capitalize">{field}</label>
    //                     <input
    //                         type="text"
    //                         name={field}
    //                         value={formData[field] || ''}
    //                         onChange={handleChange}
    //                         disabled={!isEditing}
    //                         className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
    //                     />
    //                 </div>
    //             ))}

    //             {['street', 'city', 'state', 'country', 'pincode'].map((field) => (
    //                 <div key={field}>
    //                     <label className="block text-sm font-medium text-gray-600 capitalize">Address - {field}</label>
    //                     <input
    //                         type="text"
    //                         name={`address.${field}`}
    //                         value={formData.address?.[field] || ''}
    //                         onChange={handleChange}
    //                         disabled={!isEditing}
    //                         className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
    //                     />
    //                 </div>
    //             ))}

    //             {['name', 'email', 'phone'].map((field) => (
    //                 <div key={field}>
    //                     <label className="block text-sm font-medium text-gray-600">HR Contact - {field}</label>
    //                     <input
    //                         type="text"
    //                         name={`hrContact.${field}`}
    //                         value={formData.hrContact?.[field] || ''}
    //                         onChange={handleChange}
    //                         disabled={!isEditing}
    //                         className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
    //                     />
    //                 </div>
    //             ))}

    //             <div>
    //                 <label className="block text-sm font-medium text-gray-600">Company Logo</label>
    //                 <input
    //                     type="file"
    //                     name="logo"
    //                     onChange={handleFileChange}
    //                     disabled={!isEditing}
    //                     className="w-full mt-1"
    //                 />
    //                 {!isEditing && formData.logo && (
    //                     <a
    //                         href={`http://localhost:5000/${formData.logo}`}
    //                         target="_blank"
    //                         rel="noopener noreferrer"
    //                     >
    //                         <img
    //                             src={`http://localhost:5000/${formData.logo}`}
    //                             alt="Company Logo"
    //                             className="mt-3 h-20 rounded shadow border"
    //                         />
    //                     </a>
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );


  return (
  <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
    
    {/* Top Banner with Logo */}
    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
      <img
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80"
        alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-[-40px] left-6">
        {/* {!isEditing && formData.logo && ( */}
          <a
            href={`http://localhost:5000/${formData.logo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`http://localhost:5000/${formData.logo}`}
              alt="Company Logo"
              className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover"
            />
          </a>
        {/* )} */}
        {isEditing && (
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            disabled={!isEditing}
            className="mt-2 text-sm"
          />
        )}
      </div>
    </div>

    {/* Company Info & Form */}
    <div className="px-6 pt-16 pb-10">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">🏢 Company Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Company Info */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Company Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {['about', 'website', 'companySize', 'companyType'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
        ))}
      </div>

      {/* Address */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {['street', 'city', 'state', 'country', 'pincode'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600 capitalize">{field}</label>
            <input
              type="text"
              name={`address.${field}`}
              value={formData.address?.[field] || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
        ))}
      </div>

      {/* HR Contact */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">HR Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['name', 'email', 'phone'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600 capitalize">{field}</label>
            <input
              type="text"
              name={`hrContact.${field}`}
              value={formData.hrContact?.[field] || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default CompanyProfile;
