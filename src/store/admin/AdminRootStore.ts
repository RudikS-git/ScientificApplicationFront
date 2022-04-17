import { configure }                from "mobx";
import React from "react";
import { rootStore, useRootStore } from "../RootStore";
import { AdminApplicationStore } from "./AdminApplicationStore";

export class AdminRootStore {
    
    applicationStore: AdminApplicationStore

    constructor() {
        this.applicationStore = new AdminApplicationStore();
    }
}
