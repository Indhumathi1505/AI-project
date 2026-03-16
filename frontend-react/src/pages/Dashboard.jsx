import { Link } from 'react-router-dom';
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
import { Briefcase, BarChart, BookOpen, Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend, Filler
);

export default function Dashboard() {
  const radarData = {
    labels: ['Python', 'Java', 'React', 'SQL', 'Data Structures', 'Algorithms'],
    datasets: [
      {
        label: 'Current Skill Level',
        data: [80, 65, 90, 70, 60, 50],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
      {
        label: 'Industry Standard',
        data: [75, 80, 85, 75, 85, 80],
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.8)',
        borderWidth: 2,
        borderDash: [5, 5],
      }
    ],
  };

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
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }} animate={{ x: 0 }}
        className="w-64 border-r border-slate-800 bg-slate-900 p-6 hidden md:flex flex-col relative z-10 glass-panel"
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
      <main className="flex-1 overflow-auto relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-blue-600/5 blur-3xl -z-10 rounded-full mix-blend-screen"></div>
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
              <p className="text-slate-400 mt-1">Here is your career readiness analysis.</p>
            </div>
            <button className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              Recalculate Score
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-slate-400 text-sm font-medium mb-2">Placement Probability</h3>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">85<span className="text-blue-500 text-2xl">%</span></span>
                <span className="text-emerald-400 text-sm mb-1 font-medium">+5% this week</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-slate-400 text-sm font-medium mb-2">Readiness Score</h3>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">72<span className="text-slate-500 text-2xl">/100</span></span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
               className="p-6 rounded-2xl glass-panel col-span-1 md:col-span-2 relative overflow-hidden flex items-center justify-between">
               <div>
                 <h3 className="text-slate-400 text-sm font-medium mb-1">Next Recommended Action</h3>
                 <p className="text-lg font-medium text-white mb-3">Complete "Advanced React Patterns" course</p>
                 <Link to="/skills" className="text-blue-400 hover:text-blue-300 text-sm font-medium">View detailed roadmap &rarr;</Link>
               </div>
               <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center border-t-emerald-500 border-r-emerald-500 transform rotate-45">
                 <span className="text-emerald-400 font-bold -rotate-45 block">50%</span>
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
