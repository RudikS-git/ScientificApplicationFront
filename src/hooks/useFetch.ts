import React, { useEffect, useState } from 'react'
import axios, { AxiosPromise, AxiosResponse, CancelTokenSource } from 'axios';
import { ValidateErrorModel } from '../api/_types/ValidateErrorModel';
import { toast } from 'react-toastify';

interface UseFetchProps {
    withToast: boolean
}

export const useFetch = (props?: Partial<UseFetchProps>) => {

    const { withToast = true } = props || {};

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [response, setResponse] = useState<AxiosResponse<any, any>>();
    const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource>();

    const fetchData = async (fetch: () => AxiosPromise<any> | Promise<any>) => {
        setIsLoading(true);
        setCancelTokenSource(axios.CancelToken.source());

        try {
            const result = await fetch();
            console.log(result)
            setResponse(result.data);

            return result;
        }
        catch(e: any) {

            if(withToast) {
                if(e?.error?.message && withToast) {
                    toast(e.error.message, { type: 'error' });
                }
                else {
                    toast("Произошла неизвестная ошибка. Попробуйте выполнить действие позже.", { type: 'error' });
                }
            }

            setError(e);
            return e;
        }
        finally {
            setIsLoading(false);
            setCancelTokenSource(undefined);
        }
    };

    useEffect(() => {

        return () => cancelTokenSource?.cancel();

    }, []);

    return {
        response,
        isLoading,
        error,
        startFetch: fetchData,
        stopFetch: () => cancelTokenSource?.cancel()
    }
}
