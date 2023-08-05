import axios from "axios";
import { baseUrl } from "./constants";

const instance = axios.create ({
    baseURL: baseUrl,
    // timeout: 1000,
    withCredentials:true
})

export default instance