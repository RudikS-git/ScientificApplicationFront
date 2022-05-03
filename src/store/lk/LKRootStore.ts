import { configure } from "mobx";
import React from "react";
import { ApplicationSubmissionStore } from "../../components/LK/ApplicationSubmissions/_store/ApplicationStore";
import { StoresContext, useRootStore } from "../RootStore";
import { ApplicationStore } from "./ApplicationStore";

export class LKRootStore {

    applicationStore: ApplicationStore
    applicationSubmissionStore: ApplicationSubmissionStore;

    constructor() {
        this.applicationStore = new ApplicationStore(this);
        this.applicationSubmissionStore = new ApplicationSubmissionStore();
    }
}
