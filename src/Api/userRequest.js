import axios from "axios";

const API = axios.create({ baseURL: "https://reelking-server.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getUser = (userId) => API.get(`/user/${userId}`)

export const updateUser = (id, formData) => API.put(`/user/${id}`, { _id: id, formData: formData })

export const getAllusers = () => API.get(`/user`)

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data)

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);

export const getFollowersList = (id) => API.get(`/user/${id}/getFollower`);

export const getFollowingList = (id) => API.get(`/user/${id}/getFollowing`);