import { makeAutoObservable } from "mobx";
import { ApplicationSubmissionType } from "../../../Types/ApplicationSubmission";
import { Application } from "../../types/Application";

export class ApplicationSubmissionStore {
  _application?: Application;
  _applicationSubmission?: ApplicationSubmissionType;

  constructor() {
    makeAutoObservable(this);
  }

  get application(): Application | undefined {
    return this._application;
  }

  set application(application: Application | undefined) {
    this._application = application;
  }

  get applicationSubmission(): ApplicationSubmissionType | undefined {
    return this._applicationSubmission;
  }

  set applicationSubmission(application: ApplicationSubmissionType | undefined) {
    this._applicationSubmission = application;
  }
}