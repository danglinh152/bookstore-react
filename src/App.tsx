import React, { useEffect, useState } from "react";
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
import AdminPanel from "./layouts/admin/AdminPanel";
import NavbarAdmin from "./layouts/header-footer/NavbarAdmin";

function App() {
  const [keyword, setKeyword] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("admin"); // Set default role
  useEffect(() => {
    const token = localStorage.getItem("token");
  });

  return (
    <BrowserRouter>
      {userRole === "admin" ? (
        <div style={{ background: "#e0e0e0" }}>
          <NavbarAdmin />
          <Routes>
            <Route path="/" element={<AdminPanel />} />
            <Route path=":genreId" element={<Homepage keyword={keyword} />} />
            <Route path="book-detail/:bookId" element={<BookDetail />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="rule/:ruleNum" element={<Rule />} />
            <Route path="contact" element={<Contact />} />
            <Route path="account/activate" element={<ActivateAccount />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <div style={{ background: "#f5f5fa" }}>
          {" "}
          {/* Customer specific styling */}
          <Navbar keyword={keyword} setKeyword={setKeyword} />
          <Routes>
            <Route path="/" element={<Homepage keyword={keyword} />} />
            <Route path=":genreId" element={<Homepage keyword={keyword} />} />
            <Route path="book-detail/:bookId" element={<BookDetail />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="rule/:ruleNum" element={<Rule />} />
            <Route path="contact" element={<Contact />} />
            <Route path="account/activate" element={<ActivateAccount />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
