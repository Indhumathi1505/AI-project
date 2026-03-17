import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { Briefcase, BarChart, BookOpen, Star, User, Loader, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { aiApi } from '../services/api';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend, Filler
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  const [prediction, setPrediction] = useState({ probability: 0, readiness: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentId = localStorage.getItem('studentId');
        if(!studentId) {
          navigate('/login');
          return;
        }

        const profileRes = await aiApi.getStudentProfile(studentId);
        const profileData = profileRes.data;
        
        if (!profileData) {
          throw new Error("Student profile not found. Please log in again.");
        }
        
        setStudent(profileData);

        // Fetch prediction metrics from the Spring Boot API, which proxies to Python AI!
        const predictionRes = await aiApi.predictPlacement({
            id: profileData.id,
            cgpa: profileData.cgpa,
            skills: profileData.skills || [],
            internships: profileData.internships || [],
            projects: profileData.projects || []
        });

        setPrediction({
            probability: predictionRes.data.placementProbability || 0,
            readiness: predictionRes.data.readinessScore || 0
        });
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        setError(err.message || "Failed to connect to AI services.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [navigate]);

  const getRadarData = () => {
    const defaultLabels = ['Java', 'Python', 'React', 'SQL', 'Data Structures', 'Git'];
    const studentSkills = student?.skills?.slice(0, 6) || [];
    const labels = studentSkills.length > 0 ? studentSkills : defaultLabels;
    
    // In a real app, these values would come from an assessment API
    // Here we generate simulated levels for the UI demonstration
    const currentLevels = labels.map((_, i) => 60 + (i * 7) % 35);
    const targetLevels = labels.map(() => 85);

    return {
      labels,
      datasets: [
        {
          label: 'Your Level',
          data: currentLevels,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
        },
        {
          label: 'Industry Standard',
          data: targetLevels,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'rgba(16, 185, 129, 0.8)',
          borderWidth: 2,
          borderDash: [5, 5],
        }
      ],
    };
  };

  const radarData = getRadarData();

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#888', font: { size: 12 } },
        ticks: { display: false, max: 100, min: 0 }
      }
    },
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  return (
    <div className="flex h-screen text-slate-100 overflow-hidden relative">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }} animate={{ x: 0 }}
        className="w-64 border-r border-white/5 bg-slate-950/20 backdrop-blur-3xl p-6 hidden md:flex flex-col relative z-20"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center glow-effect">
            <User size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            StudentAI
          </h2>
        </div>

        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-600/20">
            <BarChart size={18} /> Overview
          </Link>
          <Link to="/resume" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
            <Briefcase size={18} /> Resume AI
          </Link>
          <Link to="/skills" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
            <BookOpen size={18} /> Roadmap
          </Link>
          <Link to="/interview" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
            <Star size={18} /> Mock Interview
          </Link>
        </nav>
      </motion.aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10">
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {student?.name || 'Student'}!</h1>
              <p className="text-slate-400 mt-1">Here is your real-time AI career readiness analysis.</p>
            </div>
          </header>

          {loading ? (
             <div className="flex justify-center items-center py-20 flex-col">
               <Loader className="animate-spin text-blue-500 mb-4" size={48} />
               <span className="text-slate-400 font-medium">AI is analyzing your profile...</span>
               <p className="text-xs text-slate-600 mt-2">Connecting to microservices (Port 8000 & 8083)</p>
             </div>
          ) : error ? (
            <div className="py-20 flex flex-col items-center text-center max-w-md mx-auto bg-slate-900/50 border border-red-500/20 rounded-3xl p-8">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                 <Info size={32} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Connection Issue</h2>
              <p className="text-slate-400 mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700"
              >
                Retry Connection
              </button>
            </div>
          ) : !localStorage.getItem('resumeAnalyzed') ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 flex flex-col items-center text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Briefcase size={32} className="text-amber-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Resume Scan Required</h2>
              <p className="text-slate-400 mb-8">
                To generate your personalized placement probability, skill gap analysis, and roadmap, 
                you must first upload your resume for AI scanning.
              </p>
              <Link to="/resume" className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
                Scan Resume Now <ArrowRight size={20} />
              </Link>
            </motion.div>
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-slate-400 text-sm font-medium mb-2">Placement Probability</h3>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">{Math.round(prediction.probability)}<span className="text-blue-500 text-2xl">%</span></span>
                <span className="text-emerald-400 text-sm mb-1 font-medium">Predicted via AI</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-slate-400 text-sm font-medium mb-2">Readiness Score</h3>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">{Math.round(prediction.readiness)}<span className="text-slate-500 text-2xl">/100</span></span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
               className="p-6 rounded-2xl glass-panel col-span-1 md:col-span-2 relative overflow-hidden flex items-center justify-between">
               <div className="flex-1 pr-4">
                 <h3 className="text-slate-400 text-sm font-medium mb-2 flex items-center gap-2">
                   <Info size={14} className="text-blue-400" /> AI Status Overview
                 </h3>
                 <p className="text-slate-200 text-sm leading-relaxed">
                   Based on your <span className="text-blue-400 font-semibold">{student?.skills?.length || 0} extracted skills</span>, 
                   you have a <span className="text-emerald-400 font-semibold">Strong Match</span> for Frontend roles. 
                   We recommend focusing on <span className="text-amber-400">System Design</span> to reach the 90%+ probability tier.
                 </p>
                 <div className="mt-4 flex gap-4">
                    <Link to="/skills" className="text-blue-400 hover:text-blue-300 text-xs font-bold flex items-center gap-1">
                      Improve Readiness <ArrowRight size={14} />
                    </Link>
                 </div>
               </div>
               <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center border-t-emerald-500 border-r-emerald-500 border-b-slate-800 border-l-slate-800 transform rotate-[135deg]">
                 <span className="text-emerald-400 font-bold -rotate-[135deg] block text-sm">Optimal</span>
               </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl glass-panel lg:col-span-1 border border-slate-800/60">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><TargetIcon /> Skill Gap Analysis</h3>
              <div className="h-64 flex items-center justify-center">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl glass-panel lg:col-span-2 border border-slate-800/60">
              <h3 className="text-lg font-semibold mb-6">AI Career Recommendations</h3>
              <div className="space-y-4">
                {[
                  { role: "Frontend Developer", match: 92, missing: "TypeScript, Jest", avgSalary: "$90k - $120k" },
                  { role: "Full Stack Engineer", match: 78, missing: "Docker, AWS", avgSalary: "$100k - $140k" },
                  { role: "Data Analyst", match: 45, missing: "Python, Pandas", avgSalary: "$80k - $110k" },
                ].map((job, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div>
                      <h4 className="font-bold text-slate-200">{job.role}</h4>
                      <p className="text-sm text-slate-500 mt-1">Gaps: <span className="text-amber-400">{job.missing}</span></p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Match</p>
                        <p className="font-bold text-emerald-400">{job.match}%</p>
                      </div>
                      <button className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-300 transition-colors">
                        View Path
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          </>
          )}

        </div>
      </main>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
