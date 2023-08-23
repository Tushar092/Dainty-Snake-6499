import React from "react"
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
