import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { aiApi } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await aiApi.login({
        username: formData.email, // backend expects 'username' currently
        password: formData.password
      });
      console.log('Login successful', response.data);
      localStorage.setItem('studentId', response.data.user.id);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Lock size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Sign in to view your placement insights</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot Password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 mt-8 disabled:opacity-70">
            {loading ? <Loader className="animate-spin" size={18} /> : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-8 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-400 font-medium hover:text-blue-300">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
