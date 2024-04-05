import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../Api/PostRequest";
import { useSelector } from "react-redux";
// data is taken from the reducer but action to like and unlike post has to be added
const Post = ({ data }) => {
  console.log("dataaaa",);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data?.likes?.includes(user._id));
  const [likes, setLikes] = useState(data?.likes?.length);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    if (liked) {
      data.likes=data.likes.filter((userId)=>userId!==user._id)
      setLikes((prev) => prev - 1);
    } else {
      data.likes.push(user._id);
      setLikes((prev) => prev + 1);
    }
  };


  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
