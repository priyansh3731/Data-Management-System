import axios from "axios";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import "./App.css"

export const AllData = () => {
  const [data, setData] = useState([]);
  const [demo,setdemo] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this to the number of items you want per page

  const handleDownloadClick = async ({ e, photo1, photo2,photo3, video, suborder_id }) => {
    const images = [photo1,photo2,photo3,video]
    
    const zip = new JSZip();
      
        const promises = images.map(async (imageUrl, index) => {
          try {
             if(index<3){
              const response = await axios.get(imageUrl, { responseType: 'blob' });
            const blob = response.data;
            console.log(index)
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

  const dataHandler = async () => {
    const res = await axios.get("https://grumpy-jacket-lamb.cyclic.app/data");
    setData(res.data);
    setdemo(res.data)
  };

  useEffect(() => {
    dataHandler();
  }, []);

  // Calculate the indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = demo.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const changeHandler=(e)=>{
    const res = e.target.value;
    setdemo(data.filter((data)=>res===data.firmname))
    if(res===""){
      setdemo(data)
    }
  }

  return (
    <div>
      <div><input onChange={changeHandler} /></div>
      <table className="all">
          <tr>
            <th>awb</th>
            <th>firmname</th>
            <th>suborder_id</th>
            <th>returnType</th>
            <th>sku</th>
            <th>category</th>
            <th>Barcode_id</th>
            <th>qty</th>
            <th>download</th>
          </tr>
        <tbody>
          {currentData.map(({ _id, awb, firmname, suborder_id, returnType, sku, category, qty,Barcode_id, photo1, photo2,photo3, video }) => {
            return (
              <tr key={_id}>
                <td>{awb}</td>
                <td>{firmname}</td>
                <td>{suborder_id}</td>
                <td>{returnType}</td>
                <td>{sku}</td>
                <td>{category}</td>
                <td>{Barcode_id}</td>
                <td>{qty}</td>
                <td>
                  {Barcode_id ? (
                    <button onClick={(e) => handleDownloadClick({ e, photo1, photo2,photo3, video, suborder_id })}>
                      Download Images as ZIP
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        {data.length > itemsPerPage && (
          <ul style={{margin:"auto", maxWidth:"1000px"}}>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
              <li style={{display:"inline",margin:"10px"}} key={index}>
                <button style={{padding:"10px"}} onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
