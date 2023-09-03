// import { format } from "timeago.js";
import { useContext, useEffect, useState,useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { pContext } from "../../context/PContext";
import { io } from "socket.io-client";
import axios from "axios";
import "./message.css"
export default function Message() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const[conversations,setConversations]=useState([]); 
  const [messages,setMessages]=useState([])
  const {pId,setPId}=useContext(pContext)
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const {user}=useContext(AuthContext)
  const[newMessage,setNewMessage]=useState([])
  const scrollRef = useRef();
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
     console.log("get Called")
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt:Date.now()
      });
      console.log("ss")
    });
  }, [setArrivalMessage]);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);
  useEffect(() => {
    
    arrivalMessage &&
      
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  




  useEffect(()=>{
    const getconversations=async()=>{
      console.log(user._id)
      console.log(pId)
      try{  
        const res=await axios({
          method: 'get',
          baseURL,
          url: `/conversations/find/${pId}/${user._id}`,
        })
        console.log("runn")
        console.log(res.data?._id)
        setConversations(res.data)
       
    }
      catch(err)
      {
        alert(err)
            
      }
      
  }
  getconversations();
},[user._id])

useEffect(()=>{
  const getMessages=async()=>{

    console.log(conversations._id)
    // console.log(conversations.sender[0])
    try{  
      const res=await axios({
        method: 'get',
        baseURL,
        url: `/messages/${conversations?._id}`,
      })
      console.log(res.data )
      console.log('Messages agye')
      setMessages(res.data)
    }catch(err)
    {
      console.log(err)
    }
  };
  // createConvo();
  getMessages();

  },[conversations])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: conversations._id,
    };
    const receiverId = conversations.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      sender: user._id,
      receiverId:receiverId,
      text: newMessage,
    });

    try {
      const res = await axios({
        method: 'post',
        baseURL,
        url: `/messages/`,
        data:message
      })
      setMessages([...messages, res.data]);
      setNewMessage("");
      console.log(messages)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    scrollRef.conversations?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
  <>
  
      <div className={messages.sender===user._id ? "message own" : "message"}>
      {
      messages ?( messages.map((m)=>(
        <div ref={scrollRef}>
      <p className={m?.sender===user._id ? "message own" : "message"}>
        {m?.text}</p>
      </div>)
      
      )):"NO MESSAGESSSSSSSSSSSSSSSSSSSSSSS"}
      <div className="chatBoxBottom">

                 
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
    {/* //   </div>
    //   <div className="messageBottom">{message.createdAt}</div>
    // </div>
    // {pId} */}
   </div> 
    </>
  );
}