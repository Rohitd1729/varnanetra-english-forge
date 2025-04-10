
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { CheckCircle, RefreshCw, X } from "lucide-react";

const GrammarCorrection = () => {
  const [input, setInput] = useState("");
  const [corrected, setCorrected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCorrect = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/correct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
      setCorrected(data.corrected_text);
    } catch (err) {
      setError("Error reaching the server. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setCorrected("");
    setError("");
  };

  return (
    <>
      <PageHeader 
        title="Grammar Correction" 
        description="Improve your writing with AI-powered grammar feedback"
      />
      
      <div className="content-card mb-6">
        <div className="mb-4">
          <label htmlFor="text-input" className="block text-sm font-medium mb-2">
            Enter your text
          </label>
          <textarea
            id="text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here for grammar correction..."
            className="w-full min-h-[150px] p-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          ></textarea>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCorrect}
            disabled={!input.trim() || loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
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
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors"
          >
            <X size={18} />
            Clear
          </button>
        </div>
      </div>
      
      {corrected && (
        <div className="content-card bg-green-900/20 border border-green-500/30">
          <h3 className="text-lg font-medium mb-3">Corrected Text</h3>
          <div className="p-4 bg-gray-900 rounded-md border border-gray-700">
            <p className="whitespace-pre-line">{corrected}</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="p-4 mt-4 bg-red-900/20 border border-red-500/30 rounded-md text-red-400">
          <p>{error}</p>
          <p className="text-sm mt-1">
            Make sure your backend server is running: <code>python app.py</code>
          </p>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Backend Setup</h3>
        <div className="p-4 bg-gray-900 rounded-md border border-gray-700">
          <p className="text-sm">
            To use this feature, you need to run the T5 model backend with Python + Flask:
          </p>
          <pre className="mt-2 p-3 bg-gray-800 rounded text-xs overflow-auto">
{`from flask import Flask, request, jsonify
from transformers import T5ForConditionalGeneration, T5Tokenizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = T5ForConditionalGeneration.from_pretrained("vennify/t5-base-grammar-correction")
tokenizer = T5Tokenizer.from_pretrained("vennify/t5-base-grammar-correction")

@app.route("/correct", methods=["POST"])
def correct_grammar():
    data = request.get_json()
    input_text = data.get("text", "")
    input_ids = tokenizer.encode("grammar: " + input_text, return_tensors="pt", max_length=128, truncation=True)
    outputs = model.generate(input_ids, max_length=128, num_beams=4, early_stopping=True)
    corrected_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"corrected_text": corrected_text})

if __name__ == "__main__":
    app.run(port=5000)`}
          </pre>
          <p className="mt-3 text-sm">
            Run the backend with: <code>python app.py</code>
          </p>
          <p className="mt-1 text-sm">
            You may need to install dependencies: <code>pip install flask transformers torch flask-cors</code>
          </p>
        </div>
      </div>
    </>
  );
};

export default GrammarCorrection;
