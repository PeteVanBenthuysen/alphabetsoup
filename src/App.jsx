import Navbar from './components/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Projects from './pages/projects.jsx';
import Visualizations from './pages/visualizations.jsx';
import Contact from './pages/contact.jsx';
import Reads from './pages/reads.jsx'; // <-- Import Reads

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/visualizations" element={<Visualizations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reads" element={<Reads />} /> {/* <-- Add Reads route */}
      </Routes>
    </div>
  );
}

export default App;