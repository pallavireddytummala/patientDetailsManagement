import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Doctor from './pages/Doctor';
import Home from './pages/Home';
import Patient from './pages/Patient';
import InsuranceProvider from './pages/InsuranceProvider';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path='/patient' element={<Patient />}/>
        <Route path='/insuranceProvider' element={<InsuranceProvider />}/>        
      </Routes>
    </Router>
  );
}

export default App;