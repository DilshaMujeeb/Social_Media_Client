import React, { useState, useEffect } from "react";
import "./Infocard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../Api/userRequest";
import { logout } from "../../Actions/AuthAction";

const Infocard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  console.log("profileuserid", profileUserId);
  const [profileUser, setProfileUser] = useState(null); // Initialize profileUser to null
  const { user } = useSelector((state) => state.authReducer.authData);
  console.log(user);
  const handlelLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        console.log("profile user ===user", user);
      } else {
        const profileUserInfo = await UserApi.getUser(profileUserId);
        setProfileUser(profileUserInfo);
        console.log("profile user", profileUser);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {/* Render profile information only if profileUser is defined */}
        {profileUser && (
          <>
            
            <div className="info">
              <span>
                <b>Status</b>
              </span>
              <span> {profileUser.relationship} </span>
            </div>
            <div className="info">
              <span>
                <b>Lives in </b>
              </span>
              <span>{profileUser.livesIn}</span>
            </div>
            <div className="info">
              <span>
                <b>Works at </b>
              </span>
              <span>{profileUser.worksAt}</span>
            </div>
          </>
        )}
      </div>
      <button className="Button logout" onClick={handlelLogout}>
        Logout
      </button>
    </div>
  );
};

export default Infocard;
