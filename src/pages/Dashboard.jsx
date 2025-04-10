
import PageHeader from "../components/PageHeader";
import { Sparkles, Award, Clock, BookOpen, Mic, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <PageHeader 
        title="Welcome to Varnanetra" 
        description="Your personal English learning platform"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Learning Streak</p>
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Sparkles size={18} className="text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold">5 Days</p>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Grammar Score</p>
            <div className="p-2 bg-green-500/20 rounded-full">
              <Award size={18} className="text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold">78%</p>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Time Spent</p>
            <div className="p-2 bg-purple-500/20 rounded-full">
              <Clock size={18} className="text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold">3.5 hrs</p>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Lessons Completed</p>
            <div className="p-2 bg-orange-500/20 rounded-full">
              <BookOpen size={18} className="text-orange-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold">12</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="content-card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link to="/grammar" className="flex items-center gap-3 p-3 rounded-md border border-white/10 hover:bg-white/5 transition-colors">
              <BookOpen size={20} className="text-blue-500" />
              <div>
                <p className="font-medium">Grammar Correction</p>
                <p className="text-sm text-gray-400">Improve your writing skills</p>
              </div>
            </Link>
            
            <Link to="/pronunciation" className="flex items-center gap-3 p-3 rounded-md border border-white/10 hover:bg-white/5 transition-colors">
              <Mic size={20} className="text-blue-500" />
              <div>
                <p className="font-medium">Pronunciation Coach</p>
                <p className="text-sm text-gray-400">Practice your speaking</p>
              </div>
            </Link>
            
            <Link to="/tutor" className="flex items-center gap-3 p-3 rounded-md border border-white/10 hover:bg-white/5 transition-colors">
              <MessageSquare size={20} className="text-blue-500" />
              <div>
                <p className="font-medium">AI Tutor</p>
                <p className="text-sm text-gray-400">Get personalized guidance</p>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="content-card">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm">Grammar Mastery</p>
                <p className="text-sm font-medium">78%</p>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm">Pronunciation Accuracy</p>
                <p className="text-sm font-medium">65%</p>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm">Vocabulary Range</p>
                <p className="text-sm font-medium">83%</p>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "83%" }}></div>
              </div>
            </div>
            
            <Link to="/progress" className="text-sm text-blue-500 hover:underline">
              View detailed progress →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="content-card">
        <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Common Grammar Mistakes", "Pronunciation Tips", "Building Vocabulary"].map((item, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-medium mb-2">{item}</h3>
              <p className="text-sm text-gray-400 mb-3">Learn essential skills to improve your English proficiency</p>
              <button className="text-sm text-blue-500 hover:underline">Start Learning</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
