import { configure } from "mobx";
import React from "react";
import { rootStore, useRootStore } from "../RootStore";
import { AdminApplicationStore } from "./AdminApplicationStore";
import { ApplicationDetailsStore } from "../../components/Admin/store/ApplicationDetailsStore";

export class AdminRootStore {

    applicationStore: AdminApplicationStore
    applicationDetails: ApplicationDetailsStore;

    constructor() {
        this.applicationStore = new AdminApplicationStore();
        this.applicationDetails = new ApplicationDetailsStore();
    }
}
