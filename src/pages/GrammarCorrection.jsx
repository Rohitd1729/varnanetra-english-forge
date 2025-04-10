
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { CheckCircle, RefreshCw } from "lucide-react";

const GrammarCorrection = () => {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCorrection = () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    
    // Simulating an API call for grammar correction
    setTimeout(() => {
      // This is a mock correction - in a real app this would come from a grammar API
      const corrections = [
        { original: "i am", corrected: "I am" },
        { original: "dont", corrected: "don't" },
        { original: "its", corrected: "it's" },
        { original: "english", corrected: "English" },
      ];
      
      let result = text;
      corrections.forEach(({ original, corrected }) => {
        result = result.replace(new RegExp(original, "gi"), corrected);
      });
      
      setCorrectedText(result);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setText("");
    setCorrectedText(null);
  };

  return (
    <>
      <PageHeader 
        title="Grammar Correction" 
        description="Improve your writing with instant grammar feedback"
      />
      
      <div className="content-card mb-6">
        <div className="mb-4">
          <label htmlFor="text-input" className="block text-sm font-medium mb-2">
            Enter your text
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here for grammar correction..."
            className="w-full min-h-[150px] p-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          ></textarea>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCorrection}
            disabled={!text.trim() || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Correcting...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                Correct Grammar
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      
      {correctedText && (
        <div className="content-card">
          <h3 className="text-lg font-medium mb-3">Corrected Text</h3>
          <div className="p-4 bg-gray-900 rounded-md border border-gray-700">
            <p className="whitespace-pre-line">{correctedText}</p>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Corrections have been applied to improve grammar, punctuation, and capitalization.
          </p>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Grammar Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Subject-Verb Agreement",
              description: "Ensure subjects and verbs agree in number (singular or plural).",
            },
            {
              title: "Article Usage",
              description: "Learn when to use 'a', 'an', and 'the' properly in sentences.",
            },
            {
              title: "Punctuation",
              description: "Master commas, periods, and other punctuation marks.",
            },
            {
              title: "Prepositions",
              description: "Understand how to use prepositions correctly in your writing.",
            },
          ].map((tip, i) => (
            <div key={i} className="p-4 bg-secondary rounded-lg">
              <h4 className="font-medium mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-400">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GrammarCorrection;
