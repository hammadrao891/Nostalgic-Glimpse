import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
   const baseURL = process.env.REACT_APP_BASE_URL;
  dispatch({ type: "LOGIN_START" });
  try {
    
    
    const res= await 
    axios({
        method: 'post',
        baseURL,
        url: '/auth/login',
        data: userCredential
      });



    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};


export const partnerInfo = async (userCredential, dispatch) => {
  
  dispatch({ type: "LOGIN_START" });
  const baseURL = process.env.REACT_APP_BASE_URL;
  try {
    
    const res= await 
    axios({
        method: 'post',
        baseURL,
        url: '/auth/partner',
        data: userCredential
      });


    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};


