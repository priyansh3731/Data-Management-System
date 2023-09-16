import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import "./Components/Form/Form.css"

export const Editable=()=>{

    const {id} = useParams();
    const navigate = useNavigate();
    const [qty,setqty] = useState()

      const submitHandler=async(e)=>{
        e.preventDefault();
        const res = {qty:Number(qty)}
      console.log(res)
        const repo = await axios.put(`https://grumpy-jacket-lamb.cyclic.app/data/${id}`,res);
        navigate('/')
      }


    return(
        <div>
            <form className='form' onSubmit={submitHandler}>
                <label>qty : </label>
                <input type="number" onChange={(e) => setqty(e.target.value)} value={qty} required />
                <br />
                <button className="form__btn" type="submit">submit</button>
            </form>
        </div>
    )
}