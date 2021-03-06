import axios from "axios";
import { configure, runInAction } from "mobx";
import React from "react";
import { ApplicationFilterOptions } from "../../components/common/ApplicationFilter/useApplicationFilter";
import { Application } from "../../components/LK/types/Application";
import { ApplicationSubmissionState, ApplicationSubmissionType } from "../../components/Types/ApplicationSubmission";
import { PagedItems } from "../../Models/PagedItems";
import { rootStore } from "../RootStore";
import { HistorySubmission } from "../_types/HistorySubmission";
import { LKRootStore } from "./LKRootStore";
import queryString from 'query-string';

export class ApplicationStore {

    lkRootStore: LKRootStore;
    pagedApplications?: PagedItems<Application>;
    pagedSubmissionApplications?: PagedItems<ApplicationSubmissionType>
    historySubmissions?: PagedItems<HistorySubmission>
    applicationStates?: ApplicationSubmissionState[];

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

    getApplicationSubmissions = async (applicationId: number, page = 1, pageSize = 15, applicationFilterState: Partial<ApplicationFilterOptions> | undefined = undefined) => {
        try {
            let url;

            if (applicationFilterState) {
                const query = queryString.stringify(applicationFilterState);
                url = `/api/application-submission/${applicationId}/${page}/${pageSize}?${query}`
            }
            else {
                url = `/api/application-submission/${applicationId}/${page}/${pageSize}`;
            }

            const { data } = await axios.get(url);

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

    sendApplicationForVerification = (id: number) => {
        return axios.patch(`/api/application-submission/send/${id}`);
    }

    gitHistorySubmissions = async (aplicationSubmissionId: number, page = 1, pageSize = 15) => {
        try {
            const { data } = await axios.get(`/api/history-submission/${aplicationSubmissionId}/${page}/${pageSize}`);

            runInAction(() => {
                this.historySubmissions = data;
            })

            return data;
        }
        catch (e: unknown) {

            runInAction(() => {
                this.historySubmissions = undefined;
            })

            throw e;
        }
    }

    getApplicationStates = async () => {
        try {
            const { data } = await axios.get(`/api/application/states`);

            runInAction(() => {
                this.applicationStates = data;
            })

            return data;
        }
        catch (e: unknown) {

            runInAction(() => {
                this.applicationStates = undefined;
            })

            throw e;
        }
    }
}
