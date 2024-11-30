import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Pics from "./components/Pics";
import Books from "./components/Books";
import WorkEd from "./components/WorkEd";
import "./App.css";
import { AnimatePresence } from "framer-motion";


function App() {
  const location = useLocation();
  
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pics" element={<Pics />} />
          <Route path="/books" element={<Books />} />
          <Route path="/work-education" element={<WorkEd />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
