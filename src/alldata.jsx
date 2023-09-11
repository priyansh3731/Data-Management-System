import axios from "axios"
import JSZip from "jszip"
import { useEffect, useState } from "react"


export const AllData=()=>{
    const [data,setdata]=useState([])


    const handleDownloadClick =async({e,photo1,photo2,video,suborder_id}) => {
        const images = [photo1,photo2,video]
        const zip = new JSZip();
      
        const promises = images.map(async (imageUrl, index) => {
          try {
             if(index<=1){
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
          a.download = `${suborder_id}.zip`; // Set the desired zip file name
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      };

    const dataHander=async()=>{
        const res = await axios.get("https://grumpy-jacket-lamb.cyclic.app/data")
        setdata(res.data)
    }

    useEffect(()=>{dataHander()},[])


    return(
        <table>
        <tr>
          <th>awb</th>
          <th>firmname</th>
          <th>suborder_id</th>
          <th>returnType</th>
          <th>sku</th>
          <th>category</th>
          <th>qty</th>
          <th>download</th>
        </tr>
        {
            data.map(({_id,awb,firmname,suborder_id,returnType,sku,category,qty,photo1,photo2,video})=>{
                return(
                    <tr>
                        <td>{awb}</td>
                        <td>{firmname}</td>
                        <td>{suborder_id}</td>
                        <td>{returnType}</td>
                        <td>{sku}</td>
                        <td>{category}</td>
                        <td>{qty}</td>

                        {
                          _id?<td><button onClick={(e)=>handleDownloadClick({e,photo1,photo2,video,suborder_id})}>Download Images as ZIP</button></td>:""
                        }
                    </tr>
                )
            })
        }
      </table>
    )
}