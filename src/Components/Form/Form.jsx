import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as XLSX from "xlsx";
import "./Form.css"

const Form = () => {
    //STATE FOR THE FEILDS
    const [awb, setAwb] = useState("")
    const [firmName, setFirmName] = useState("")
    const [sborder, setSborder] = useState("")
    const [rtype, setRtype] = useState("")
    const [sku, setSku] = useState("")
    const [category, setCategory] = useState("")
    const [qty, setQty] = useState("")

    const navigate = useNavigate()
    //FUNCTION FOR SUBMITTING THE FORM
    const submitForm = async(e) => {
        
        try{
            const formData =  {
                awb:awb,
                firmname:firmName,
                suborder_id:sborder,
                returnType:rtype,
                sku:sku,
                category:category,
                qty:qty,
                photo1:"",
                photo2:"",
                video:""
            }
            if(!awb || !firmName || !sborder || !rtype || !sku || !category || !qty ){
                alert("fill all feilds")
                return 
                }
                else{
                await axios.post("https://grumpy-jacket-lamb.cyclic.app/data", formData)
                navigate('/')
                }
            }
            catch (error) {
                console.error(error)
              }
    }

    const excelHandler=async(e)=>{
        e.preventDefault();
        const [file] = e.target[0].files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      const res = data.map((data)=>([{...data,photo1:"",photo2:"",video:""}]))
      console.log(res[0])
    //   res.map((res)=>(axios.post("https://grumpy-jacket-lamb.cyclic.app/data",res)))
    axios.post("https://grumpy-jacket-lamb.cyclic.app/data",res[0])
    navigate("/")
    }
    reader.readAsBinaryString(file);
}

  return (
    <div className=''>
        <form className='form' >
            <label >AWB Number</label>
            <input type="number" onChange={(e) => setAwb(e.target.value)} value={awb}/>
            <label >Firm Name</label>
            <input type="text" onChange={(e) => setFirmName(e.target.value)} value={firmName}/>
            <label >Suborder Id</label>
            <input type="number" onChange={(e) => setSborder(e.target.value)} value={sborder}/>
            <label >Return Type</label>
            <input type="text" onChange={(e) => setRtype(e.target.value)} value={rtype}/>
            <label >SKU</label>
            <input type="text" onChange={(e) => setSku(e.target.value)} value={sku}/>
            <label >Category</label>
            <input type="text" onChange={(e) => setCategory(e.target.value)} value={category}/>
            <label >QTY</label>
            <input type="number" onChange={(e) => setQty(e.target.value)} value={qty}/>
            <button className='form__btn' onClick={submitForm} type="button">Submit</button>
        </form>

        <form onSubmit={excelHandler}>
            <label>add excel data</label>
            <input type="file" required />
            <button type="submit">submit</button>
        </form>

    </div>
  )
}

export default Form