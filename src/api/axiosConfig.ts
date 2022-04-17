import axios from 'axios';
import { Token } from '../Token';
import { refreshToken } from './refreshToken';

// axios.defaults.baseURL = ''; // will be as proxy
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.validateStatus = function (status) { // for the next handling errors
    return status >= 200 && status < 500;
}

axios.interceptors.request.use(async (request) => {

    const token = Token.getInstance();
    
    if (request?.headers && token?.content) {

        if(!token.hasTokenExpired) {
            request.headers.Authorization = `Bearer ${Token.getInstance().content}`
        }
        else {
            try {
                const { data } = await refreshToken();

                if(data && data?.token) {
                    token.content = data.token;
                } 
            }
            catch(error) {
                throw Error(String(error));
            }
           
        }
    }

    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    
    if(response.data.error) {
        throw { 
            error: response.data.error, 
            validateErrors: response.data?.data 
        };
    }

    return response?.data; // response?.data;
}, error => {
    return Promise.reject(error);
});
