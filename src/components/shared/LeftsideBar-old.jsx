// import React , {useState} from "react";
// import CloseIcon from "../../assets/icons/close-icon";
// import ProfileIcon from "../../assets/icons/profile-icon";

// const menuItems = [
//   {
//     name: "Dashboard",
//     icon: (
//       <svg
//         className="w-6 h-6"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//         />
//       </svg>
//     ),
//     screen: "dashboard",
//     path: "/"
//   },
//   {
//     name: "Users",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         className="w-6 h-6"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
//         />
//       </svg>
//     ),
//     screen: "users",
//     path: "/user"
//   },
//   {
//     name: "Task",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         className="w-6 h-6"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
//         />
//       </svg>
//     ),
//     screen: "task",
//     path: "/task"
//   },
//   {
//     name: "Progress",
//     icon: (
//       <svg
//         className="w-6 h-6"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//         />
//       </svg>
//     ),
//     screen: "progress",
//     path: "/progess"
//   },
// ];

// // eslint-disable-next-line react/prop-types
// const   LeftsideBar = ({currentScreen ,handleNavigation , isMobileMenuOpen , IsIsMobileMenuOpenFun }) => {
//   const [isCompact, setIsCompact] = useState(true);
  
//   return (
//     <>
//       {/* Sidebar for laptop view */}
//       <aside
//         className={`bg-[var(--navbar-bg)] text-[var(--navbar-text)] ${isCompact ? "w-16" : "w-64"} hidden lg:flex flex-col justify-between transition-all duration-300`}
//       >
//         <div className="p-4">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer ${
//                 currentScreen === item.screen
//                   ? "bg-[var(--sidebar-active)]"
//                   : "hover:bg-[var(--sidebar-hover)]"
//               } ${isCompact ? "justify-center" : ""}`}
//               onClick={() => handleNavigation(item.screen , item.path )}
//             >
//               <div
//                 className={`${isCompact ? "w-8 h-8" : "w-6 h-6"} transition-all duration-300`}
//               >
//                 {item.icon}
//               </div>
//               {(!isCompact || currentScreen === item.screen) && (
//                 <span
//                   className={`ml-2 ${isCompact ? "hidden group-hover:inline-block" : ""}`}
//                 >
//                   {item.name}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="p-4">
//           <button
//             className="w-full p-2 rounded-lg bg-[var(--sidebar-hover)] hover:bg-[var(--sidebar-active)] transition-colors duration-200 flex items-center justify-center"
//             onClick={() => setIsCompact(!isCompact)}
//           >
//             {isCompact ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </aside>

//       {/* Mobile menu (unchanged) */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
//           <div className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] h-full w-64 p-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">
//                 <img
//                   src="logo.jpg"
//                   alt="Logo"
//                   className="w-8 h-8 rounded-full"
//                 />
//               </h2>
//               <button onClick={() => IsIsMobileMenuOpenFun(false)}>
//                 <CloseIcon />
//               </button>
//             </div>
//             {menuItems.map((item, index) => (
//               <div
//                 key={index}
//                 className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer ${
//                   currentScreen === item.screen
//                     ? "bg-[var(--sidebar-active)]"
//                     : "hover:bg-[var(--sidebar-hover)]"
//                 }`}
//                 onClick={() => handleNavigation(item.screen , item.path)}
//               >
//                 {item.icon}
//                 <span className="ml-2">{item.name}</span>
//               </div>
//             ))}
//             <div className="mt-4">
//               <div className="flex items-center p-2">
//                 {/* TODO: add onclick here  */}
//                 <ProfileIcon />
//                 <span className="ml-2">Profile</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LeftsideBar;










