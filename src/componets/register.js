import { Fragment, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

export default function Register(){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [status,setStatus] = useState(false)
    const navigate = useNavigate()
    const handleSubmit =(e)=>{
        e.preventDefault()
        fetch(process.env.REACT_APP_API_URL +"/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email, 
            password
          })})
      .then((response) => response.json())
      .then((data) => {
            if(data.token){
                setStatus(true)
            }
            else{
                toast.error(data.message)
            }
        }
      )
    }
    useEffect(()=>{
        if(status){
            toast.success("register success")
            navigate("/")
        }
    },[status,navigate])
    return <Fragment>
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                <form onSubmit={handleSubmit} class="shadow-lg" encType='multipart/form-data'>
                    <h1 class="mb-3">Register</h1>

                <div class="form-group">
                    <label for="email_field">Name</label>
                    <input type="name" id="name_field" class="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                    <div class="form-group">
                    <label for="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        class="form-control"
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    </div>
        
                    <div class="form-group">
                    <label for="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        class="form-control"
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    </div>

                  
        
                    <button
                    id="register_button"
                    type="submit"
                    class="btn btn-block py-3"
                    >
                    REGISTER
                    </button>
                </form>
                </div>
            </div>
    </Fragment>
}