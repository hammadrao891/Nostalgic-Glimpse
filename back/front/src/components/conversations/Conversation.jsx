import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css"
export default function Conversation( props ) {
  const [user, setUser] = useState("null");
  useEffect(() => {
    // alert(props.value)
    const friendId = props.conversation.members.find((m) => m !== props.currentUser._id);
    // alert(friendId)s
    // console.log(props.value)
  // const friendId=props.value;
    const getUser = async () => {
      const baseURL = process.env.REACT_APP_BASE_URL;
      try {

        const res = await axios
        ({
          method:'get',
          baseURL,
          url:`/users/user/${friendId}`
        });
        setUser(res.data);
        console.log(res.data.username);
      } catch (err) {
        console.log(err);
      }

    };
    getUser();
    
  }, []);


  // [props.currentUser, props.conversation]
  return (
    <div className="conversation">
      {/* {getUser} */}
      <span className="conversationName">{user.username} </span>
    
    </div>

  );
} 