import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import './User.css';
import { followUser, unFollowUser } from '../../Actions/userAction';
import config from "../../config";
const serverPublic = config.publicFolder;
// const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
const User = ({ person }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData);
  const[following,setFollowing]=useState(person.followers.includes(user._id))
  const handleFollow = async() => {
    if (following) {
      await dispatch(unFollowUser(person._id, user));
      setFollowing(false)
    }
    else {
      await dispatch(followUser(person._id, user));
      setFollowing(true);
    }
    
    // following? 
    //   dispatch(unFollowUser(person._id, user))
    //   : dispatch(followUser(person._id, user))
    // setFollowing((prev)=>!prev);
}
  return (
    
      <div className="follower">
        <div>
          <img className='followerImg'
            src={
              person.profilePicture
                ? serverPublic + person.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt=""
          />
          <div className="name">
            <span>{person.firstname}</span>
            <span>{person.username}</span>
          </div>
        </div>
      <button className={following ? "Button fc-button unfollowButton" : "Button fc-button"} onClick={handleFollow}>{following ? "unfollow" : "follow"}</button>
      </div>
    
  );
};

export default User
