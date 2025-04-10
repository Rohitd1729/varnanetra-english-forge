
import PageHeader from "../components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Award, TrendingUp, Clock, Zap } from "lucide-react";

const weeklyData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 30 },
  { day: "Wed", minutes: 60 },
  { day: "Thu", minutes: 35 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 70 },
  { day: "Sun", minutes: 40 },
];

const focusData = [
  { name: "Grammar", value: 35 },
  { name: "Vocabulary", value: 25 },
  { name: "Pronunciation", value: 20 },
  { name: "Conversation", value: 20 },
];

const FOCUS_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EC4899"];

const Progress = () => {
  return (
    <>
      <PageHeader 
        title="Learning Progress" 
        description="Track your English learning journey"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Proficiency Level</p>
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Award size={18} className="text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold">Intermediate</p>
          <p className="text-xs text-gray-400">B1 level on CEFR scale</p>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Weekly Streak</p>
            <div className="p-2 bg-green-500/20 rounded-full">
              <TrendingUp size={18} className="text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold">5 Days</p>
          <p className="text-xs text-gray-400">Keep going!</p>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Total Time Spent</p>
            <div className="p-2 bg-purple-500/20 rounded-full">
              <Clock size={18} className="text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold">24.5 hrs</p>
          <p className="text-xs text-gray-400">Since you started</p>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Vocab Mastered</p>
            <div className="p-2 bg-orange-500/20 rounded-full">
              <Zap size={18} className="text-orange-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold">342 words</p>
          <p className="text-xs text-gray-400">+24 this week</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="content-card">
          <h3 className="text-lg font-medium mb-3">Weekly Learning Activity</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" label={{ value: 'Minutes', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  itemStyle={{ color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="minutes" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="content-card">
          <h3 className="text-lg font-medium mb-3">Learning Focus Areas</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={focusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {focusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FOCUS_COLORS[index % FOCUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  itemStyle={{ color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="content-card">
        <h3 className="text-lg font-medium mb-4">Skill Assessment</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <p>Grammar Mastery</p>
              <p className="font-medium">78%</p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <p>Vocabulary Range</p>
              <p className="font-medium">65%</p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <p>Pronunciation Accuracy</p>
              <p className="font-medium">70%</p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <p>Listening Comprehension</p>
              <p className="font-medium">82%</p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "82%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <p>Reading Fluency</p>
              <p className="font-medium">88%</p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full" style={{ width: "88%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
