import axios from 'axios'
import React, { useContext, useEffect, useRef } from 'react'
import "./messenger2.css"
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { NavbarM } from '../navbar/Navbar'
import Conversation from '../conversations/Conversation'
import { pContext } from '../../context/PContext'
import Message2 from '../message2/Message2'
import { io } from 'socket.io-client'

const Messenger2 = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const {pId,setPId}=useContext(pContext)
  const [conversations, setConversations] = useState([])
  const [currentChat,setCurrentChat]=useState(null)
  const [messages,setMessages]=useState(null)
  const [newMessage,setNewMessage]=useState([]);
  const {user} =useContext(AuthContext)
 const [arrivalMessage,setArrivalMessage]=useState(null)
  const scrollRef=useRef(); 
 
  // const[socket,setSocket]=useState(null)
  const socket=useRef()

useEffect(() => {
  socket.current = io("ws://localhost:8900");
  socket.current.on("getMessage", (data) => {
    console.log("ss")
    console.log(data.senderId)
  //  alert("get Called")
  console.log("gg")
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt:Date.now()
    });
    
  });
}, [setArrivalMessage]);
useEffect(() => {
  socket.current.emit("addUser", user._id);
  socket.current.on("getUsers", (users) => {
    console.log("ss");
    console.log(users);
    // setOnlineUsers(
    // user.followings.filter((f)  => users.some((u) => u.userId === f))
    // );
  });
}, []);

useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(()=>{
    console.log(pId)
    const getconversations=async()=>{
        try{  
          const res=await axios({
            method: 'get',
            baseURL,
            url: `/conversations/${user._id}`,
          })
          console.log(res.data)
          setConversations(res.data)
        }catch(err)
        {
          console.log(err)
        }
    }
    getconversations();
},[user._id])

useEffect(()=>{
  const getMessages=async()=>{
    try{  
      const res=await axios({
        method: 'get',
        baseURL,
        url: `/messages/${currentChat?._id}`,
      })
      console.log(res.data)
      setMessages(res.data)
    }catch(err)
    {
      console.log(err)
    }
  }
getMessages();

},[currentChat])
console.log(currentChat?._id)
console.log(messages)
console.log(pId)

useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const message = {
    sender: user._id,
    text: newMessage,
    conversationId: currentChat._id,
  };
  const receiverId = currentChat.members.find(
    (member) => member !== user._id
  );

  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId,
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
  } catch (err) {
    console.log(err);
  }
}



  return (
    <>
    <NavbarM/>
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user}  value={pId}/>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {(pId !== null) ? 
            (
              <>
              <div className={messages?.sender===user._id ? "message own" : "message"}>
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
            </>)
            :


            (currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message2 message={m} own={m.sender === user._id} />
                     </div>
                  ))}
                </div>
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
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            ))}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
      </>

  )
}

export default Messenger2

