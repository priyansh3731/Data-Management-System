import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "./firebase"
import { useNavigate } from "react-router-dom"


export const Login2=()=>{
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()

    const submitHandler=(e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            if(userCredential._tokenResponse.registered){
                navigate("/alldata")
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>email</label>
                <input type="text" onChange={(e)=>setemail(e.target.value)} required />

                <label>password</label>
                <input type="password" onChange={(e)=>setpassword(e.target.value)} required />

                <button type="submit">submit</button>
            </form>
        </div>
    )
}