import { observer } from 'mobx-react';
import React, { FC, ReactElement, ReactNode, useContext, useEffect } from 'react'
import { rootStore, StoresContext, useRootStore } from './RootStore';
import { TypeAuth } from './_types/TypeAuth';

export const MainStoreHOC : FC = observer(({ children }) => {

    const { authStore: { typeAuth }, lkStore } = useRootStore();
    
    if(typeAuth == TypeAuth.Auth) { // lk

    }
    // else {
    //     context = createLkContext();
    // }

    return (
        <StoresContext.Provider value={rootStore}>
            { children }
        </StoresContext.Provider>
    )
})
