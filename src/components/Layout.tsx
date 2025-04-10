
import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      <main className="md:ml-64 pt-0 md:pt-6 pb-16">
        <div className="container px-4 md:px-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
