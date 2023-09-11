import React from 'react'
import { useNavigate } from 'react-router-dom'
  // Import the functions you need from the SDKs you need
import "./Home.css"

const Home = () => {
    //FUNCTION FOR NAVIGATING TO SCAN PAGE


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
    const navigate = useNavigate()
    const scanHandler = () => {
        navigate("/scan")
    }

    const formHandler = () => {
      navigate("/login")
    }

    const allHandler = () => {
      navigate("/login2")
    }
  return (
    <>
    <div className='home'>
      <button className='home__scan' onClick={formHandler}>Add Data</button>
    </div>
    <div className='home'>
        <button className='home__scan' onClick={scanHandler}>Scan</button>
    </div>
    <div className='home'>
        <button className='home__scan' onClick={allHandler}>All Data</button>
    </div>
    </>
  )
}

export default Home