import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { userChats, createNewChat } from "../../Api/ChatRequest"; // Import createNewChat function
import Conversation from "../../components/conversation/Conversation";
import { Link } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";
import { getFollowersList, getFollowingList } from "../../Api/userRequest";

const Chat = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);

        if (data.length === 0) {
          const followingResponse = await getFollowingList(user._id);
          const followersResponse = await getFollowersList(user._id);
          const friendList = [
            ...followingResponse.data.following,
            ...followersResponse.data.followers,
          ];
          console.log(friendList,"firendlidt");
          setFriendList(friendList);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user._id]);

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data, "data received in socket");
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // Function to start a new chat with a friend
  const startChatWithFriend = async (friendId) => {
    try {
      // Create a new chat with the friend
      const newChat = await createNewChat(user._id, friendId);
      setCurrentChat(newChat);
      console.log(newChat,"curent............");
    } catch (error) {
      console.error("Error starting chat with friend:", error);
    }
  };
  const sortFriendsByLatestChat = (friends, chats) => {
    return friends.sort((a, b) => {
      const latestChatA = chats.find((chat) => chat.members.includes(a._id));
      const latestChatB = chats.find((chat) => chat.members.includes(b._id));

      if (latestChatA && latestChatB) {
        return (
          new Date(latestChatB.updatedAt) - new Date(latestChatA.updatedAt)
        );
      } else if (latestChatA) {
        return -1;
      } else if (latestChatB) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const sortedFriendList = sortFriendsByLatestChat(friendList, chats);
  return (
    <div className="Chat">
      {/* left side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {/* Display existing chats */}
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}

            {/* Display friend list for new users */}
            {chats.length === 0 &&
              sortedFriendList.map((friend) => (
                <div key={friend} onClick={() => startChatWithFriend(friend)}>
                  <Conversation data={friend} currentUserId={user._id} />
                </div>
              ))}

            {/* Display friend list when chats exist */}
            {chats.length > 0 &&
              friendList.map((friend) => (
                <div key={friend} onClick={() => startChatWithFriend(friend)}>
                  <Conversation data={friend} currentUserId={user._id} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to={`/home`}>
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
