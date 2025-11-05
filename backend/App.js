import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppProvider from './Context/AppContext';
import AlertBox from './components/AlertBox';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect } from "react";


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AlertBox />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );


function App() {
  useEffect(() => {
    fetch("http://localhost:5000")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return <h1>Welcome to My E-commerce Site 🛒</h1>;
}




}

export default App;
