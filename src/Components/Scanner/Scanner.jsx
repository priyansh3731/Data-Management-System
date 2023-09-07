import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import "./Scanner.css"

const Scanner = () => {
  const [manualSerialNumber, setManualSerialNumber] = useState('')

     

  const handleManualSerialNumberChange=async(event)=>{
    event.preventDefault();
    const repo = {awb:event.target[0].value}
    setManualSerialNumber(repo)
    const res = await axios.post("https://grumpy-jacket-lamb.cyclic.app/data/search",repo)
    console.log(res.data)
  }

  return (
    <div>
      <form onSubmit={handleManualSerialNumberChange} >
        <input type='text' />
        <button type='submit' >submit</button>
      </form>
    </div>
  )
}

export default Scanner