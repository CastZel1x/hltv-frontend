import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Player from './components/Pages/Player';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/players/compare" element={<Player />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
