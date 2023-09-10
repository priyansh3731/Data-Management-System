import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import "./App.css"


export const Edit=()=>{

    const {id} = useParams();
    const navigate = useNavigate();
    const [photo1,setphoto1] = useState()
    const [photo2,setphoto2] = useState()
    const [video,setvideo] = useState()

const submitHandler=async(e)=>{
  e.preventDefault();
  const res = {photo1:photo1,photo2:photo2,video:video}

  await axios.put(`https://grumpy-jacket-lamb.cyclic.app/data/${id}`,res);

  navigate('/')
}

const handleFileUpload1=async(e)=>{
    const data = new FormData()
    const file = e.target.files[0]
    data.append("file", file);
    data.append("upload_preset","oi1uugwe")

      const res = await axios.post(`https://api.cloudinary.com/v1_1/dabaj1pou/image/upload`,data);
    setphoto1(res.data.url)
}


const handleFileUpload2=async(e)=>{
    const data = new FormData()
    const file = e.target.files[0]
    data.append("file", file);
    data.append("upload_preset","oi1uugwe")

      const res = await axios.post(`https://api.cloudinary.com/v1_1/dabaj1pou/image/upload`,data);
    setphoto2(res.data.url)
}

const handleFileUpload3=async(e)=>{
    const data = new FormData()
    const file = e.target.files[0]
    data.append("file", file);
    data.append("upload_preset","oi1uugwe")

      const res = await axios.post(`https://api.cloudinary.com/v1_1/dabaj1pou/video/upload`,data);
    setvideo(res.data.url)
    console.log(res.data.url)
}


    return(
        <div>
            <form className="editf" onSubmit={submitHandler}>
                <label>photo1</label>
                <input type="file" onChange={handleFileUpload1} required />
                <br />
                <label>photo2</label>
                <input type="file" onChange={handleFileUpload2} required />
                <br />
                <label>video</label>
                <input type="file" onChange={handleFileUpload3} required />
                <br />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}