
import { Home, BookOpen, Mic, MessageSquare, LineChart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Grammar Correction", icon: BookOpen, path: "/grammar" },
  { name: "Pronunciation Coach", icon: Mic, path: "/pronunciation" },
  { name: "AI Tutor", icon: MessageSquare, path: "/tutor" },
  { name: "Progress", icon: LineChart, path: "/progress" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-sidebar fixed left-0 top-0">
      <div className="flex items-center gap-2 px-6 py-4 h-16">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="font-bold text-white">V</span>
        </div>
        <span className="text-xl font-bold text-white">Varnanetra</span>
      </div>
      
      <nav className="mt-8 px-3 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          <div>
            <p className="text-sm font-medium text-white">User Name</p>
            <p className="text-xs text-white/70">English Learner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
