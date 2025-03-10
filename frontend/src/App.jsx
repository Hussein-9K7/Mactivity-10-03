import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import PropertyForm from './components/PropertyForm';
import EditProperty from './components/EditProperty';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/add" element={<PropertyForm />} />
          <Route path="/edit/:id" element={<EditProperty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
