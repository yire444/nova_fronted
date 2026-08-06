import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { Prices } from './components/Prices'; 
import { Contact } from './components/Contact';
import { Characteristics } from './components/Characteristics';
import { Register } from './components/RegisterModal';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      <Navbar isLogged={isLogged} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Prices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Characteristics />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;