import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Code, Award, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { aiApi } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', department: '', cgpa: '', skills: '', internships: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Clean up string inputs into arrays for the backend
      const payload = {
        ...formData,
        cgpa: parseFloat(formData.cgpa),
        skills: formData.skills.split(',').map(s => s.trim()),
        technicalSkills: formData.skills.split(',').map(s => s.trim()),
        internships: [formData.internships], // simplified for now
        projects: []
      };
      await aiApi.register(payload);
      navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 relative flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 relative z-10 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white tracking-tight">Create your Profile</h2>
          <p className="text-slate-400 mt-2">Tell us about yourself to get personalized AI predictions</p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Basic Info</h3>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 focus:outline-none" placeholder="Alex Chen" required/>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 focus:outline-none" placeholder="alex@university.edu" required/>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 focus:outline-none" placeholder="••••••••" required/>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Academic & Skills</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-white focus:border-blue-500 focus:outline-none" placeholder="Computer Science" required/>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">CGPA</label>
                <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-white focus:border-blue-500 focus:outline-none" placeholder="8.5" required/>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Top Skills (comma separated)</label>
              <div className="relative">
                <Code className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 focus:outline-none" placeholder="Java, React, SQL" required/>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Internships/Projects Count</label>
              <div className="relative">
                <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="text" name="internships" value={formData.internships} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 focus:outline-none" placeholder="Previous Company Name" required/>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 mt-6">
            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader className="animate-spin" size={18} /> : <>Generate AI Profile <ArrowRight size={18} /></>}
            </button>
            <p className="text-center text-slate-400 mt-6 text-sm">
              Already registered? <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300">Sign in here</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
