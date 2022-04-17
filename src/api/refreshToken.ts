import axios from "axios";
import dayjs from "dayjs";

let refreshTokenPromise: Promise<any> | undefined = undefined; // чтобы избежать гонки запросов

export const refreshToken = async () => {
    //try {

        if(!refreshTokenPromise) {      
            refreshTokenPromise = axios.post('/api/user/refresh-token', null, {
                headers: {
                    
                }
            });
        } 
    
        const res = await refreshTokenPromise;
  
        return res;
    // } 
    // catch (err) {
    //     throw err;
    // }
}  