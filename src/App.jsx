import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Scanner from './Components/Scanner/Scanner'
import Form from './Components/Form/Form'
import { Edit } from './Edit'
import { Login } from './login'
import { AllData } from './alldata'
import { Editable } from './Editable'

const App = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/form' element={<Form />}/>
      <Route path="/scan" element={<Scanner />}/>
      <Route path='/edit/:id' element={<Edit />}/>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/alldata' element={<AllData />}></Route>
      <Route path='/editable/:id' element={<Editable />}></Route>
    </Routes>
    </Router>
  )
}

export default App