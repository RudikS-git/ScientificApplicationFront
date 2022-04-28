import axios from "axios";
import { configure, runInAction } from "mobx";
import React from "react";
import { Application } from "../../components/Admin/Types/Application";
import { InputModel } from "./models/InputModel";
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

    createInput = async (inputModel: Partial<InputModel>) => {
        return axios.post(`/api/input-field`, inputModel);
    }

    updateInput = async (inputModel: Partial<InputModel>) => {
        return axios.put(`/api/input-field`, inputModel);
    }

    deleteInput = async (inputId: number) => {
        return axios.delete(`/api/input-field/${inputId}`);
    }
}
