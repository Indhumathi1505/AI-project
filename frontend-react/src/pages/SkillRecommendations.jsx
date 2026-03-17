import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, CheckCircle, Target, ArrowRight, PlayCircle } from 'lucide-react';

export default function SkillRecommendations() {
  const domain = localStorage.getItem('studentDomain') || 'General Software Engineering';

  const domainMaps = {
    'Frontend Development': {
      roadmap: [
        { month: "Month 1", title: "React Design Patterns", overview: "Component composition, render props, and advanced hooks for scalable UIs.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", status: "current" },
        { month: "Month 2", title: "Tailwind & Animations", overview: "Building complex layouts with Tailwind CSS and Framer Motion orchestrations.", videoUrl: "https://www.youtube.com/embed/SE2v7OjgD9E", status: "upcoming" },
        { month: "Month 3", title: "Testing & Performance", overview: "Unit testing with Vitest and optimizing web performance metrics (LCP/FID).", videoUrl: "https://www.youtube.com/embed/8X-U7V7-wK8", status: "upcoming" }
      ],
      courses: [
        { title: "Advanced Frontend Path", platform: "YouTube", match: "95%", time: "30h", instructor: "Brad Traversy", overview: "Master modern CSS and JS frameworks.", link: "https://www.youtube.com/watch?v=hdI2bqOjyQM" }
      ]
    },
    'Backend Development': {
      roadmap: [
        { month: "Month 1", title: "Spring Security & JWT", overview: "Implementing stateless authentication and authorization in Spring Boot.", videoUrl: "https://www.youtube.com/embed/X80nJ5T7YpE", status: "current" },
        { month: "Month 2", title: "Microservices Architecture", overview: "Inter-service communication using Spring Cloud and RabbitMQ.", videoUrl: "https://www.youtube.com/embed/9SGDpanrc8U", status: "upcoming" },
        { month: "Month 3", title: "SQL & NoSQL Mastery", overview: "Query optimization in PostgreSQL and aggregation in MongoDB.", videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", status: "upcoming" }
      ],
      courses: [
        { title: "Java Backend Roadmap", platform: "Java Brains", match: "90%", time: "25h", instructor: "Koushik Kothagal", overview: "Deep dive into Spring Ecosystem.", link: "https://www.youtube.com/watch?v=pYIsXG2UAsU" }
      ]
    },
    'Data Science & AI': {
      roadmap: [
        { month: "Month 1", title: "Machine Learning Math", overview: "Linear algebra, statistics, and calculus for AI models.", videoUrl: "https://www.youtube.com/embed/q09k9JubqS8", status: "current" },
        { month: "Month 2", title: "PyTorch Deep Learning", overview: "Building and training neural networks using PyTorch and GPUs.", videoUrl: "https://www.youtube.com/embed/GIsg-ZUy0MY", status: "upcoming" },
        { month: "Month 3", title: "Generative AI & LLMs", overview: "Fine-tuning models like GPT and BERT for specific NLP tasks.", videoUrl: "https://www.youtube.com/embed/XfpMk9fshfM", status: "upcoming" }
      ],
      courses: [
        { title: "StatQuest Machine Learning", platform: "YouTube", match: "98%", time: "50h", instructor: "Josh Starmer", overview: "Breaking down complex ML concepts.", link: "https://www.youtube.com/c/joshstarmer" }
      ]
    },
    'General Software Engineering': {
      roadmap: [
        { month: "Month 1", title: "Data Structures & Algos", overview: "Mastering arrays, trees, and dynamic programming.", videoUrl: "https://www.youtube.com/embed/8hly31xKli0", status: "current" },
        { month: "Month 2", title: "Design Patterns", overview: "SOLID principles, Factory, and Singleton patterns.", videoUrl: "https://www.youtube.com/embed/v9ejT8FO-7I", status: "upcoming" },
        { month: "Month 3", title: "System Design", overview: "Scaling applications with load balancers and caching.", videoUrl: "https://www.youtube.com/embed/m8I7eG8h2Am", status: "upcoming" }
      ],
      courses: [
        { title: "CS50 Computer Science", platform: "Harvard/YouTube", match: "100%", time: "80h", instructor: "David J. Malan", overview: "The gold standard for CS foundations.", link: "https://www.youtube.com/watch?v=8hly31xKli0" }
      ]
    }
  };

  const currentData = domainMaps[domain] || domainMaps['General Software Engineering'];
  const roadmap = currentData.roadmap;
  const courses = currentData.courses;

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

        {!localStorage.getItem('resumeAnalyzed') ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
              <BookOpen size={32} className="text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Unlock Your Roadmap</h2>
            <p className="text-slate-400 mb-8">
              Analyze your resume to generate a personalized learning path and course recommendations 
              tailored to your career goals.
            </p>
            <Link to="/resume" className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
              Go to Resume Scanner <ArrowRight size={20} />
            </Link>
          </motion.div>
        ) : (
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
                    <span className={`text-xs font-bold uppercase tracking-wider ${step.status === 'current' ? 'text-emerald-400' : 'text-slate-50'}`}>{step.month}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{step.title}</h3>
                    <p className="text-slate-400 mt-2 text-sm leading-relaxed">{step.overview}</p>
                    
                    {step.status === 'current' && (
                      <div className="mt-6 aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <iframe 
                          className="w-full h-full"
                          src={step.videoUrl} 
                          title="Skill Video"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-4">
                      <a 
                        href={step.videoUrl.replace('embed/', 'watch?v=')} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <PlayCircle size={14} /> Open in YouTube
                      </a>
                    </div>
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
                  <a 
                    key={i} 
                    href={course.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl bg-slate-950 border border-slate-800 group hover:border-blue-500/50 transition-all hover:bg-blue-500/5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">{course.title}</h4>
                      <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded border border-blue-500/20">{course.match} Match</div>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">{course.overview}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="flex items-center gap-1"><Target size={10} className="text-blue-500" /> {course.instructor}</span>
                      <span className="flex items-center gap-1 font-bold text-blue-400">View Course &rarr;</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          </div>
        )}
      </div>
    </div>
  );
}
