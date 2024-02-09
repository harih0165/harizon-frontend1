import { Fragment ,useEffect,useState} from "react";
import {Link,useLocation, useNavigate} from 'react-router-dom'
import Srch from './ProductSrch'
import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
import {toast} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../slice/authSlice";
import { UseDispatch } from "react-redux";

export default function Header({cartItems}){
    const location = useLocation();
    const isHomeLogin =location.pathname === '/' || location.pathname === '/register' 
    const {user,isAuthenticated} = useSelector(state => state.authState)

    const [check,setCheck] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
    fetch(process.env.REACT_APP_API_URL +"/logout")
    .then((data)=>data.json())
    .then((data)=>{
        if(data.message){
            dispatch(logoutSuccess())
            toast.success(data.message)
            setCheck(true)
        }
    })
    }
    useEffect(()=>{
            if(!isAuthenticated){
                navigate("/")
                
            }
    },[isAuthenticated,isHomeLogin])
   

  
    return <Fragment>
                    <nav className="navbar row">
                        <div className="col-12 col-md-3">
                            <div className="navbar-brand">
                          <Link to={isHomeLogin  ? "": "/home"}>  <img width="150px" src="./images/logo1.png" /> </Link>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 mt-2 mt-md-0">
                           <Srch/>
                        </div>

                        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                       {!isAuthenticated ?
                       <Link to={"/"}className="btn" id="login_btn">Login</Link> : <Dropdown className='d-inline' >
                            <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                                <figure className='avatar avatar-nav'>
                                <Image width="50px" border-radius ="50%" src={'./user_image3.png'}  />
                                </figure>
                                    <span>{isAuthenticated && user.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>logoutHandler()} className='text-danger'>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>}

                            <Link to={"/cart"}>
                            <span id="cart" className="ml-3">Cart</span>
                            <span className="ml-1" id="cart_count">{cartItems.length}</span></Link>
                            
                        </div>
                     </nav>
    </Fragment>
}