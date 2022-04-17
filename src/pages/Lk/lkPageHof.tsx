import { observer } from 'mobx-react';
import React, { FC, ReactElement } from 'react'
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useRootStore } from '../../store/RootStore';
import { TypeAuth } from '../../store/_types/TypeAuth';

export const lkPageHof = (Component : React.ComponentType) => {
    return observer(() => {
        const { authStore: { typeAuth }} = useRootStore();

        if(typeAuth === TypeAuth.Loading || typeAuth === TypeAuth.NoAuth) {
            return <Navigate to="/auth/login" />
        }

        return <Component />
    })
}