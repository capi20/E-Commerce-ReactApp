import axios from "axios";

const instance = axios.create({
    baseURL: 'https://e-commerce-app-f4775-default-rtdb.firebaseio.com/'
})

export default instance