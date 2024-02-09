import { Fragment, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {toast} from "react-toastify"
import Home from "../pages/home";
import { loginFail,loginRequest,loginSuccess } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Login(){

    const[email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const dispatch = useDispatch()
    
    const [showToast, setShowToast] = useState(true);

     const {loading,isAuthenticated} = useSelector(state => state.authState)
    const navigate = useNavigate()

   const handleLogin = (e)=>{
        e.preventDefault()
        dispatch(loginRequest())
        fetch(process.env.REACT_APP_API_URL +"/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email, 
            password
          })})
      .then((response) => response.json())
      .then((data) => {

    if(data.user)
    {dispatch(loginSuccess(data))
    }
         
    else{
          toast.error(data.message)
        }
      })
      
    }
    useEffect(()=>{
     
        if(isAuthenticated){
          toast.success("login successfully", {
              onClose: () => setShowToast(false)
            })
          navigate('/home')
          
      }
    

    },[showToast,isAuthenticated])



    return (<Fragment>

        <div className="container container-fluid">
            <div className="row wrapper"> 
            <div className="col-10 col-lg-5">
            <form onSubmit={handleLogin} className="shadow-lg">
                <h1 className="mb-3" >Login</h1>
                <div className="form-group">
                <label htmlFor="email_field" className="float-left mb-1">Email :</label>
                <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                </div>
    
                <div className="form-group">
                <label htmlFor="password_field" className="float-left mb-1">Password :</label>
                <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                </div>
                <Link to={"/register"} className="float-left mb-4">New User?</Link>
                <a href="#" className="float-right mb-4">Forgot Password?</a>
    
                <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={isAuthenticated}
                >
                LOGIN
                </button>

                
            </form>
            </div>
    </div>
    </div>
    </Fragment>)
}