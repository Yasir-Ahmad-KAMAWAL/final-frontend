import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import IntroductionPage from './components/IntroductionPage.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Features from "./components/Features.jsx";


function App() {

  return (
    <Routes>
      <Route path="/" element={<IntroductionPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/features" element={<Features />} />
    </Routes>
  )
}

export default App
