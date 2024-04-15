import axios from "axios";

const API = axios.create({ baseURL: "https://reelking-server.onrender.com" });


export const userChats = (id) => API.get(`/chat/${id}`)

export const createNewChat = (userId, friendId)=>API.post(`/chat/`,{senderId:userId,recieverId:friendId})