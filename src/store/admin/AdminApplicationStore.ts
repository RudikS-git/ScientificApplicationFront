import axios from "axios";
import { configure, runInAction }                from "mobx";
import React from "react";
import { Application } from "../../components/Admin/Models/Application";
import { PagedItems } from "../../Models/PagedItems";
import { rootStore } from "../RootStore";

export class AdminApplicationStore {

    pagedApplications?: PagedItems<any>;

    constructor() {
       // do nothing
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

    deleteApplicationById = (id: number) => {
        return axios.delete(`/api/application/${id}`);
    }

    createApplication = async (createApplicationModel: Application) => {
        return axios.post(`/api/application`, createApplicationModel);
    }

    updateApplication = async (createApplicationModel: Application) => {
        return axios.put(`/api/application/${createApplicationModel.id}`, createApplicationModel);
    }
}
