import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:3002", //process.env.REACT_APP_API_URL,
});
export default instance;