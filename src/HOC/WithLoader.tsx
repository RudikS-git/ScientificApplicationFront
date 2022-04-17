import React, { FC } from 'react'
import Loader from '../UI/Loader/Loader'

interface WithLoaderProps {
    isLoading: boolean
}

export const WithLoader : FC<WithLoaderProps> = ({ children, isLoading }) => {

    if(isLoading) {
        return <Loader />
    }

    return (
        <>{children}</>
    )
}
