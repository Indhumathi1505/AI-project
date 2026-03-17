import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mic, PlayCircle, MessageSquare, ChevronRight, Check, Star, ArrowRight, Loader } from 'lucide-react';
import { aiApi } from '../services/api';

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('technical');
  const [currentQ, setCurrentQ] = useState(0);
  const [questions, setQuestions] = useState({ technical: [], hr: [] });
  const [loading, setLoading] = useState(true);
  const domain = localStorage.getItem('studentDomain') || 'General Software Engineering';

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await aiApi.getInterviewQuestions(domain);
        setQuestions({
          technical: res.data.technical_questions.map((q, idx) => ({
            q, difficulty: idx % 3 === 2 ? "Hard" : "Medium", completed: false
          })),
          hr: res.data.hr_questions.map((q) => ({
             q, difficulty: "Medium", completed: false
          }))
        });
      } catch (err) {
        console.error("Failed to fetch interview questions", err);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('resumeAnalyzed')) {
      fetchQuestions();
    }
  }, [domain]);

  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [feedback, setFeedback] = useState(null);

  const activeQuestions = questions[activeTab] || [];

  useEffect(() => {
    // Reset states when changing question
    setIsTyping(false);
    setIsRecording(false);
    setAnswerText('');
    setFeedback(null);
  }, [currentQ, activeTab]);

  const toggleRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      // Stop logic usually handled by recognition.stop()
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setAnswerText(transcript);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      
      recognition.start();
      // Store recognition in a ref if we need more control, but simple toggle handles most cases
    }
  };

  const submitAnswer = () => {
    if (!answerText.trim()) return;
    
    // In a real scenario, send to AI for grading
    // Mocking feedback
    setFeedback({
      score: "8.5/10",
      analysis: "Great answer! You clearly explained the concepts. Try to add more specific project examples next time."
    });

    // Mark question as completed in local state
    const category = activeTab;
    const updatedQuestions = { ...questions };
    updatedQuestions[category][currentQ].completed = true;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex justify-center">
      <div className="w-full max-w-5xl relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors block mb-2">
              &larr; Back to Dashboard
            </Link>
            {localStorage.getItem('resumeAnalyzed') && (
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                Targeting: {domain}
              </span>
            )}
          </div>
          {!localStorage.getItem('resumeAnalyzed') ? null : (
            <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex">
              <button 
                onClick={() => setActiveTab('technical')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'technical' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Technical Rounds
              </button>
              <button 
                onClick={() => setActiveTab('hr')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'hr' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                HR / Behavioral
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader className="animate-spin text-blue-500" size={40} /></div>
        ) : !localStorage.getItem('resumeAnalyzed') ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
              <Star size={32} className="text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Interview Coaching Locked</h2>
            <p className="text-slate-400 mb-8">
              To generate AI interview questions tailored to your experience, 
              please upload and scan your resume first.
            </p>
            <Link to="/resume" className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
              Scan Resume Now <ArrowRight size={20} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Question List Sidebar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[650px]">
              <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                <h3 className="font-bold text-lg">Question Bank</h3>
                <p className="text-slate-500 text-sm">Targeted {activeTab} questions</p>
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-1">
                {activeQuestions.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentQ(idx)}
                    className={`w-full text-left p-4 rounded-xl border flex items-start gap-3 transition-colors ${currentQ === idx ? 'bg-blue-600/10 border-blue-600/30' : 'bg-transparent border-transparent hover:bg-slate-800'}`}
                  >
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${item.completed ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' : 'border-slate-700'}`}>
                      {item.completed && <Check size={12} strokeWidth={3} />}
                    </div>
                    <div>
                      <p className={`text-sm ${currentQ === idx ? 'text-white font-medium' : 'text-slate-300'}`}>{item.q}</p>
                      <span className={`text-[10px] mt-2 inline-block px-2 py-0.5 rounded border ${
                        item.difficulty === 'Hard' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                        item.difficulty === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Interview Area */}
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[650px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>
              
              <div className="p-8 flex-1 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-4 block">Question {currentQ + 1} of {activeQuestions.length}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    "{activeQuestions[currentQ]?.q}"
                  </h2>
                </div>

                {/* Input Area */}
                {(isTyping || isRecording) && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl mx-auto">
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 relative">
                      {isRecording && (
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                          <span className="text-[10px] font-bold text-rose-500 uppercase">Recording...</span>
                        </div>
                      )}
                      <textarea 
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder={isRecording ? "Speak now... your voice is being transcribed." : "Type your answer here..."}
                        className="w-full h-32 bg-transparent text-slate-200 resize-none focus:outline-none text-sm leading-relaxed"
                      />
                      <div className="flex justify-end mt-2">
                        <button 
                          onClick={submitAnswer}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg"
                        >
                          Submit Answer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Feedback Area */}
                {feedback && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl mx-auto mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500 font-bold">{feedback.score}</div>
                      <h4 className="font-bold text-white">AI Feedback</h4>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{feedback.analysis}</p>
                    <button 
                      onClick={() => {
                        if (currentQ < activeQuestions.length - 1) setCurrentQ(currentQ + 1);
                      }}
                      className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300"
                    >
                      Next Question <ChevronRight size={14} />
                    </button>
                  </motion.div>
                )}
              </div>
              
              <div className="bg-slate-950/50 p-6 border-t border-slate-800">
                <div className="flex items-center justify-center gap-8">
                  <button 
                    onClick={() => { setIsTyping(true); setIsRecording(false); }}
                    className={`flex flex-col items-center gap-2 group ${isTyping ? 'scale-110' : ''}`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${isTyping ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-800 border-slate-700 group-hover:bg-slate-700'}`}>
                      <MessageSquare size={20} className={isTyping ? 'text-blue-400' : 'text-slate-300 group-hover:text-white'} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isTyping ? 'text-blue-400' : 'text-slate-500'}`}>Type Answer</span>
                  </button>
                  
                  <div className="w-px h-10 bg-slate-800"></div>

                  <button 
                    onClick={toggleRecording}
                    className={`flex flex-col items-center gap-2 group relative ${isRecording ? 'scale-110' : ''}`}
                  >
                    {isRecording && <div className="absolute -inset-2 bg-rose-500/20 rounded-full blur-md animate-pulse"></div>}
                    <div className={`w-18 h-18 rounded-full flex items-center justify-center relative z-10 transition-all ${isRecording ? 'bg-rose-600 shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-105'}`}>
                      <Mic size={28} className="text-white" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${isRecording ? 'text-rose-400' : 'text-blue-400'}`}>
                      {isRecording ? 'Stop Recording' : 'Start Audio'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
