import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Books from "./components/Books";
import Poems from "./components/Poems";
import PoemDetail from "./components/PoemDetails";
import Contact from "./components/Contact";
import "./styles/global.css";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />
      <div className="page-container">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/books" element={<Books />} />
            <Route path="/poems" element={<Poems />} />
            <Route path="/poem/:title" element={<PoemDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App;
