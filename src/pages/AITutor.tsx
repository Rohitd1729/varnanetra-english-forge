
import { useState, useRef, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Send, User, Bot, RefreshCw, ChevronDown } from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
};

const sampleResponses = [
  "Hello! I'm your AI English tutor. How can I help you today?",
  "That's a great question! In English, we use the present perfect tense to talk about experiences or actions that happened at an unspecified time in the past.",
  "Let me explain the difference between 'affect' and 'effect'. 'Affect' is usually a verb meaning to influence something, while 'effect' is usually a noun referring to the result of a change.",
  "Practice makes perfect! Let's try some more examples to help you understand this concept better.",
  "You're making excellent progress! I'm impressed by how quickly you're picking up these new grammar concepts.",
  "Let's break down this sentence structure step by step so you can understand how it works.",
];

const AITutor = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI English tutor. How can I help you improve your English skills today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <>
      <PageHeader 
        title="AI Tutor" 
        description="Get personalized language learning assistance"
      />
      
      <div className="content-card min-h-[70vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Chat with your AI Tutor</h2>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
              <RefreshCw size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === "ai" ? (
                    <Bot size={16} className="text-blue-300" />
                  ) : (
                    <User size={16} className="text-blue-100" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.sender === "ai" ? "AI Tutor" : "You"}
                  </span>
                </div>
                <p className="whitespace-pre-line">{message.text}</p>
                <div className="text-right mt-1">
                  <span className="text-xs opacity-50">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] md:max-w-[70%] bg-gray-700 rounded-lg p-3 rounded-bl-none">
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-blue-300" />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="mt-auto border-t border-gray-700 pt-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="w-full p-3 pr-12 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white disabled:text-gray-500 disabled:cursor-not-allowed rounded-full hover:bg-blue-500/20"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Ask questions about grammar, vocabulary, pronunciation, or request practice exercises.
          </p>
        </div>
      </div>
    </>
  );
};

export default AITutor;
