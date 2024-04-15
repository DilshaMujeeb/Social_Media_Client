import axios from "axios";

const API = axios.create({ baseURL: "https://reelking-server.onrender.com" });
export const createComment = (postId, comment, userId) =>
    API.post(`/comment/${postId}`, { content: comment, userId: userId, postId: postId });
  
    export const fetchComments= (postId)=>API.get(`/comment/${postId}`)