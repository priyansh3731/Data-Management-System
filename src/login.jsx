import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "./firebase"
import { useNavigate } from "react-router-dom"
import "./Components/Form/Form.css"


export const Login=()=>{
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()

    const submitHandler=(e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            if(userCredential._tokenResponse.registered){
                navigate("/form")
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <div className="">
            <form className="form" style={{padding:"20px"}} onSubmit={submitHandler}>
                <h2 style={{textAlign:"center"}}>login</h2>
                <label style={{textAlign:"center"}}>email</label>
                <input style={{maxWidth:"200px",margin:"auto"}} type="text" onChange={(e)=>setemail(e.target.value)} required />
                <br />
                <label style={{textAlign:"center"}}>password</label>
                <input style={{maxWidth:"200px",margin:"auto"}} type="password" onChange={(e)=>setpassword(e.target.value)} required />

                <button className='form__btn' type="submit">submit</button>
            </form>
        </div>
    )
}