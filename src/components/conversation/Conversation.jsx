import React, { useEffect, useState } from "react";
import { getUser } from "../../Api/userRequest";

const Conversation = ({ data, currentUserId }) => {
    // userdata is the data of the user for whom i send msg...
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        // inside the chat model we have members array which has 2 user id,, 1st is my id and other is the person i am chatting
        const userId= data.members.find((id)=>id!==currentUserId)
        const getUserData = async() => {
            const { data } = await getUser(userId);
            setUserData(data)
            console.log("useraData",data);
        }
        getUserData()
    },[])
    return (
      <>
        <div className="follower conversation">
          <div>
            <div className="online-dot"></div>
            <img
              src={
                userData?.profilePicture
                  ? process.env.REACT_APP_PUBLIC_FOLDER +
                    userData.profilePicture
                  : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
              }
              alt="Profile"
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="name" style={{ fontSize: "0.8rem" }}>
              <span>
                {userData?.firstname} {userData?.lastname}
              </span>
              <span>Online</span>
            </div>
          </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </>
    );
      
  
};

export default Conversation;
