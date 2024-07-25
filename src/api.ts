import axios from "axios";

// Creating an axios instance
const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export default api;
