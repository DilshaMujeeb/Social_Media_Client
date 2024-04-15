import React, { useState } from "react";
import "./Comment.css"; // Import the CSS file
import { useSelector } from 'react-redux';
import { createComment } from "../../Api/CommentRequest";
const CommentInputField = ({ onSubmit, postId }) => {
    console.log("onsubmit", postId);
    const {user} = useSelector((state) => state.authReducer.authData)
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        await createComment(postId,comment,user._id)
      } catch (error) {
        console.log(error);
      }
    onSubmit(comment);
    setComment(""); // Clear the input field after submitting
  };

  return (
    <form className="CommentInputForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={handleChange}
      />
      <button className="Button" type="submit">Post</button>
    </form>
  );
};

export default CommentInputField;
