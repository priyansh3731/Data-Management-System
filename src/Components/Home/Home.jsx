import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

const Home = () => {
    //FUNCTION FOR NAVIGATING TO SCAN PAGE
    const navigate = useNavigate()
    const scanHandler = () => {
        navigate("/scan")
    }

    const formHandler = () => {
      navigate("/form")
    }
  return (
    <>
    <div className='home'>
      <button className='home__scan' onClick={formHandler}>Add Data</button>
    </div>
    <div className='home'>
        <button className='home__scan' onClick={scanHandler}>Scan</button>
    </div>
    </>
  )
}

export default Home