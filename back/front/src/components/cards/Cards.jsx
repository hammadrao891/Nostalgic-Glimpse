import React, { useState,useEffect } from 'react'
import axios from "axios"
const Cards = () => {
  cpmst[cityId,setCityId]=useState("")  
  const[cityInfo,setCityInfo]=useState([]);
  useEffect(() => {
    const getInfo=async(event)=>{
        const res=await 
        axios({
            method: 'get',
            baseURL: 'http://localhost:1000/back/',
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
