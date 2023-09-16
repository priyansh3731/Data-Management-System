import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import "./Components/Form/Form.css"


export const Edit=()=>{

    const {id} = useParams();
    const navigate = useNavigate();
    const [Barcode_id,setBarcode_id] = useState()
    const [photo1,setphoto1] = useState()
    const [photo2,setphoto2] = useState()
    const [photo3,setphoto3] = useState()
    const [video,setvideo] = useState()
    const [qty,setqty] = useState()
    const [button,setbutton] = useState(true)

const submitHandler=async(e)=>{
  e.preventDefault();
  const res = {photo1:photo1,photo2:photo2,photo3:photo3,video:video,Barcode_id:Barcode_id,qty:qty}

  const repo = await axios.put(`https://grumpy-jacket-lamb.cyclic.app/data/${id}`,res);
  navigate('/')
}


const handleFileUpload5=async(e)=>{
  const file = e.target.value[0]
    setBarcode_id(file)
}


const handleFileUpload6=async(e)=>{
  const file = e.target.value[0]
    setqty(file)
}



const handleFileUpload1=async(e)=>{
    const data = new FormData()
    const file = e.target.files[0]
    data.append("file", file);
    data.append("upload_preset","oi1uugwe")

      const res = await axios.post(`https://api.cloudinary.com/v1_1/dabaj1pou/image/upload`,data);
      const repo = res.data.url
      const str = repo.split(":")
      const str2 = ["https:",str[1]]
      const str3 = str2.join("")
      setphoto1(str3)
}


const handleFileUpload2=async(e)=>{
    const data = new FormData()
    const file = e.target.files[0]
    data.append("file", file);
    data.append("upload_preset","oi1uugwe")

      const res = await axios.post(`https://api.cloudinary.com/v1_1/dabaj1pou/image/upload`,data);
    const repo = res.data.url
    const str = repo.split(":")
    const str2 = ["https:",str[1]]
    const str3 = str2.join("")
    console.log(str3)
    setphoto2(str3)
}

const handleFileUpload3=async(e)=>{
    const data = new FormData()
    const file = e.target.files[0]
    data.append("file", file);
    data.append("upload_preset","oi1uugwe")

      const res = await axios.post(`https://api.cloudinary.com/v1_1/dabaj1pou/video/upload`,data);
      const repo = res.data.url
      const str = repo.split(":")
      const str2 = ["https:",str[1]]
      const str3 = str2.join("")
      setvideo(str3)
      if(str3){
        setbutton(false)
      }
}



const handleFileUpload4=async(e)=>{
  const data = new FormData()
  const file = e.target.files[0]
  data.append("file", file);
  data.append("upload_preset","oi1uugwe")

    const res = await axios.post(`https://api.cloudinary.com/v1_1/dabaj1pou/image/upload`,data);
    const repo = res.data.url
    const str = repo.split(":")
    const str2 = ["https:",str[1]]
    const str3 = str2.join("")
    setphoto3(str3)
}


    return(
        <div className="">
            <form className='form' onSubmit={submitHandler}>
                <label>Barcode Id : </label>
                <input onChange={handleFileUpload5} type="text" required />
                <br />
                <label>Barcode Image : </label>
                <input type="file" onChange={handleFileUpload4} required />
                <br />
                <label>Bill photo : </label>
                <input type="file" onChange={handleFileUpload1} required />
                <br />
                <label>Product Image : </label>
                <input type="file" onChange={handleFileUpload2} required />
                <br />
                <label>video : </label>
                <input type="file" onChange={handleFileUpload3} required />
                <br />
                <label>qty : </label>
                <input type="number" onChange={handleFileUpload6} required />
                <br />
                <button disabled={button} type="submit">submit</button>
            </form>
        </div>
    )
}