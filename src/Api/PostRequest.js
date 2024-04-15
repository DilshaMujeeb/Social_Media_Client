import axios from "axios";

const API = axios.create({ baseURL: "https://reelking-server.onrender.com" });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);

export const likePost = (id, userId) => API.put(`/post/${id}/like`, { userId: userId })

export const getAllPost = ()=>API.get(`/post/posts`)