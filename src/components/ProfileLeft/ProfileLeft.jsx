import React from 'react'
import LogoSearch from '../logoSearch/LogoSearch'
import Infocard from '../InfoCard/Infocard'
import FollowersCard from '../followersCard/FollowersCard'

const ProfileLeft = () => {
  return (
    <div className="ProfileSideContainer">
      <div className="ProfileSide">
        <LogoSearch />
        <Infocard />
        <FollowersCard />
      </div>
    </div>
  );
}

export default ProfileLeft
