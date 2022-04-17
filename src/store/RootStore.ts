import React, { useEffect } from "react";
import { AdminRootStore } from "./admin/AdminRootStore";
import { AuthStore } from "./AuthStore";
import { LKRootStore } from "./lk/LKRootStore";
import { TypeAuth } from "./_types/TypeAuth";

export class RootStore {

    private _lkStore: LKRootStore;
    private _adminStore: AdminRootStore;
    private _authStore : AuthStore;

    constructor() {
        this._authStore = new AuthStore(this);
        this._adminStore = new AdminRootStore();
        this._lkStore = new LKRootStore();    
    }

    set authStore (authStore: AuthStore) {
        this._authStore = authStore;
    }

    get authStore () {
        return this._authStore;
    }

    set adminStore(adminStore: AdminRootStore) {
        this._adminStore = adminStore;
    }

    get adminStore() {
        return this._adminStore;
    }

    set lkStore(lkStore: LKRootStore) {
        this._lkStore = lkStore;
    }

    get lkStore() {
        return this._lkStore;
    }
}

export const rootStore = new RootStore();
export const StoresContext = React.createContext(rootStore);

export const useRootStore = () => {
    return React.useContext<RootStore>(StoresContext);
}

export const useLKStores = () => {
    const rootStore = useRootStore();
    return rootStore.lkStore;
}

export const useAdminStores = () => {
    const rootStore = useRootStore();
    return rootStore.adminStore;
}
