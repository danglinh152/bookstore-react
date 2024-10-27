import React, { useState } from "react";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import Homepage from "./layouts/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./layouts/about/About";
import { BookDetail } from "./layouts/products/BookDetail";
import Login from "./layouts/user/Login";
import Profile from "./layouts/user/Profile";
import Rule from "./layouts/rules/Rule";
import Contact from "./layouts/contacts/Contact";
import Register from "./layouts/user/Register";
import ActivateAccount from "./layouts/user/ActivateAccount";
import { Logout } from "./layouts/user/Logout";

function App() {
  const [keyword, setKeyword] = useState<string>("");

  return (
    <div style={{ background: "#f5f5fa" }}>
      <BrowserRouter>
        <Navbar keyword={keyword} setKeyword={setKeyword} />
        <Routes>
          {/* Root route */}
          <Route path="/" element={<Homepage keyword={keyword} />} />

          {/* Dynamic routes */}
          <Route path=":genreId" element={<Homepage keyword={keyword} />} />
          <Route path="book-detail/:bookId" element={<BookDetail />} />

          {/* Static routes */}
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="rule/:ruleNum" element={<Rule />} />
          <Route path="contact" element={<Contact />} />

          {/* Activation route with two dynamic parameters */}
          <Route path="account/activate" element={<ActivateAccount />} />

          <Route path="logout" element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
