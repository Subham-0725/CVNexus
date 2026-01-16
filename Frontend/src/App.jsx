import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20 bg-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">About CVNexus</h1></div>} />
          <Route path="/services" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Our Services</h1></div>} />
          <Route path="/services/create-resume" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Create Resume</h1></div>} />
          <Route path="/services/ats-score" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">ATS Score Checker</h1></div>} />
          <Route path="/services/feedback" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">AI Feedback</h1></div>} />
          <Route path="/templates" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Resume Templates</h1></div>} />
          <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Contact Us</h1></div>} />
        </Routes>
      </main>
    </div>
  );
}
