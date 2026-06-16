import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import IntroductionPage from './components/IntroductionPage.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'


function App() {

  return (
    <Routes>
      <Route path="/" element={<IntroductionPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
