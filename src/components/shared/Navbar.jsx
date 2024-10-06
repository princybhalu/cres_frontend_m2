import React from "react";
import ProfileIcon from "../../assets/icons/profile-icon";
import MenuIcon from "../../assets/icons/menu-icon";
import logo from "../../assets/images/logo.jpg";
import { useSelector } from "react-redux";

const Navbar = ({
  // eslint-disable-next-line react/prop-types
  IsIsMobileMenuOpenFun,
  // eslint-disable-next-line react/prop-types
  isMobileMenuOpen,
}) => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  
  return (
    <nav className="bg-[var(--navbar-bg)] text-white p-2">
      <div className="flex justify-between items-center">
        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <button
            className="h-6 w-6 cursor-pointer"
            onClick={() => IsIsMobileMenuOpenFun(!isMobileMenuOpen)}
          > <MenuIcon /></button>
        </div>

        {/* Logo and company name */}
        <div className="hidden lg:flex items-center space-x-2">
          <img
            src={logo}
            alt="HP Logo"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-bold">
              Hindustan Petroleum Corporation Limited
            </h1>
            <p className="text-xs">हिंदुस्तान पेट्रोलियम कॉर्पोरेशन लिमिटेड</p>
          </div>
        </div>

        {/* Central title */}
        <div className="text-center flex-grow">
          <h2 className="text-xl font-semibold text-white my-auto">
          Centralized Retail Engineering System
          </h2>
        </div>

        {/* User info */}
        <div className="hidden lg:flex items-center space-x-2">
          <span>Welcome</span>
          <span className="font-semibold">{
          //@ts-ignore
          user?.firstname}</span>
        </div>
        <div className="ml-1 hidden lg:flex">
           <ProfileIcon />
     </div>

        {/* Mobile user icon */}
        <div className="lg:hidden">
          <ProfileIcon />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 space-y-2">
          <div>Hindustan Petroleum Corporation Limited</div>
          <div>हिंदुस्तान पेट्रोलियम कॉर्पोरेशन लिमिटेड</div>
          <div>Welcome SALES_USER - Sales User</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
