import { observer } from 'mobx-react';
import React, { FC, ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useRootStore } from '../../store/RootStore';
import { TypeAuth } from '../../store/_types/TypeAuth';

export const authPageHof = (Component: React.ComponentType) => {
    return observer(() => {
        const { authStore: { typeAuth } } = useRootStore();
        const navigate = useNavigate();

        useEffect(() => {

            if (typeAuth === TypeAuth.NoAuth) {
                navigate("/auth/login");
            }

        }, [typeAuth])

        return <Component />
    })
}