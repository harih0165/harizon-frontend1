import  { useState ,useEffect } from 'react';
import { Fragment} from "react";
import Card from '../componets/Card';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function Home() {
    const [products,setProduct] = useState([]);
    const [check,setCheck] = useState(false);
    const [SearchParams,setSearchParams] = useSearchParams("")
   const {user}= useSelector(state=>state.authState)
   

    useEffect(() =>{
     
        fetch(process.env.REACT_APP_API_URL +"/product?"+SearchParams)
        .then(res =>res.json())
        .then(res => {
          if(res){setProduct(res.products)
            setCheck(true) }
        })
        

    },[SearchParams])
         
    return (check?   
         <Fragment>
          <div>   
            <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
          <div className="row">
          {products.map((products) => <Card product ={products} />)}
          </div>
          </section>
          </div> 
        </Fragment> : <div className='loader'></div> )
    
    }

    