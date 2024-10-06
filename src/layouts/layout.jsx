import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import LeftsideBar from "../components/shared/LeftsideBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const navigation = useNavigate();

  const handleNavigation = (screen, path) => {
    setCurrentScreen(screen);
    setIsMobileMenuOpen(false);
    navigation(path);
  }; 

  return (
    <div className="flex flex-col h-screen">

      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        IsIsMobileMenuOpenFun={setIsMobileMenuOpen}
      />

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {user &&
          //@ts-ignore
          user.role !== "contractor" && (
            <>
              <LeftsideBar
                currentScreen={currentScreen}
                handleNavigation={handleNavigation}
                isMobileMenuOpen={isMobileMenuOpen}
                IsIsMobileMenuOpenFun={setIsMobileMenuOpen}
              />
            </>
          )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

// const Layout1: React.FC<LayoutProps> = ({ children }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [currentScreen, setCurrentScreen] = useState("dashboard");
//   const [isCompact, setIsCompact] = useState(true);

//   const handleNavigation = (screen: string) => {
//     setCurrentScreen(screen);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <style>
//         {`
//           :root {
//             --navbar-bg: #2f1380;
//             --navbar-text: #ffffff;
//             --sidebar-hover: rgba(255, 255, 255, 0.1);
//             --sidebar-active: rgba(255, 255, 255, 0.2);
//           }
//         `}
//       </style>
//       {/* Navbar */}

//       {/* Content area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar for laptop view */}
//         <aside
//           className={`bg-[var(--navbar-bg)] text-[var(--navbar-text)] ${isCompact ? "w-16" : "w-64"} hidden lg:flex flex-col justify-between transition-all duration-300`}
//         >
//           <div className="p-4">
//             {menuItems.map((item, index) => (
//               <div
//                 key={index}
//                 className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer ${
//                   currentScreen === item.screen
//                     ? "bg-[var(--sidebar-active)]"
//                     : "hover:bg-[var(--sidebar-hover)]"
//                 } ${isCompact ? "justify-center" : ""}`}
//                 onClick={() => handleNavigation(item.screen)}
//               >
//                 <div
//                   className={`${isCompact ? "w-8 h-8" : "w-6 h-6"} transition-all duration-300`}
//                 >
//                   {item.icon}
//                 </div>
//                 {(!isCompact || currentScreen === item.screen) && (
//                   <span
//                     className={`ml-2 ${isCompact ? "hidden group-hover:inline-block" : ""}`}
//                   >
//                     {item.name}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="p-4">
//             <button
//               className="w-full p-2 rounded-lg bg-[var(--sidebar-hover)] hover:bg-[var(--sidebar-active)] transition-colors duration-200 flex items-center justify-center"
//               onClick={() => setIsCompact(!isCompact)}
//             >
//               {isCompact ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </aside>

//         {/* Mobile menu (unchanged) */}
//         {isMobileMenuOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
//             <div className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] h-full w-64 p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">
//                   <img
//                     src="logo.jpg"
//                     alt="Logo"
//                     className="w-8 h-8 rounded-full"
//                   />
//                 </h2>
//                 <button onClick={() => setIsMobileMenuOpen(false)}>
//                   <CloseIcon />
//                 </button>
//               </div>
//               {menuItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer ${
//                     currentScreen === item.screen
//                       ? "bg-[var(--sidebar-active)]"
//                       : "hover:bg-[var(--sidebar-hover)]"
//                   }`}
//                   onClick={() => handleNavigation(item.screen)}
//                 >
//                   {item.icon}
//                   <span className="ml-2">{item.name}</span>
//                 </div>
//               ))}
//               <div className="mt-4">
//                 <div className="flex items-center p-2">
//                   <ProfileIcon />
//                   <span className="ml-2">Profile</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Main content */}
//         <main className="flex-1 p-4 overflow-auto">
//           <h2 className="text-2xl font-bold mb-4">
//             Welcome to{" "}
//             {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
//           </h2>
//           <p>
//             This is where your main content for the {currentScreen} screen will
//             be displayed.
//           </p>
//         </main>
//       </div>
//     </div>
//   );
// };
