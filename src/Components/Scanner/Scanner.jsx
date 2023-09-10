import React, {useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import "./Scanner.css"
import { Link } from 'react-router-dom'
import JSZip from 'jszip';

const Scanner = () => {

  const [ScanResult,setScanResult] = useState({})
  const [images,setimages] = useState([])
  const [videos,setvideos] =useState([])
  const [scan,setscan] = useState(null)

  const handleManualSerialNumberChange=async(event)=>{
    event.preventDefault();
    const repo = {awb:event.target[0].value}
    const res = await axios.post("https://grumpy-jacket-lamb.cyclic.app/data/search",repo)
    setScanResult(res.data)
    const res2 = res.data
    setimages([...images,res2.photo1,res2.photo2])
    setvideos([...videos,res2.video])
  }


  const handleManualSerialNumberChange2=async()=>{
    const res = await axios.post("https://grumpy-jacket-lamb.cyclic.app/data/search",{awb:scan})
    setScanResult(res.data)
    const res2 = res.data
    setimages([...images,res2.photo1,res2.photo2])
    setvideos([...videos,res2.video])
  }


    const handleDownloadClick =async() => {
      // const zip = new JSZip();
    
      // // Create a folder inside the ZIP file
      // const folder = zip.folder(`${ScanResult.suborder_id}`);
  
      // // Add each image to the folder
      // images.forEach((imageData, index) => {
      //   // Convert image data to Uint8Array
      //   const data = atob(imageData.split(',')[1]);
      //   const uint8Array = new Uint8Array(data.length);
      //   for (let i = 0; i < data.length; i++) {
      //     uint8Array[i] = data.charCodeAt(i);
      //   }
        
      //   // Add the image to the folder with a unique name (e.g., image_1.jpg)
      //   folder.file(`image_${index + 1}.jpg`, uint8Array);
      // });
  
      // // Generate the ZIP file
      // zip.generateAsync({ type: 'blob' }).then((content) => {
      //   // Save the ZIP file using FileSaver.js
      //   saveAs(content, `${ScanResult.suborder_id}.zip`);
      // });

        const zip = new JSZip();
      
        const promises = images.map(async (imageUrl, index) => {
          try {
            const response = await axios.get(imageUrl, { responseType: 'blob' });
            const blob = response.data;
            zip.file(`image_${index + 1}.jpg`, blob); // You can customize the file names here
          } catch (error) {
            console.error(`Error fetching image ${index + 1}:`, error);
          }
        });

        const vipro = videos.map(async (videoUrl, index) => {
          try {
            const response = await axios.get(videoUrl, { responseType: 'blob' });
            const blob = response.data;
            zip.file(`video_${index + 1}.mp4`, blob); // You can customize the file names here
          } catch (error) {
            console.error(`Error fetching image ${index + 1}:`, error);
          }
        });
      
        // Wait for all image downloads to complete
        await Promise.all(promises);
        await Promise.all(vipro)
      
        // Generate the zip file
        zip.generateAsync({ type: 'blob' }).then((content) => {
          const url = window.URL.createObjectURL(content);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'images.zip'; // Set the desired zip file name
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


  return (
    <div>
    <div id="reader"></div>
    <h3 style={{color:"white"}}>{scan}</h3>
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
            ScanResult._id?<td><Link className='edit' to={`/edit/${ScanResult._id}`}>edit</Link></td>:""
          }

          {
            ScanResult._id?<td><button onClick={handleDownloadClick}>Download Images as ZIP</button></td>:""
          }
        </tr>
      </table>
    </div>
  )
}

export default Scanner