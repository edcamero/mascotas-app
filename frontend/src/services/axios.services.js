import axios from 'axios';
import TokenService from "./token.service";

axios.interceptors.request.use(function(config) {
    const auth_token = TokenService.getLocalAccessToken()
    if(auth_token) {
      config.headers.Authorization = `Bearer ${auth_token}`;
    }
    return config;
}, function(err) {
    return Promise.reject(err);
});

export default axios