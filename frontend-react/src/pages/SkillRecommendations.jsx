import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, CheckCircle, Target, ArrowRight, PlayCircle } from 'lucide-react';

export default function SkillRecommendations() {
  const roadmap = [
    { month: "Month 1", title: "Advanced React & State Management", desc: "Master Redux Toolkit, Context API, and custom hooks.", status: "current" },
    { month: "Month 2", title: "Backend Integration", desc: "Connect React to Node.js APIs, Handle JWT Auth.", status: "upcoming" },
    { month: "Month 3", title: "TypeScript & Testing", desc: "Migrate components to TS, add Jest & React Testing Library.", status: "upcoming" },
    { month: "Month 4", title: "CI/CD & Deployment", desc: "Dockerize application, set up GitHub Actions, deploy to AWS.", status: "upcoming" }
  ];

  const courses = [
    { title: "React - The Complete Guide", platform: "Udemy", match: "98%", time: "40h" },
    { title: "Docker for Frontend Developers", platform: "Coursera", match: "85%", time: "15h" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex justify-center">
      <div className="w-full max-w-6xl relative z-10">
        
        <div className="flex items-center justify-between mb-10">
          <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
            Learning Roadmap
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Roadmap Path */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <MapPin className="text-emerald-500" /> Your Personalized Path
            </h2>
            
            <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pb-4">
              {roadmap.map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                  key={idx} className="relative pl-8"
                >
                  <div className={`absolute -left-2.5 top-1.5 w-5 h-5 rounded-full border-4 border-slate-950 ${step.status === 'current' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-700'}`}></div>
                  <div className={`p-5 rounded-xl border ${step.status === 'current' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}>
                    <span className={`text-xs font-bold uppercase tracking-wider ${step.status === 'current' ? 'text-emerald-400' : 'text-slate-500'}`}>{step.month}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{step.title}</h3>
                    <p className="text-slate-400 mt-2 text-sm leading-relaxed">{step.desc}</p>
                    {step.status === 'current' && (
                      <button className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-900/50">
                        Start Learning Now
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side Panel: Missing Skills & Recommended */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="text-amber-500" size={20} /> Critical Gaps
              </h3>
              <ul className="space-y-3">
                {['TypeScript', 'Docker', 'Testing Frameworks'].map((gap, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> {gap}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-blue-500" size={20} /> Recommended Courses
              </h3>
              <div className="space-y-4">
                {courses.map((course, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 group hover:border-slate-700 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">{course.title}</h4>
                      <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded border border-blue-500/20">{course.match} Match</div>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                      <span>{course.platform} &bull; {course.time}</span>
                      <PlayCircle size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
