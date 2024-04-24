import React from "react";
import { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImg from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../Actions/uploadAction";
import { uploadPost } from "../../Actions/uploadAction";
import config from "../../config";
const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const cloudName = "dnzxhje5m";
  const preset_key = "reelking";
  // useRef is used to manipulate the reactDOM for changing a value which is stpred in the DOM
  const imgRef = useRef();
  const descRef = useRef();
  // name export is used to get the utilities from a module like from user we need user._id
  const { user } = useSelector((state) => state.authReducer.authData);
  // console.log(user, "user in authreducer after postshare");
  // console.log(user._id)
  const dispatch = useDispatch();
  const serverPublic = config.publicFolder;
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    descRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,

      desc: descRef.current.value,
    };
    // image is stored in the server local storage.. simply fetching by using the image name
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      data.append("upload_preset", preset_key);

      try {
        const postResponse = await dispatch(uploadImage(data, cloudName));
        newPost.image = postResponse.url;
        console.log("new post..........", newPost);
      } catch (error) {
        console.log(error);
      }
    }
    await dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
        <input
          type="text"
          placeholder="whats happening"
          ref={descRef}
          required
        />
        <div className="PostOptions">
          <div
            className="Option"
            style={{ color: "var(--photo)" }}
            onClick={() => {
              imgRef.current.click();
            }}
          >
            <UilScenery />
            Photo
          </div>
          <div className="Option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="Option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="Option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className="Button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="img"
              ref={imgRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes className="CloseIcon" onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
