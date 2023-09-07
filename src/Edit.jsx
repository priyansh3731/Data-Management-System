import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";


export const Edit=()=>{

    const {id} = useParams();
    const navigate = useNavigate();


//     // Assuming you have a separate input field for photo1
// const handlePhoto1InputChange = (event) => {
//   const selectedFile = event.target.files[0];
//   uploadFile(selectedFile, 'photo1');
// };


// // Assuming you have a separate input field for photo2
// const handlePhoto2InputChange = (event) => {
//   const selectedFile = event.target.files[0];
//   uploadFile(selectedFile, 'photo2');
// };


// // Assuming you have a separate input field for video
// const handleVideoInputChange = (event) => {
//   const selectedFile = event.target.files[0];
//   uploadFile(selectedFile, 'video');
// };


// const uploadFile = async (file, fieldName) => {
//   if (!file) {
//     alert('Please select a file.');
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = async() => {
//     const fileBinary = reader.result;

//     try {
//       // Send the file binary data to the server
//       const response = await axios.put(`https://grumpy-jacket-lamb.cyclic.app/data/${id}`, { [fieldName]: fileBinary });

//       // Handle the server's response as needed
//       console.log(`${fieldName} uploaded successfully:`, response.data);
//     } catch (error) {
//       console.error(`Error uploading ${fieldName}:`, error);
//     }
//   };

//   reader.readAsDataURL(file);
// };

const submitHandler=async(e)=>{
  e.preventDefault();
  const res = {photo1:URL.createObjectURL(e.target[0].files[0]),photo2:URL.createObjectURL(e.target[1].files[0]),video:URL.createObjectURL(e.target[2].files[0])}

  await axios.put(`https://grumpy-jacket-lamb.cyclic.app/data/${id}`,res);

  navigate('/')
}


    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>photo1</label>
                <input type="file" required />

                <label>photo2</label>
                <input type="file" required />

                <label>video</label>
                <input type="file" required />

                <button type="submit">submit</button>
            </form>
        </div>
    )
}

// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export const Edit = () => {
//   const { id } = useParams();

//   // State to store selected files
//   const [photo1, setPhoto1] = useState(null);
//   const [photo2, setPhoto2] = useState(null);
//   const [video, setVideo] = useState(null);

//   const submitHandler = async (e) => {
//     e.preventDefault();


//     // Create a FormData object to send files
//     const formData = new FormData();
//     formData.append("photo1", photo1);
//     formData.append("photo2", photo2);
//     formData.append("video", video);

//     // for (const pair of formData.entries()) {
//     //     console.log(pair[0], pair[1]);
//     //   }
    

//     try {
//       // Send a PUT request with FormData
//       const res = await axios.put(
//         `https://grumpy-jacket-lamb.cyclic.app/data/${id}`,
//         {awb:6}
//         // {
//         //   headers: {
//         //     "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file uploads
//         //   },
//         // }
//       );

//       // Handle the response as needed
//       console.log(res.data);
//     } catch (error) {
//       console.error("Error uploading files:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={submitHandler}>
//         <label>photo1</label>
//         <input
//           type="file"
//           required
//           onChange={(e) => setPhoto1(e.target.files[0])}
//         />

//         <label>photo2</label>
//         <input
//           type="file"
//           required
//           onChange={(e) => setPhoto2(e.target.files[0])}
//         />

//         <label>video</label>
//         <input
//           type="file"
//           required
//           onChange={(e) => setVideo(e.target.files[0])}
//         />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };