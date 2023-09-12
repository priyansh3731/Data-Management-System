import axios from "axios";
import JSZip from "jszip";
import { useEffect, useState } from "react";

export const AllData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this to the number of items you want per page

  const handleDownloadClick = async ({ e, photo1, photo2, video, suborder_id }) => {
    // ... (your existing download code)
  };

  const dataHandler = async () => {
    const res = await axios.get("https://grumpy-jacket-lamb.cyclic.app/data");
    setData(res.data);
  };

  useEffect(() => {
    dataHandler();
  }, []);

  // Calculate the indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table>
        <thead>
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
        </thead>
        <tbody>
          {currentData.map(({ _id, awb, firmname, suborder_id, returnType, sku, category, qty, photo1, photo2, video }) => {
            return (
              <tr key={_id}>
                <td>{awb}</td>
                <td>{firmname}</td>
                <td>{suborder_id}</td>
                <td>{returnType}</td>
                <td>{sku}</td>
                <td>{category}</td>
                <td>{qty}</td>
                <td>
                  {_id ? (
                    <button onClick={(e) => handleDownloadClick({ e, photo1, photo2, video, suborder_id })}>
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
