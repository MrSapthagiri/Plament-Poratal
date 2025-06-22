// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import StudentProfile from './components/StudentProfile';
// import CompanyProfile from './components/CompanyProfile';
// import AdminProfile from './components/AdminProfile';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const Profile = () => {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (user) {
//       fetchProfile();
//     }
//   }, [user]);

//   const fetchProfile = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       let endpoint;
      
//       switch (user?.role) {
//         case 'student':
//           endpoint = '/api/students/profile';
//           break;
//         case 'company':
//           endpoint = '/api/companies/profile';
//           break;
//         case 'super_admin':
//         case 'admin':
//         case 'placement_staff':
//           endpoint = '/api/admin/profile';
//           break;
//         default:
//           endpoint = '/api/users/profile';
//       }
      
//       const response = await axios.get(endpoint);
      
//       if (response.data) {
//         setProfile(response.data);
//       } else {
//         throw new Error('No profile data received');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || error.message || 'Error fetching profile');
//       toast.error(error.response?.data?.message || 'Error fetching profile');
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderProfileComponent = () => {
//     if (!user) return <ProfileNotFound message="User not authenticated" />;
    
//     switch (user.role) {
//       case 'student':
//         return <StudentProfile profile={profile} onUpdate={fetchProfile} />;
//       case 'company':
//         return <CompanyProfile profile={profile} onUpdate={fetchProfile} />;
//       case 'super_admin':
//       case 'admin':
//       case 'placement_staff':
//         return <AdminProfile profile={profile} onUpdate={fetchProfile} />;
//       default:
//         return <ProfileNotFound message={`Unknown user role: ${user.role}`} />;
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error && !profile) {
//     return <ErrorMessage message={error} onRetry={fetchProfile} />;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
//       {renderProfileComponent()}
//     </div>
//   );
// };

// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center h-screen">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//     <span className="ml-3 text-gray-600">Loading profile...</span>
//   </div>
// );

// const ErrorMessage = ({ message, onRetry }) => (
//   <div className="container mx-auto px-4 py-8">
//     <div className="bg-red-50 border border-red-200 rounded-md p-6 mb-6">
//       <h2 className="text-red-800 text-lg font-medium mb-2">Error Loading Profile</h2>
//       <p className="text-red-700 mb-4">{message}</p>
//       <button 
//         onClick={onRetry}
//         className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md transition-colors"
//       >
//         Try Again
//       </button>
//     </div>
//   </div>
// );

// const ProfileNotFound = ({ message }) => (
//   <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6">
//     <p className="text-yellow-700">{message}</p>
//   </div>
// );

// export default Profile;

import React, { useState, useEffect } from 'react';
import UserProfile from './studentprofile';
import CompanyProfile from './companyprofile';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // return (
  //   <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
  //     <div className="w-full max-w-2xl">
  //       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
  //         {/* Header section with gradient background */}
  //         <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 flex justify-center relative">
  //           {/* Profile image - centered */}
  //           <div className="absolute bottom-0 transform translate-y-1/2">
  //             {user.profileImage ? (
  //               <img 
  //                 src={user.profileImage} 
  //                 alt="Profile" 
  //                 className="w-24 h-24 rounded-full border-4 border-white object-cover"
  //               />
  //             ) : (
  //               <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-md">
  //                 <span className="text-3xl font-semibold text-gray-700">{user.name?.charAt(0)?.toUpperCase() || '?'}</span>
  //               </div>
  //             )}
  //           </div>
  //         </div>
          
  //         {/* Content section */}
  //         <div className="pt-16 px-6 pb-8 text-center">
  //           {/* User name and role */}
  //           <div className="mb-6">
  //             <h1 className="text-2xl font-bold text-gray-800">{user.name || 'No Name'}</h1>
  //             <div className="flex justify-center mt-2">
  //               <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
  //                 {user.role ? user.role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'No Role'}
  //               </span>
  //             </div>
              
  //             {/* Status indicators */}
  //             <div className="flex justify-center space-x-4 mt-2">
  //               <div className="flex items-center">
  //                 <span className={`w-2 h-2 rounded-full mr-1 ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
  //                 <span className="text-xs text-gray-600">{user.isActive ? 'Active' : 'Inactive'}</span>
  //               </div>
                
  //               <div className="flex items-center">
  //                 <span className={`w-2 h-2 rounded-full mr-1 ${user.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
  //                 <span className="text-xs text-gray-600">{user.isVerified ? 'Verified' : 'Not Verified'}</span>
  //               </div>
  //             </div>
  //           </div>
            
  //           {/* Contact Information */}
  //           <div className="bg-gray-50 rounded-lg p-6 mb-6">
  //             <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
              
  //             <div className="mx-auto max-w-md">
  //               <div className="flex flex-col items-center border-b border-gray-200 pb-3">
  //                 <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
  //                 <p className="text-gray-800">{user.email || 'No Email'}</p>
  //               </div>
  //             </div>
  //           </div>
            
  //           {/* Skills section */}
  //           {(user.skills && user.skills.length > 0) && (
  //             <div className="bg-gray-50 rounded-lg p-6 mb-6">
  //               <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
  //               <div className="flex flex-wrap justify-center gap-2">
  //                 {user.skills.map((skill, index) => (
  //                   <span 
  //                     key={index} 
  //                     className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-100"
  //                   >
  //                     {skill}
  //                   </span>
  //                 ))}
  //               </div>
  //             </div>
  //           )}
            
  //           {/* Education section */}
  //           {(user.education && user.education.length > 0) && (
  //             <div className="bg-gray-50 rounded-lg p-6">
  //               <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
  //               <div className="space-y-4 max-w-md mx-auto">
  //                 {user.education.map((edu, index) => (
  //                   <div key={index} className="flex flex-col items-center">
  //                     <h4 className="font-medium text-gray-800">{edu.degree || 'Degree'}</h4>
  //                     <p className="text-gray-600">{edu.institution || 'Institution'}</p>
  //                     <p className="text-sm text-gray-500">
  //                       {edu.startYear || 'Start'} - {edu.endYear || 'End'}
  //                     </p>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>

     
  //   </div>
  // );

  return(
    <>
    {
      user.role === 'student' ? <UserProfile/> : 
      user.role === 'company' ? <CompanyProfile/> : 
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <h1 className="text-2xl font-semibold">Profile not available for this role</h1>
        </div>
      }
    
   
 
    </>
  )
};

export default Profile;