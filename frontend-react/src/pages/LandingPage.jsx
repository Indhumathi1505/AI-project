import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, Target, Zap, Shield, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden font-sans">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-md border-b border-white/5 bg-slate-950/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center glow-effect">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">StudentAI</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</Link>
          <Link to="/register" className="px-5 py-2 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors shadow-lg">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Now powered by Hugging Face AI
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Predict your future. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Master your career.</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl text-slate-400 max-w-2xl mb-12">
          The ultimate AI-powered system that analyzes your resume, predicts your placement probability, and generates a personalized learning roadmap.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group">
            Start Free Analysis <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#features" className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg transition-all flex items-center justify-center gap-2">
            <PlayCircle /> Watch Demo
          </a>
        </motion.div>

        {/* Features Grid */}
        <div id="features" className="mt-40 grid md:grid-cols-3 gap-8 w-full text-left">
          <FeatureCard 
            icon={<Target className="text-blue-500" size={24} />}
            title="Placement Prediction"
            desc="Our ML model analyzes your SGPA, skills, and internships to predict your success rate at top product companies."
          />
          <FeatureCard 
            icon={<Shield className="text-emerald-500" size={24} />}
            title="Skill Gap Detection"
            desc="Instantly identify the missing skills between your current profile and industry requirements."
          />
          <FeatureCard 
            icon={<Zap className="text-amber-500" size={24} />}
            title="Smart Mock Interviews"
            desc="Practice with our AI interviewer that dynamically generates technical and HR questions tailored to you."
          />
        </div>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 text-center text-slate-500">
        <p>&copy; 2026 StudentAI Placement Platform. Built for the Expo.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  )
}
