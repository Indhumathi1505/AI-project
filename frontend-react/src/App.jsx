import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import SkillRecommendations from './pages/SkillRecommendations';
import InterviewPrep from './pages/InterviewPrep';
import FloatingGravity from './components/FloatingGravity';

function App() {
  return (
    <div className="min-h-screen text-slate-100 selection:bg-blue-500/30">
      <FloatingGravity />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeAnalyzer />} />
          <Route path="/skills" element={<SkillRecommendations />} />
          <Route path="/interview" element={<InterviewPrep />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
