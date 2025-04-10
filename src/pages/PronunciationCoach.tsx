
import { useState, useRef } from "react";
import PageHeader from "../components/PageHeader";
import { Mic, StopCircle, Play, RefreshCw, Volume2 } from "lucide-react";

const phrases = [
  "The quick brown fox jumps over the lazy dog.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
  "She sells seashells by the seashore.",
  "Peter Piper picked a peck of pickled peppers.",
  "I scream, you scream, we all scream for ice cream.",
];

const PronunciationCoach = () => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        audioChunksRef.current = [];
        
        // Simulate pronunciation scoring
        setIsLoading(true);
        setTimeout(() => {
          const randomScore = Math.floor(Math.random() * 41) + 60; // Random score between 60-100
          setScore(randomScore);
          setIsLoading(false);
        }, 1500);
      };
      
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };
  
  const playAudio = () => {
    if (audioRef.current && audioURL) {
      audioRef.current.play();
    }
  };
  
  const playExample = () => {
    // In a real app, this would play a native speaker's pronunciation
    // For this demo, we'll use browser's speech synthesis
    const utterance = new SpeechSynthesisUtterance(currentPhrase);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };
  
  const getRandomPhrase = () => {
    const newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(newPhrase);
    setAudioURL(null);
    setScore(null);
  };
  
  return (
    <>
      <PageHeader 
        title="Pronunciation Coach" 
        description="Improve your English pronunciation with real-time feedback"
      />
      
      <div className="content-card mb-6">
        <h3 className="text-lg font-medium mb-3">Practice Phrase</h3>
        <div className="p-4 bg-gray-900 rounded-md border border-gray-700 mb-4">
          <p className="text-xl">{currentPhrase}</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={playExample}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium transition-colors"
          >
            <Volume2 size={18} />
            Listen to Example
          </button>
          
          <button
            onClick={getRandomPhrase}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors"
          >
            <RefreshCw size={18} />
            New Phrase
          </button>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-medium mb-3">Record Your Pronunciation</h3>
          
          <div className="flex flex-wrap gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-medium transition-colors"
              >
                <Mic size={18} />
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors animate-pulse"
              >
                <StopCircle size={18} />
                Stop Recording
              </button>
            )}
            
            {audioURL && (
              <button
                onClick={playAudio}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white font-medium transition-colors"
              >
                <Play size={18} />
                Play Recording
              </button>
            )}
          </div>
          
          {audioURL && (
            <div className="mt-4">
              <audio ref={audioRef} src={audioURL} controls className="w-full" />
            </div>
          )}
        </div>
      </div>
      
      {(score !== null || isLoading) && (
        <div className="content-card">
          <h3 className="text-lg font-medium mb-3">Pronunciation Feedback</h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <RefreshCw size={24} className="animate-spin mr-2" />
              <span>Analyzing pronunciation...</span>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <p>Accuracy Score</p>
                  <p className="font-medium">{score}%</p>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      score >= 80 
                        ? "bg-green-500" 
                        : score >= 60 
                        ? "bg-yellow-500" 
                        : "bg-red-500"
                    }`} 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-900 rounded-md border border-gray-700">
                <h4 className="font-medium mb-2">Feedback</h4>
                <ul className="space-y-2 text-sm">
                  {score >= 80 ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Great pronunciation! Your rhythm and intonation are excellent.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Clear articulation of most sounds.</span>
                      </li>
                    </>
                  ) : score >= 60 ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500">⚠</span>
                        <span>Good attempt. Pay attention to the stressed syllables in longer words.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500">⚠</span>
                        <span>Some difficulty with specific sounds. Try practicing them individually.</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">✗</span>
                        <span>Try slowing down to improve clarity.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">✗</span>
                        <span>Focus on the rhythm of English sentences.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PronunciationCoach;
