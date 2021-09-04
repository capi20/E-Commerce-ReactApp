import axios from "axios";

const instance = axios.create({
    baseURL: 'PASTE YOUR FIREBASE DB API'
})

export default instance