import React from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/homepage/Homepage';

function App() {
  return (
    <div className='header'>
      <Navbar />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
