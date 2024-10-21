import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/homepage/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/about/About';
import { BookDetail } from './layouts/products/BookDetail';
import Login from './layouts/user/Login';
import Profile from './layouts/user/Profile';
import Rule from './layouts/rules/Rule';
import Contact from './layouts/contacts/Contact';


function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div style={{ background: '#f5f5fa' }}>
      <BrowserRouter>
        <Navbar keyword={keyword} setKeyword={setKeyword} />
        <Routes>
          {/* <Route path='/*' element={<Login />} /> */}
          {/* Trong trường hợp này thì không khác gì root /, muốn có sự thay đổi hãy thử test/* :)) */}

          <Route path='/' element={<Homepage keyword={keyword} />} />


          <Route path=':genreId' element={<Homepage keyword={keyword} />} />
          <Route path='book-detail/:bookId' element={<BookDetail />} />
          <Route path='about' element={<About />} />

          <Route path='login' element={<Login />} />

          <Route path='profile' element={<Profile />} />

          <Route path='rule/:ruleNum' element={<Rule />} />

          <Route path='contact' element={<Contact />} />
          
        </Routes>
        <Footer />

      </BrowserRouter>
    </div >
  );
}

export default App;
