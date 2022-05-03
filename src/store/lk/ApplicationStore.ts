import axios from "axios";
import { configure, runInAction } from "mobx";
import React from "react";
import { Application } from "../../components/LK/types/Application";
import { ApplicationSubmissionType } from "../../components/Types/ApplicationSubmission";
import { PagedItems } from "../../Models/PagedItems";
import { rootStore } from "../RootStore";
import { LKRootStore } from "./LKRootStore";

export class ApplicationStore {

    lkRootStore: LKRootStore;
    pagedApplications?: PagedItems<Application>;
    pagedSubmissionApplications?: PagedItems<ApplicationSubmissionType>

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

    getApplicationSubmissions = async (applicationId: number, page = 1, pageSize = 15) => {
        try {
            const { data } = await axios.get(`/api/application-submission/${applicationId}/${page}/${pageSize}`);

            runInAction(() => {
                this.pagedSubmissionApplications = data;
            })

            return data;
        }
        catch (e: unknown) {

            runInAction(() => {
                this.pagedSubmissionApplications = undefined;
            })

            throw e;
        }
    }

    getApplicationSubmissionById = (id: number) => {
        return axios.get(`/api/application-submission/${id}`);
    }

    createApplicationSubmission = (applicationSubmission: any) => {
        return axios.post(`/api/application-submission`, { applicationSubmission: applicationSubmission });
    }

    updateApplicationSubmission = (applicationSubmission: any) => {
        return axios.put(`/api/application-submission`, applicationSubmission);
    }

    deleteApplicationSubmission = (id: number) => {
        return axios.delete(`/api/application-submission/${id}`);
    }

}
