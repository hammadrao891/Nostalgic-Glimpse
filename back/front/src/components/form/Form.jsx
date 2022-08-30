import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import {DataCountry,data} from '../../states';
import "./form.css"
import Messenger2 from '../messenger2/Messenger2';
import { pContext } from '../../context/PContext';
import e from 'cors';
import { AuthContext } from '../../context/AuthContext';

function Form() {

 const {pId,setPId}=useContext(pContext);
 const {user} =useContext(AuthContext)
 const[id,setId]=useState([]);
  const [cityId,setCityId]=useState([]);
  const [country, setCountry]= useState([]);
  const [countryid, setCountryid]= useState('');
  const [cityPresent, setCityPresent]= useState([]);
  const [cityBefore,setCityBefore] =useState([]);
  const [citymatch , setCitymatch]=useState([]); // filtering purposes
  useEffect( ()=>{
   const getcountry=  ()=>{
     const req=  DataCountry;
     console.log(req);
     setCountry(req);
    
   }
  
   getcountry();


  },[]);

  const handlecountry=(event)=>{
    const getcoutryid= event.target.value;
    setCountryid(getcoutryid);
    // console.log(getcoutryid)
    event.preventDefault();
}
useEffect( ()=>{

  const getstate= async ()=>{
    
    const res=  data
    setCityPresent(res);
  }
    const getCityBefore=()=>{
      const res=  data
      setCityBefore(res);
    }
  
  getCityBefore();
  getstate();

},[countryid]);
useEffect(()=>{
const match=async(event)=>{
const res=await 
axios({
    method: 'get',
    baseURL: 'http://localhost:1000/back/',
    url: 'users/',
  });
 
  setCitymatch(res.data);
  console.log(cityId);
  // console.log(citymatch.cityBefore)
}
match();
},[cityId])

const handleLast=(event)=>{
  const getCId=event.target.value;
  setCityId(getCId);
}

const handleConvos=async(e)=>{
  e.preventDefault()
  // alert("function callled")
  // alert(pId)
  if(pId==null || pId=="--Select--")
  {
      alert("Choose correctly!")
  }
  else
  {
  try{  
    const res=await axios({
      method: 'get',
      baseURL: 'http://localhost:1000/back/',
      url: `/conversations/find/${pId}/${user._id}`,
    })
    console.log("runn")
    console.log(res.data?._id)
    if(res.data?._id === undefined)
    {
        const mem={
        senderId:user._id,
        receiverId:pId
      }
      console.log(JSON.stringify(mem))
      const res=await axios ({
        method:"post",
       baseURL: 'http://localhost:1000/back/',
       url:"conversations/",
       data:mem
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // alert("created")
    }
  }catch(err)
{
  
  console.log(err)
}
  }
}

const check=()=>{
   if(pId==null || pId=="--Select--")
   {
    alert("kindly choose correct")
   }

}
// const handleClick=async(e)=>{
//   console.log(pId);
//   try{
//       const res=await axios({
//         method:"put",
//         baseURL: 'http://localhost:1000/back/',
//         url:`users/follow/${pId}`
//       })
//   alert("done")
//   }catch(err){
//     console.log(err)
//   }
// }
    return (
    <div classname="whole">
        <div className='wrapper'>
      <div className='top'>
      <div className='webname'>
        <h1>Old Times</h1>
        <h3>time to get some nostalgia</h3>
        </div>
        {/* <h1 className='webname'>Old times</h1>
      <span className='desc'>time to get some nostalgia</span> */}
      </div>
      <div className='bottom'>
      <form className='form'>
            <h3>Country:{user.country}</h3>
            {/* <select name="country" id="country" onChange={(e)=>handlecountry(e)}>
              <option>--Select Country--</option>
              {
                country.map((getcon)=>(
                  <option key={getcon.id} value={getcon.id}>{getcon.country_name}</option>
                )
                  
                )
              }
              </select> */}
              <h3>Present City:{user.cityPresent}</h3>
              {/* <select name="cityPresent" id="cityPresent">
                <option>--Select City--</option>
              {
                countryid==="2" ?
                cityPresent.filter(city=>city.country_id < 150).map((getcity)=>( 
                  <option value={getcity.state_id} key={getcity.state_id}>{getcity.state_name}</option>
                ))
                :
                cityPresent.filter(city=>city.country_id > 150 ).map((getcity)=>( 
                  <option value={getcity.state_id} key={getcity.state_id}>{getcity.state_name}</option>
                ))
              }
              </select> */}
              <div className='cityBefore'>
              <label for="cityBefore">City Before:</label>
              <select name="cityBefore" id="cityBefore" onChange={handleLast}>
              <option>--Select City--</option>
              {
               user.country==="India" ?
               cityBefore.filter(city=>city.country_id > 150).map((getcity)=>( 
                 <option value={getcity.state_name} key={getcity.state_id}>{getcity.state_name}</option>
               ))
               :
               cityBefore.filter(city=>city.country_id < 150 ).map((getcity)=>( 
                 <option value={getcity.state_name} key={getcity.state_id}>{getcity.state_name}</option>
               ))
              }
              
              </select> 
              </div>
              
              {/* {
                  citymatch.map((get)=>(
                    <p key={get._id} value={get._id}>{get.cityPresent}</p>
                  ))
      
      } */}
      <div className='match'>
                <label for="match">Match Results:</label><br/>
              <select name="match" id="match" onChange={e=>setPId(e.target.value)} >
            
                
                  <option>--Select--</option>
                {
                  citymatch.filter(get=>get.cityPresent===cityId).map((get)=>(
                    <option key={get._id} value={get._id} className="card">
                      {get.username}
                      {/* <h3>Email:{get.email}</h3>  */}
                       {/* <button onClick={e=>setPId(e.target.value)}>Choose</button> */}
                    </option>
                  ))
                  }
                 
                  </select>
                  </div>
                <button className='b1' onClick={e=>handleConvos(e)}>Chat</button><br/><br/>
                  
      {/* <Messenger2 value={pId} /> */}

      
      </form>
      </div>          
      
                       <Link to="/messenger"> 
                       <button className='b2' onClick={check}>confirm Chat</button> 
                       </Link>
    </div>
    </div>
  )
}


export default Form
