import { makeAutoObservable } from "mobx";
import { Application } from "../Types/Application";

export class ApplicationDetailsStore {

  _application?: Application;

  constructor() {
    makeAutoObservable(this);
  }

  get application(): Application | undefined {
    return this._application;
  }

  set application(application: Application | undefined) {
    this._application = application;
  }
}