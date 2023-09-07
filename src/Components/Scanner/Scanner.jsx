import React, { useContext, useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import "./Scanner.css"
import { Link } from 'react-router-dom'
import { DataContext } from '../../Context/DataContext'

const Scanner = () => {

  const [ScanResult,setScanResult] = useState({})
  const {setdata} = useContext(DataContext)

  const handleManualSerialNumberChange=async(event)=>{
    event.preventDefault();
    const repo = {awb:event.target[0].value}
    const res = await axios.post("https://grumpy-jacket-lamb.cyclic.app/data/search",repo)
    setScanResult(res.data)
    setdata(res.data)
  }

  useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        })
    
        let isScanning = true
    
        scanner.render(success, error)
    
        function success(result) {
          if (isScanning) {
            scanner.clear()
            const res = result
            // console.log(res)
            // setScanResult(res)
            isScanning = false
          }
        }
    
        function error(err) {
          console.log(err);
        }
      }, [])


  return (
    <div>
    <div id="reader"></div>
      <form onSubmit={handleManualSerialNumberChange} >
        <input type='text' />
        <button type='submit' >submit</button>
      </form>

      <div className='mes'>{ScanResult.message}</div>
      <table key={ScanResult._id}>
        <tr>
          <th>awb</th>
          <th>firmname</th>
          <th>suborder_id</th>
          <th>returnType</th>
          <th>sku</th>
          <th>category</th>
          <th>qty</th>
          <th>edit</th>
          <th>download</th>
        </tr>
        <tr>
          <td>{ScanResult.awb}</td>
          <td>{ScanResult.firmname}</td>
          <td>{ScanResult.suborder_id}</td>
          <td>{ScanResult.returnType}</td>
          <td>{ScanResult.sku}</td>
          <td>{ScanResult.category}</td>
          <td>{ScanResult.qty}</td>
          {
            ScanResult._id?<td><Link to={`/edit/${ScanResult._id}`}>edit</Link></td>:""
          }

          {
            ScanResult._id?<td><Link>download</Link></td>:""
          }
        </tr>
      </table>
    </div>
  )
}

export default Scanner