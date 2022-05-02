import axios from "axios";
import { configure, runInAction } from "mobx";
import React from "react";
import { Application, ManageApplicationStates } from "../../components/Admin/Types/Application";
import { InputModel } from "./models/InputModel";
import { PagedItems } from "../../Models/PagedItems";
import { rootStore } from "../RootStore";

export class AdminApplicationStore {

    pagedApplications?: PagedItems<Application>;

    constructor() {
        // do nothing
    }

    getApplications = async (page = 1, pageSize = 15) => {
        const { data } = await axios.get(`/api/admin/application/${page}/${pageSize}`);

        runInAction(() => {
            this.pagedApplications = data;
        })

        return data;
    }

    setManageApplicationState = async (id: number, state: ManageApplicationStates) => {
        return axios.patch(`/api/admin/application/${id}/state/${state}`);
    }

    getApplicationById = (id: number) => {
        return axios.get(`/api/admin/application/${id}`);
    }

    deleteApplicationById = (id: number) => {
        return axios.delete(`/api/admin/application/${id}`);
    }

    createApplication = async (createApplicationModel: Omit<Application, 'manageApplicationState'>) => {
        return axios.post(`/api/admin/application`, createApplicationModel);
    }

    updateApplication = async (createApplicationModel: Omit<Application, 'manageApplicationState'>) => {
        return axios.put(`/api/admin/application/${createApplicationModel.id}`, createApplicationModel);
    }

    createInput = async (inputModel: Partial<InputModel>) => {
        return axios.post(`/api/admin/input-field`, inputModel);
    }

    updateInput = async (inputModel: Partial<InputModel>) => {
        return axios.put(`/api/admin/input-field`, inputModel);
    }

    deleteInput = async (inputId: number) => {
        return axios.delete(`/api/admin/input-field/${inputId}`);
    }
}
