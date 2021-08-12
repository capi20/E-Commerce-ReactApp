import axios from "axios";

const instance = axios.create({
    baseURL: 'Firebase Database URL'
})

export default instance