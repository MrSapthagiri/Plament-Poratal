// // import { NavLink } from 'react-router-dom';
// // import {
// //   HomeIcon,
// //   UserGroupIcon,
// //   BuildingOfficeIcon,
// //   BriefcaseIcon,
// //   UserIcon,
// // } from '@heroicons/react/24/outline';
// // import logo from "../assets/logo.jpg"

// // const navigation = [
// //   { name: 'Dashboard', href: '/', icon: HomeIcon },
// //   { name: 'Students', href: '/students', icon: UserGroupIcon },
// //   { name: 'Companies', href: '/companies', icon: BuildingOfficeIcon },
// //   { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon },
// //   { name: 'Profile', href: '/profile', icon: UserIcon },
// // ];

// // const Sidebar = () => {
// //   const user = JSON.parse(localStorage.getItem('user')) || {};

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-64 bg-primary">
// //       <div className="flex flex-col h-full">
// //       <div className="flex items-center justify-center h-20 px-4 py-2 bg-primary-dark border-b">
// //         <img
// //           src={logo}
// //           alt="logo"
// //           className="w-12 h-auto sm:w-16 md:w-20 lg:w-24 xl:w-28 bg-white border border-gray-300 rounded-lg"
// //         />
// //       </div>


// //         <div className="flex-1 px-3 py-4 space-y-1">
// //           {navigation.map((item) => (
// //             <NavLink
// //               key={item.name}
// //               to={item.href}
// //               className={({ isActive }) =>
// //                 `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
// //                   isActive
// //                     ? 'bg-primary-light text-white'
// //                     : 'text-gray-300 hover:bg-primary-light hover:text-white'
// //                 }`
// //               }
// //             >
// //               <item.icon className="w-5 h-5 mr-3" />
// //               {item.name}
// //             </NavLink>
// //           ))}
// //         </div>

// //         <div className="p-4 bg-primary-dark">
// //           <div className="text-sm text-gray-300">
// //             <div>Logged in as:</div>
// //             <div className="font-medium text-white">{user.name}</div>
// //             <div className="text-xs">{user.role}</div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import { NavLink } from 'react-router-dom';
// import {
//   HomeIcon,
//   UserGroupIcon,
//   BuildingOfficeIcon,
//   BriefcaseIcon,
//   UserIcon,
//   ChatBubbleLeftRightIcon,
// } from '@heroicons/react/24/outline';
// import logo from "../assets/logo.jpg"

// const navigation = [
//   { name: 'Dashboard', href: '/', icon: HomeIcon },
//   { name: 'Students', href: '/students', icon: UserGroupIcon },
//   { name: 'Companies', href: '/companies', icon: BuildingOfficeIcon },
//   { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon },
//   { name: 'Profile', href: '/profile', icon: UserIcon },
//   { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon }, // Changed to a proper route
// ];

// const Sidebar = () => {
//   const user = JSON.parse(localStorage.getItem('user')) || {};

//   return (
//     <div className="fixed inset-y-0 left-0 w-64 bg-primary">
//       <div className="flex flex-col h-full">
//         <div className="flex items-center justify-center h-20 px-4 py-2 bg-primary-dark border-b">
//           <img
//             src={logo}
//             alt="logo"
//             className="w-12 h-auto sm:w-16 md:w-20 lg:w-24 xl:w-28 bg-white border border-gray-300 rounded-lg"
//           />
//         </div>

//         <div className="flex-1 px-3 py-4 space-y-1">
//           {navigation.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.href}
//               className={({ isActive }) =>
//                 `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
//                   isActive
//                     ? 'bg-primary-light text-white'
//                     : 'text-gray-300 hover:bg-primary-light hover:text-white'
//                 }`
//               }
//             >
//               <item.icon className="w-5 h-5 mr-3" />
//               {item.name}
//             </NavLink>
//           ))}
//         </div>

//         <div className="p-4 bg-primary-dark">
//           <div className="text-sm text-gray-300">
//             <div>Logged in as:</div>
//             <div className="font-medium text-white">{user.name}</div>
//             <div className="text-xs">{user.role}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import logo from "../assets/logo.jpg";
import { use } from 'react';

const navigationbase = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Students', href: '/students', icon: UserGroupIcon },
  { name: 'Applications', href: '/company-applications', icon: BriefcaseIcon }, // Changed to a proper route
  { name: 'Companies', href: '/companies', icon: BuildingOfficeIcon },///company-applications
  { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
];

const studentnavigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Companies', href: '/companies', icon: BuildingOfficeIcon },
  { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon },
   { name: 'applications', href: '/applications', icon: BriefcaseIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
];

const user = JSON.parse(localStorage.getItem('user')) || {};
console.log(user.role);

let navigation=user.role==="student"?studentnavigation  : navigationbase;

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-primary flex flex-col">
      
      {/* Logo with white background and rounded corners */}
      <div className="h-20 px-4 py-2 w-full flex items-center justify-center bg-white border-b px-4">
        <div className="bg-white rounded-xl p-2 w-80 h-20 h- flex items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className="object-contain h-full w-full rounded-lg"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-primary-light text-white'
                  : 'text-gray-300 hover:bg-primary-light hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Footer User Info */}
      <div className="p-2 bg-primary-dark border-t">
        <div className="text-sm text-gray-300">
          <div>Logged in as:</div>
          <div className="font-medium text-white">{user.name}</div>
          <div className="text-xs">{user.role}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

