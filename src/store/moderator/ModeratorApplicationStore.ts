import axios from "axios";
import { configure, makeAutoObservable, runInAction } from "mobx";
import React from "react";
import { Application } from "../../components/LK/types/Application";
import { ApplicationSubmissionState, ApplicationSubmissionStateEnum, ApplicationSubmissionType } from "../../components/Types/ApplicationSubmission";
import { ManageApplicationSubmission } from "../../components/Types/ManageApplicationSubmission";
import { PagedItems } from "../../Models/PagedItems";
import { HistorySubmission } from "../_types/HistorySubmission";
import queryString from 'query-string';
import { ApplicationFilterOptions } from "../../components/common/ApplicationFilter/useApplicationFilter";

export class ModeratorApplicationStore {

  pagedApplications?: PagedItems<Application>;
  pagedSubmissionApplications?: PagedItems<ApplicationSubmissionType>;
  applicationStates?: ApplicationSubmissionState[];
  historySubmissions?: PagedItems<HistorySubmission>;

  constructor() {
    makeAutoObservable(this);
  }

  getApplications = async (page = 1, pageSize = 15) => {
    const { data } = await axios.get(`/api/moderator/application/${page}/${pageSize}`);

    if (data) {
      runInAction(() => {
        this.pagedApplications = data;
      })
    }
    else {
      runInAction(() => {
        this.pagedApplications = undefined;
      })
    }

    return data;
  }

  getApplicationById = (id: number) => {
    return axios.get(`/api/moderator/application/${id}`);
  }

  getApplicationSubmissions = async (applicationId: number, page = 1, pageSize = 15, applicationFilterState: Partial<ApplicationFilterOptions> | undefined = undefined) => {
    try {
      let url;

      if (applicationFilterState) {
        const query = queryString.stringify(applicationFilterState);
        url = `/api/moderator/application-submission/${applicationId}/${page}/${pageSize}?${query}`
      }
      else {
        url = `/api/moderator/application-submission/${applicationId}/${page}/${pageSize}`;
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

  getApplicationStates = async () => {
    try {
      const { data } = await axios.get(`/api/moderator/application/states`);

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

  getApplicationSubmissionById = (id: number) => {
    return axios.get(`/api/moderator/application-submission/${id}`);
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

  setApplicationSubmissionState = (id: number, manageApplicationSubmission: ManageApplicationSubmission) => {
    const formData = new FormData();
    formData.append('comment', manageApplicationSubmission.comment || '');

    return axios.patch(`/api/moderator/application-submission/state/${id}/${manageApplicationSubmission.applicationState?.id}`, formData);
  }
}
