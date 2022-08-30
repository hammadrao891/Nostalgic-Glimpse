import { useEffect, useState } from "react";
import PartnerContext from "./PartnerContext";

const PartnerState=(props)=>{

    const s1={
        "name" :props.value
    }
    const [state,setState]=useState(s1);
const update=()=>
{
    setTimeout(()=>{
        setState({
            "name":"Waqar"
        })
    },1000)
}



    return(
        <PartnerContext.Provider value={{state,update}}>
            {props.children}

        </PartnerContext.Provider>
    )
}

export default PartnerState;