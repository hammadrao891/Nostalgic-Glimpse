import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    // const res = await axios.post("/auth/login", userCredential);
    const res= await 
    axios({
        method: 'post',
        baseURL: 'http://localhost:1000/back/',
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
  try {
    // const res = await axios.post("/auth/login", userCredential);
    const res= await 
    axios({
        method: 'post',
        baseURL: 'http://localhost:1000/back/',
        url: '/auth/partner',
        data: userCredential
      });


    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};


