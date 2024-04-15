import React, { useEffect, useRef, useState } from "react";
import { getMessages, addMessage } from "../../Api/MessageRequests";
import { getUser } from "../../Api/userRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll =useRef()
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      // Send message to database
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");

      // Send message to socket server
      const receiverId = chat?.members.find((id) => id !== currentUserId);
      setSendMessage({ ...message, receiverId });
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  // Fetching data for header
  useEffect(() => {
    const fetchUserData = async () => {
      if (chat && chat.members) {
        const userId = chat.members.find((id) => id !== currentUserId);
        console.log("userId", userId);
        console.log("current", currentUserId);

        try {
          const { data } = await getUser(userId);
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUserData();
  }, [chat, currentUserId]);


  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receiveMessage);
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  // usref to scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* Chat header */}
            <div className="chat-header">
              {userData && (
                <div className="follower">
                  <div>
                    <img
                      src={
                        userData?.profilePicture
                          ? process.env.REACT_APP_PUBLIC_FOLDER +
                            userData.profilePicture
                          : process.env.REACT_APP_PUBLIC_FOLDER +
                            "defaultProfile.png"
                      }
                      alt="Profile"
                      className="followerImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name" style={{ fontSize: "0.9rem" }}>
                      <span>
                        {userData?.firstname} {userData?.lastname}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* Chat body */}
            <div className="chat-body">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={
                    message.senderId === currentUserId
                      ? "message own"
                      : "message"
                  }
                  ref={scroll}
                >
                  <span>{message.text}</span>{" "}
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            {/* Chat sender */}
            <div className="chat-sender">
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button Button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );

};

export default ChatBox;
