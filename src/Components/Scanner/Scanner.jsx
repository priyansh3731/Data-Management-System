import React, {useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import "./Scanner.css"
import { Link } from 'react-router-dom'
import JSZip from 'jszip';

const Scanner = () => {

  const [ScanResult,setScanResult] = useState({})
  const [images,setimages] = useState([])
  const [scan,setscan] = useState(null)

  const handleManualSerialNumberChange=async(event)=>{
    event.preventDefault();
    const repo = {awb:event.target[0].value}
    const res = await axios.post("https://grumpy-jacket-lamb.cyclic.app/data/search",repo)
    setScanResult(res.data)
    const res2 = res.data
    setimages([...images,res2.photo1,res2.photo2,res2.photo3,res2.video])
  }


  const handleManualSerialNumberChange2=async()=>{
    const res = await axios.post("https://grumpy-jacket-lamb.cyclic.app/data/search",{awb:scan})
    setScanResult(res.data)
    const res2 = res.data
    setimages([res2.photo1,res2.photo2,res2.photo3,res2.video])
  }


    const handleDownloadClick =async() => {
        const zip = new JSZip();
      
        const promises = images.map(async (imageUrl, index) => {
          try {
             if(index<3){
              const response = await axios.get(imageUrl, { responseType: 'blob' });
            const blob = response.data;
            zip.file(`image_${index + 1}.jpg`, blob)
             }else{
              const response = await axios.get(imageUrl, { responseType: 'blob' });
            const blob = response.data;
            zip.file(`video_${index + 1}.mp4`, blob);
             }
          } catch (error) {
            console.error(`Error fetching image ${index + 1}:`, error);
          }
        });
      
        // Wait for all image downloads to complete
        await Promise.all(promises);
      
        // Generate the zip file
        zip.generateAsync({ type: 'blob' }).then((content) => {
          const url = window.URL.createObjectURL(content);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${ScanResult.suborder_id}.zip`; // Set the desired zip file name
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      };





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
    
        function success (result) {
          if (isScanning) {
            const res = result
            setscan(res)
            handleManualSerialNumberChange2()
            isScanning = false
          }
        }
    
        function error(err) {
          console.log(err);
        }
      }, [])


      const clickHandler=async()=>{
        const res = {photo1:"",photo2:"",photo3:"",video:""}
        const repo = await axios.put(`https://grumpy-jacket-lamb.cyclic.app/data/${ScanResult._id}`,{res})
        console.log(repo)
        console.alert("data deleted")
      }


  return (
    <div>
    <div id="reader"></div>
      <form style={{overflowX:"scroll"}} onSubmit={handleManualSerialNumberChange} >
        <input value={scan} type='text' />
        <button type='submit' >submit</button>
      </form>
      <div className='mes'>{ScanResult.message}</div>
      <table style={{overflowX:"scroll"}} key={ScanResult._id}>
        <tr>
          <th>awb</th>
          <th>firmname</th>
          <th>suborder_id</th>
          <th>returnType</th>
          <th>sku</th>
          <th>category</th>
          <th>qty</th>
          <th>Barcode_id</th>
          <th>delete</th>
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
            ScanResult.returnType==="Customer Return"?<td>{ScanResult.Barcode_id}</td>:""
          }
          <td onClick={clickHandler}>delete</td>
          {
            ScanResult.returnType==="Customer Return"?<td><Link className='edit' to={`/edit/${ScanResult._id}`}>edit</Link></td>:""
          }

          {
            ScanResult.returnType==="Customer Return"?<td><button onClick={handleDownloadClick}>Download Images as ZIP</button></td>:""
          }
        </tr>
      </table>
    </div>
  )
}

export default Scanner