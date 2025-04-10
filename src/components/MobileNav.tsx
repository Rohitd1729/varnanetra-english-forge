
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Mic, MessageSquare, LineChart, Settings, X } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Grammar Correction", icon: BookOpen, path: "/grammar" },
  { name: "Pronunciation Coach", icon: Mic, path: "/pronunciation" },
  { name: "AI Tutor", icon: MessageSquare, path: "/tutor" },
  { name: "Progress", icon: LineChart, path: "/progress" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 bg-sidebar">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="font-bold text-white">V</span>
          </div>
          <span className="text-xl font-bold text-white">Varnanetra</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          <Menu size={24} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsOpen(false)} className="text-white p-2">
              <X size={24} />
            </button>
          </div>

          <nav className="px-4 py-6">
            <ul className="space-y-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`sidebar-item ${isActive ? "active" : ""}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
