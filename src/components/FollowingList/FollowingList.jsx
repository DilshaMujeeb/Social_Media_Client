import React, { useEffect, useState } from "react";
import "./FollowingList.css"; // Import CSS file for styling
import { getUser } from "../../Api/userRequest";

const FollowingList = ({ followingList, followerList, onClose }) => {
    console.log(followingList, "followingList");
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        // Fetch details for users in the following list
        const detailedFollowingList = await Promise.all(
          followingList.map(async (user) => {
              const details = await getUser(user);
               console.log(details, "detailedFollowingList");
            return details.data;
          })
          );
        //   console.log(detailedFollowingList, "detailedFollowingList");
          

        // Filter out duplicate users
        const flattenedFollowingList = detailedFollowingList.filter(
          (user, index, self) =>
            index === self.findIndex((u) => u._id === user._id)
        );

        setUserFollowing(flattenedFollowingList);

        // Fetch details for users in the follower list
        const detailedFollowerList = await Promise.all(
          followerList.map(async (userId) => {
            const details = await getUser(userId);
            return details.data;
          })
        );

        // Filter out duplicate users
        const flattenedFollowerList = detailedFollowerList.filter(
          (user, index, self) =>
            index === self.findIndex((u) => u._id === user._id)
        );

        setUserFollowers(flattenedFollowerList);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, [followingList, followerList]);

  return (
    <div className="following-popup-container">
      <div className="following-popup">
        <h2>Following and Followers List</h2>
        <div className="following-followers-container">
          <div className="following-list">
            <h3>Following</h3>
            {userFollowing.length === 0 ? (
              <p>No following yet. Start following!</p>
            ) : (
              <ul>
                {userFollowing.map((user, index) => (
                  <li key={index}>
                    <div className="user-info">
                      <div className="profile-image">
                        <img
                          src={
                            user.profilePicture
                              ? serverPublic + user.profilePicture
                              : serverPublic + "defaultProfile.png"
                          }
                          alt={`${user.firstname} ${user.lastname}`}
                        />
                      </div>
                      <div className="user-name">
                        {user.firstname} {user.lastname}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="vertical-line"></div>
          <div className="follower-list">
            <h3>Followers</h3>
            {userFollowers.length === 0 ? (
              <p>No followers yet. Start following!</p>
            ) : (
              <ul>
                {userFollowers.map((user, index) => (
                  <li key={index}>
                    <div className="user-info">
                      <div className="profile-image">
                        <img
                          src={
                            user.profilePicture
                              ? serverPublic + user.profilePicture
                              : serverPublic + "defaultProfile.png"
                          }
                          alt={`${user.firstname} ${user.lastname}`}
                        />
                      </div>
                      <div className="user-name">
                        {user.firstname} {user.lastname}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FollowingList;
