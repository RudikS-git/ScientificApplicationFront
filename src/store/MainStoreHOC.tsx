import { observer } from 'mobx-react';
import React, { FC, ReactElement, ReactNode, useContext, useEffect } from 'react'
import { rootStore, StoresContext, useRootStore } from './RootStore';
import { TypeAuth } from './_types/TypeAuth';

const _MainStoreHOC: FC = ({ children }) => {

    const { authStore: { typeAuth }, lkStore } = useRootStore();

    return (
        <StoresContext.Provider value={rootStore}>
            {children}
        </StoresContext.Provider>
    )
}

const MainStoreHOC = observer(_MainStoreHOC);

export { MainStoreHOC }