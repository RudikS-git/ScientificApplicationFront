import axios from "axios";
import { configure }                from "mobx";
import React from "react";
import { rootStore } from "../RootStore";
import { LKRootStore } from "./LKRootStore";

export class ApplicationStore {

    lkRootStore: LKRootStore;

    constructor(lkRootStore: LKRootStore) {
        this.lkRootStore = lkRootStore;
    }

    getApplications = async (page = 1, pageSize = 15) => {
        const { data } = await axios.get(`/api/application-submission/${page}/${pageSize}`);

        console.log(data)
    }
}
