import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertTriangle, ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

import { aiApi } from '../services/api';

export default function ResumeAnalyzer() {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', new Blob(['fake content'], { type: 'application/pdf' }));
      const response = await aiApi.analyzeResume(formData);
      
      setResult({
        score: response.data.resume_score,
        skills: response.data.extracted_skills,
        missing: ['Deep Learning', 'System Design'],
        tips: response.data.improvement_tips
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center">
      <div className="absolute top-0 w-full h-96 bg-blue-600/5 blur-3xl -z-10 rounded-full mix-blend-screen"></div>
      
      <div className="w-full max-w-4xl flex items-center justify-between mb-12 relative z-10">
        <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
           &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
           Resume AI Scanner
        </h1>
      </div>

      {!result ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-2xl relative z-10"
        >
          <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-6">
            <Upload size={32} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Upload your Resume</h2>
          <p className="text-slate-400 mb-8 max-w-md">
            Our AI model will extract your skills, analyze the quality of your resume, and provide actionable tips for improvement.
          </p>
          
          <button 
            onClick={handleUpload}
            disabled={isUploading}
            className="relative overflow-hidden group px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <span className="flex items-center gap-2"><Loader className="animate-spin" size={20}/> Analyzing with AI...</span>
            ) : (
              <span className="flex items-center gap-2"><FileText size={20}/> Browse PDF or DOCX</span>
            )}
          </button>
          <p className="mt-4 text-xs text-slate-500">Maximum file size: 5MB</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl grid md:grid-cols-3 gap-6 relative z-10"
        >
          {/* Score Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-slate-400 font-medium mb-6">ATS Resume Score</h3>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="60" className="stroke-slate-800" strokeWidth="8" fill="none" />
                <motion.circle 
                  initial={{ strokeDashoffset: 377 }} animate={{ strokeDashoffset: 377 - (377 * result.score) / 100 }} transition={{ duration: 1.5, delay: 0.2 }}
                  cx="64" cy="64" r="60" className="stroke-blue-500" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="377" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{result.score}</span>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><CheckCircle className="text-emerald-500" size={20} /> Extracted Skills</h3>
             <div className="flex flex-wrap gap-2 mb-8">
               {result.skills.map((skill, i) => (
                 <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{skill}</span>
               ))}
             </div>

             <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="text-amber-500" size={20} /> Areas for Improvement</h3>
             <ul className="space-y-3">
               {result.tips.map((tip, i) => (
                 <li key={i} className="flex gap-3 text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                   <ArrowRight size={18} className="text-blue-500 shrink-0 mt-0.5" /> {tip}
                 </li>
               ))}
             </ul>

             <button 
               onClick={() => setResult(null)}
               className="mt-6 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors"
             >
               Scan another resume
             </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
