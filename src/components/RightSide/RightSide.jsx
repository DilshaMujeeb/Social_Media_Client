import React, { useState } from 'react';
import './RightSide.css';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom'
import Lottie from "lottie-react-web";
import animationChatData from '../../chatAnimation/chat.json'; // Import your Lottie animation JSON file

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to={`/home`}>
          <img src={Home} alt="" />
        </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <Link to="../chat">
          <Lottie
            options={{
              animationData: animationChatData,
              loop: true, // Set loop to true for continuous playback
              autoplay: true, // Autoplay the animation
            }}
            width={"4rem"} // Set width and height
            height={"4rem"}
            
          />
          {/* <img src={Comment} alt="" /> */}
        </Link>
      </div>
      <TrendCard />

      <button className="Button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
}

export default RightSide
