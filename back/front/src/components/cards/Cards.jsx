import React, { useState,useEffect } from 'react'
import axios from "axios"
const Cards = () => {
  cpmst[cityId,setCityId]=useState("")  
  const[cityInfo,setCityInfo]=useState([]);
  useEffect(() => {
    const getInfo=async(event)=>{
      const baseURL = process.env.REACT_APP_BASE_URL;
        const res=await 
        axios({
            method: 'get',
            baseURL,
            url: 'users/',
          });
          const getCId=event.target.value;
          setCityId(getCId);
          setCityInfo(res.data);
          console.log(citymatch.cityBefore)
        }
        getInfo();
}
    
  , [])
  
  
    return (
    <div>
      
    </div>
  )
}

export default Cards
