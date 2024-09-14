import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/homepage/Homepage';

function App() {
  const [keyword, setKeyword] = useState('');
  return (
    <div className='header'>
      <Navbar keyword={keyword} setKeyword={setKeyword} />
      <Homepage keyword={keyword} />
      <Footer />
    </div>
  );
}

export default App;
