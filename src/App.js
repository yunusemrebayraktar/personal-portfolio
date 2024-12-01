import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Books from "./components/Books";
import PoemDetail from "./components/PoemDetails"; // Import the new component
import "./App.css";
import { AnimatePresence } from "framer-motion";
import AboutMe from "./components/AboutMe";
import Poems from "./components/Poems";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/books" element={<Books />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/poem/:title" element={<PoemDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
