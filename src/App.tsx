import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/homepage/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/about/About';

function App() {
  const [keyword, setKeyword] = useState('');
  return (
    <div className='header'>
      <BrowserRouter>
        <Navbar keyword={keyword} setKeyword={setKeyword} />

        <Routes>
          <Route path='/' element={<Homepage keyword={keyword} />}></Route>
          <Route path='/:genreId' element={<Homepage keyword={keyword} />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
