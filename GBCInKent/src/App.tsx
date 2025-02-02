import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './pages/components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Staff from './pages/Staff';
import Sermons from './pages/Sermons';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/sermons" element={<Sermons />} />
      </Routes>
    </Router>
  );
}