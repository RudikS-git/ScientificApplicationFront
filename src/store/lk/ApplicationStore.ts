import axios from "axios";
import { configure, runInAction } from "mobx";
import React from "react";
import { Application } from "../../components/LK/types/Application";
import { PagedItems } from "../../Models/PagedItems";
import { rootStore } from "../RootStore";
import { LKRootStore } from "./LKRootStore";

export class ApplicationStore {

    lkRootStore: LKRootStore;
    pagedApplications?: PagedItems<Application>;

    constructor(lkRootStore: LKRootStore) {
        this.lkRootStore = lkRootStore;
    }

    getApplications = async (page = 1, pageSize = 15) => {
        const { data } = await axios.get(`/api/application/${page}/${pageSize}`);

        runInAction(() => {
            this.pagedApplications = data;
        })

        return data;
    }

    getApplicationById = (id: number) => {
        return axios.get(`/api/application/${id}`);
    }
}
