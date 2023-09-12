import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  //FUNCTION FOR NAVIGATING TO THE HOME 
    const navigate = useNavigate()  
  const homeNavigate = () => {
      navigate("/")
    }
  return (
    <div className='nav'>
        <h2 className='nav__name' onClick={homeNavigate}>Return Management System</h2>
    </div>
  )
}

export default Navbar