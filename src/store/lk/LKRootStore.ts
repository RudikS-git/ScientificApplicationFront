import { configure } from "mobx";
import React from "react";
import { ApplicationSubmissionStore } from "../../components/Moderator/_store/ApplicationSubmissionStore";
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
