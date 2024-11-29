import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import PicsPage from "./pages/PicsPage";
import BooksPage from "./pages/BooksPage";
import WorkEdPage from "./pages/WorkEdPage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pics" element={<PicsPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/work-education" element={<WorkEdPage />} />
      </Routes>
    </div>
  );
}

export default App;
