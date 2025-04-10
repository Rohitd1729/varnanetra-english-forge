
import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      <main className="md:ml-64 pt-0 md:pt-6 pb-16">
        <div className="container px-4 md:px-8 max-w-6xl">
          <div className="flex justify-end mb-4 md:mb-0">
            <ThemeToggle />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
