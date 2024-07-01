import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Haeder from './components/Haeder/Haeder';
import Id from './pages/Id/Id';
function App() {
  return (
    <div>
      <Haeder />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/id/:id" element={<Id />} />
      </Routes>
      <div style={{ height: '40px' }}></div>
    </div>
  );
}

export default App;
