import React from 'react'
import './Home.css';
import ProfileSide from '../../components/profileSide/ProfileSide';
import PostSide from '../../components/postSide/PostSide';
import RightSide from '../../components/RightSide/RightSide';
const Home = () => {
  return (
    <div className="Home">
      <div className="ProfileSideContainer">
        <ProfileSide />
      </div>

      <PostSide />
      <RightSide />
    </div>
  );
} 

export default Home
