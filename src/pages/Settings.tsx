
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Save, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    nativeLanguage: "Hindi",
    proficiencyLevel: "intermediate",
    darkMode: true,
    notifications: true,
    soundEffects: true,
    autoTranslate: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the settings to an API or local storage
    console.log("Settings saved:", formData);
    
    toast({
      title: "Settings Updated",
      description: "Your preferences have been saved successfully.",
    });
  };
  
  return (
    <>
      <PageHeader 
        title="Settings" 
        description="Customize your learning experience"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="content-card">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="nativeLanguage" className="block text-sm font-medium mb-1">
                  Native Language
                </label>
                <select
                  id="nativeLanguage"
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="proficiencyLevel" className="block text-sm font-medium mb-1">
                  English Proficiency Level
                </label>
                <select
                  id="proficiencyLevel"
                  name="proficiencyLevel"
                  value={formData.proficiencyLevel}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="beginner">Beginner (A1)</option>
                  <option value="elementary">Elementary (A2)</option>
                  <option value="intermediate">Intermediate (B1)</option>
                  <option value="upperIntermediate">Upper Intermediate (B2)</option>
                  <option value="advanced">Advanced (C1)</option>
                  <option value="proficient">Proficient (C2)</option>
                </select>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-4">Preferences</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <input
                  id="darkMode"
                  name="darkMode"
                  type="checkbox"
                  checked={formData.darkMode}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="darkMode" className="ml-2 block text-sm">
                  Dark Mode
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm">
                  Enable Notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="soundEffects"
                  name="soundEffects"
                  type="checkbox"
                  checked={formData.soundEffects}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="soundEffects" className="ml-2 block text-sm">
                  Sound Effects
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="autoTranslate"
                  name="autoTranslate"
                  type="checkbox"
                  checked={formData.autoTranslate}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="autoTranslate" className="ml-2 block text-sm">
                  Auto-Translate Difficult Words
                </label>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium transition-colors"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="content-card">
            <h3 className="text-lg font-medium mb-4">Account Overview</h3>
            
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-3">
                <UserCircle size={64} className="text-gray-400" />
              </div>
              <p className="font-medium">{formData.name}</p>
              <p className="text-sm text-gray-400">{formData.email}</p>
            </div>
            
            <div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <p className="text-sm text-gray-400">Subscription</p>
                <p className="text-sm font-medium">Pro Plan</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <p className="text-sm text-gray-400">Renewal Date</p>
                <p className="text-sm font-medium">Jan 15, 2025</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="text-sm text-gray-400">Account Created</p>
                <p className="text-sm font-medium">Oct 12, 2024</p>
              </div>
            </div>
          </div>
          
          <div className="content-card mt-6">
            <h3 className="text-lg font-medium mb-4">Data & Privacy</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left text-sm text-blue-400 hover:text-blue-300">
                Download My Data
              </button>
              <button className="w-full text-left text-sm text-blue-400 hover:text-blue-300">
                Privacy Settings
              </button>
              <button className="w-full text-left text-sm text-red-400 hover:text-red-300">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
