import { React, useEffect, useState } from 'react'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import { useSelector } from "react-redux"
import {Link} from 'react-router-dom'
import { getFollowersList, getFollowingList } from '../../Api/userRequest'
import FollowingList from '../FollowingList/FollowingList'
const ProfileCard = ({ location }) => {

  
  
  const { user } = useSelector((state) => state.authReducer.authData)
  const posts = useSelector((state) => state.postReducer.posts)
  console.log(posts,"postss");
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  console.log("REACT_APP_PUBLIC_FOLDER:", process.env.REACT_APP_PUBLIC_FOLDER);

  
  const [showFollowing, setShowFollowing] = useState(false);
  const [listFollowing, setListFollowing] = useState([])
  const [listFollowers, setListFollowers] = useState([]);

  useEffect(() => {
    const fetchUsersId = async () => {
      try {
        const followingResponse = await getFollowingList(user._id);
        
        const following = followingResponse.data.following;
        console.log(following, "following");
        setListFollowing(following);
        // console.log(listFollowing,"list following");

        const followerResponse = await getFollowersList(user._id);
        setListFollowers(followerResponse.data.followers)
      } catch (error) {
        console.log(error);
      }
      
    } 
    fetchUsersId()
  }, [])
  useEffect(() => {
    console.log("List following updated:", listFollowing);
  }, [listFollowing]);



  const handleFollowingList = async(e) => {
    e.preventDefault();
    setShowFollowing(true);
    try {
    const followingResponse = await getFollowingList(user._id);
        
        const following = followingResponse.data.following;
        console.log(following, "following");
        setListFollowing(following);
    } catch (error) {
      console.log(error);
    }
   
  };
  const handleFollowersList = async(e) => {
    e.preventDefault();
    setShowFollowing(true)
    try {
      const followerResponse = await getFollowersList(user._id);
      setListFollowers(followerResponse.data.followers);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCloseFollowing = () => {
    setShowFollowing(false)
  }
    return (
      <div className="ProfileCard">
        <div className="ProfileImage">
          <img
            src={
              user.coverPicture
                ? serverPublic + user.coverPicture
                : serverPublic + "defaultCover.jpg"
            }
            alt=""
          />
          <img
            src={
              user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt=""
          />
        </div>
        <div className="ProfileName">
          <span>
            {user.firstname} {user.lastname}
          </span>
          <span>{user.worksat ? user.worksat : "write about yourself"}</span>
        </div>

        <div className="FollowStatus">
          <hr />
          <div>
            <div className="follow">
              <span onClick={handleFollowingList} style={{ cursor: "pointer" }}>{user.following.length}</span>
              <span onClick={handleFollowingList} style={{ cursor: "pointer" }}>
                Following
              </span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span onClick={handleFollowersList} style={{ cursor: "pointer" }}>
                {user.followers.length}
              </span>
              <span onClick={handleFollowersList} style={{ cursor: "pointer" }}>
                Followers
              </span>
            </div>

            {location === "profilePage" && (
              <>
                <div className="vl"></div>

                <div className="follow">
                  <span>
                    {posts.filter((post) => post.userId === user._id).length}
                  </span>
                  <span>posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
        {location === "profilePage" ? (
          ""
        ) : (
          <span>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${user._id}`}
            >
              My Profile
            </Link>
          </span>
        )}
        {showFollowing && (
          <div className="following-list-popup">
            <FollowingList
              followingList={listFollowing}
              followerList={listFollowers}
              onClose={handleCloseFollowing}
            />
          </div>
        )}

        {/* {showFollowing && (
          <FollowingList
            followingList={listFollowing}
            followerList={listFollowers}
            onClose={handleCloseFollowing}
          />
        )} */}
      </div>
    );
}

export default ProfileCard
