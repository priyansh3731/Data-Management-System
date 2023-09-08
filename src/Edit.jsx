import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";


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
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setphoto1(base64)
}

const handleFileUpload2=async(e)=>{
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setphoto2(base64)
}

const handleFileUpload3=async(e)=>{
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setvideo(base64)
}


    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>photo1</label>
                <input type="file" onChange={handleFileUpload1} required />

                <label>photo2</label>
                <input type="file" onChange={handleFileUpload2} required />

                <label>video</label>
                <input type="file" onChange={handleFileUpload3} required />

                <button type="submit">submit</button>
            </form>
        </div>
    )
}

function convertToBase64(file){
    return new Promise((resolve,reject)=>{
        const filereader = new FileReader();
        filereader.readAsDataURL(file);
        filereader.onload=()=>{
            resolve(filereader.result)
        }
        filereader.onerror=(error)=>{
            reject(error)
        }
    })
}