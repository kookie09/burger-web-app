import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-2020.firebaseio.com/"
});

export default instance;