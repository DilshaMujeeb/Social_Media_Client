import React from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import './Profile.css'
import ProfileCard from '../../components/profileCard/ProfileCard'
import PostSide from '../../components/postSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'
const Profile = () => {
  return (
    <div className='Profile'>
          <ProfileLeft />
          <div className="Profile-center">
              <ProfileCard location="profilePage"/>
              <PostSide />
          </div>
              <RightSide/>

    </div>
  )
}

export default Profile
