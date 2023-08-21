import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Scanner from './Components/Scanner/Scanner'
import Form from './Components/Form/Form'

const App = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/form' element={<Form />}/>
      <Route path="/scan" element={<Scanner />}/>
    </Routes>
    </Router>
  )
}

export default App