// ProfileModal.js
import React, { useState } from "react";
import "./ProfileModal.css"; // Import the CSS file for styling
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../Actions/uploadAction";
import { updateUser } from "../../Actions/userAction";
function ProfileModal({ modalOpened, setModalOpened,data}) {
  const handleClose = () => {
    setModalOpened(false);
  };
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null)
  const dispatch = useDispatch()
  const param = useParams()
  const {user}=useSelector((state)=>state.authReducer.authData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log("formdata",formData);
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === 'profileImage' ? setProfileImage(img) : setCoverImage(img);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);

  }
  return (
    <>
      {modalOpened && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
            <form className="infoForm">
              <h3>Profile Info</h3>
              <div>
                <input
                  value={formData.firstname}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  className="infoInput"
                />
                <input
                  value={formData.lastname}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  className="infoInput"
                />
              </div>
              {/* Add more form inputs as needed */}
              <div>
                <input
                  value={formData.worksAt}
                  onChange={handleChange}
                  type="text"
                  placeholder="Works at"
                  name="worksAt"
                  className="infoInput"
                />
              </div>

              <div>
                <input
                  value={formData.livesIn}
                  onChange={handleChange}
                  type="text"
                  placeholder="Lives in"
                  name="livesIn"
                  className="infoInput"
                />
                <input
                  value={formData.country}
                  onChange={handleChange}
                  type="text"
                  placeholder="Country"
                  name="country"
                  className="infoInput"
                />
              </div>

              <div>
                <input
                  value={formData.relationship}
                  onChange={handleChange}
                  type="text"
                  className="infoInput"
                  placeholder="Relationship status"
                  name="relationship"
                />
              </div>

              <div>
                Profile image
                <input
                  type="file"
                  name="profileImage"
                  onChange={onImageChange}
                />
                Cover image
                <input type="file" name="coverImage" onChange={onImageChange} />
              </div>
              <div className="button-group">
                <button className="Button infoButton" type="submit" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileModal;
