import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Productsch(){
    const [word,setkeyword]= useState("")
    const navigate = useNavigate();
    const Handler =() =>{
        navigate("/search?keyword="+word)
    }
    return  <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    onChange={(e)=>setkeyword(e.target.value)}
                    onBlur={Handler}
                    placeholder="Enter Product Name ..."
                />
                <div className="input-group-append">
                    <button onClick={Handler} id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
}