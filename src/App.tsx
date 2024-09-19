import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/homepage/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/about/About';
import { BookDetail } from './layouts/products/BookDetail';

function App() {
  const [keyword, setKeyword] = useState('');
  return (
    <div style={{ background: '#f5f5fa' }}>
      <BrowserRouter>
        <Navbar keyword={keyword} setKeyword={setKeyword} />

        <Routes>
          <Route path='/' element={<Homepage keyword={keyword} />}></Route>
          <Route path='/:genreId' element={<Homepage keyword={keyword} />}></Route>
          <Route path='/book-detail/:bookId' element={<BookDetail />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
