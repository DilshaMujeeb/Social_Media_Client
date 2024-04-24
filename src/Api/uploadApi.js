import axios from "axios";

const API = axios.create({ baseURL: "https://reelking-server.onrender.com" });
// export const uploadImage = (data) => API.post("/upload", data);
export const uploadImage = (data, cloud_name) =>
  API.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data);

export const uploadPost = (data) => API.post(`/post/`,data);