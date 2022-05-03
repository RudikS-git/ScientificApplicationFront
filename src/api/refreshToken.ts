import axios from "axios";
import dayjs from "dayjs";

let refreshTokenPromise: Promise<any> | undefined = undefined; // чтобы избежать гонки запросов

export const refreshToken = async () => {

    if (!refreshTokenPromise) {
        refreshTokenPromise = axios.post('/api/user/refresh-token', null, {
            headers: {

            }
        });
    }

    const res = await refreshTokenPromise;
    refreshTokenPromise = undefined;

    return res;
}  