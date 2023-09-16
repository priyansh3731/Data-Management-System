import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import "./Components/Form/Form.css"


export const EditQTY=()=>{

    const {id} = useParams();
    const navigate = useNavigate();
    const [qty,setqty] = useState()

const submitHandler=async(e)=>{
  e.preventDefault();
  const res = {qty:qty}

  const repo = await axios.put(`https://grumpy-jacket-lamb.cyclic.app/data/${id}`,res);
  navigate('/')
}


const handleFileUpload6=async(e)=>{
  const file = e.target.value[0]
    setqty(file)
}

    return(
        <div className="">
            <form className='form' onSubmit={submitHandler}>
                <label>qty : </label>
                <input type="number" onChange={handleFileUpload6} required />
                <br />
                <button disabled={button} type="submit">submit</button>
            </form>
        </div>
    )
}