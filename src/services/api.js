import axios from 'axios';

const api = axios.create({
    baseURL: 'https://athon-tech-ps.herokuapp.com',

});

export default api;