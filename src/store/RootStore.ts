import { CommonDictionary } from "./CommonDictionary";
import React, { useEffect } from "react";
import { AdminRootStore } from "./admin/AdminRootStore";
import { AuthStore } from "./AuthStore";
import { LKRootStore } from "./lk/LKRootStore";
import { TypeAuth } from "./_types/TypeAuth";
import { ModeratorRootStore } from "./moderator/ModeratorRootStore";

export class RootStore {

    private _lkStore: LKRootStore;
    private _adminStore: AdminRootStore;
    private _moderatorStore: ModeratorRootStore;
    private _authStore: AuthStore;
    private _commonDictionary: CommonDictionary;

    constructor() {
        this._authStore = new AuthStore(this);
        this._adminStore = new AdminRootStore();
        this._lkStore = new LKRootStore();
        this._commonDictionary = new CommonDictionary();
        this._moderatorStore = new ModeratorRootStore();
    }

    set authStore(authStore: AuthStore) {
        this._authStore = authStore;
    }

    get authStore() {
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
    set commonDictionary(commonDictionary: CommonDictionary) {
        this._commonDictionary = commonDictionary;
    }

    get commonDictionary() {
        return this._commonDictionary;
    }

    get moderatorStore() {
        return this._moderatorStore;
    }
    set moderatorStore(moderatorStore: ModeratorRootStore) {
        this._moderatorStore = moderatorStore;
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

export const useModeratorStores = () => {
    const rootStore = useRootStore();
    return rootStore.moderatorStore;
}
