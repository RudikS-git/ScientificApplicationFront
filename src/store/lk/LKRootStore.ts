import { configure }                from "mobx";
import React from "react";
import { StoresContext, useRootStore } from "../RootStore";
import { ApplicationStore } from "./ApplicationStore";

export class LKRootStore {

    applicationStore: ApplicationStore

    constructor() {
        this.applicationStore = new ApplicationStore(this);
    }
}
