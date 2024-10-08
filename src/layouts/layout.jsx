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