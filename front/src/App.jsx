import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Header from "./components/Header";

const App = () => (
  <Router>
    {/* <Header /> */}
    <Routes>
      <Route path="/" element={<Game />} />
      {/* <Route path="/game" element={<Game />} /> */}
    </Routes>
  </Router>
);

export default App;
