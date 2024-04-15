import React, { useEffect, useState } from "react";
import { fetchComments } from "../../Api/CommentRequest";
import { getUser } from "../../Api/userRequest"; // Import the API function to fetch user data
import "./CommentDisplay.css";

const CommentsDisplay = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        // Call the API function to fetch comments for the given postId
        const response = await fetchComments(postId);
        console.log(response.data.comments[0].userId, "resfwf");

        // Fetch user data for each comment's userId
        const commentsWithUsernames = await Promise.all(
          response.data.comments.map(async (comment) => {
            const userData = await getUser(comment.userId);
            return {
              ...comment,
              username: userData.data.firstname, // Assuming the username is stored in the user data object
            };
          })
        );

        setComments(commentsWithUsernames); // Update the state with the fetched comments
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComment(); // Call the fetchComments function when the component mounts
  }, [postId]); // Make sure to include postId in the dependency array

  // Other code for handling new comment submission

  return (
    <div className="CommentsDisplay">
      {/* Display existing comments */}
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          {/* Display the username along with the comment content */}
          <span style={{}} className="username">
            <b>
              {comment.username}:
            </b>{" "}
          </span>
          <span className="content">{comment.content}</span>
        </div>
      ))}

      {/* Input field to add new comment */}
      {/* Include your comment input field component here */}
    </div>
  );
};

export default CommentsDisplay;
