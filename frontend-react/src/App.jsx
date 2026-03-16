import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import SkillRecommendations from './pages/SkillRecommendations';
import InterviewPrep from './pages/InterviewPrep';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
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
  );
}

export default App;
