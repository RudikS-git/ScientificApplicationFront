import { configure } from "mobx";
import React from "react";
import { ApplicationSubmissionStore } from "../../components/LK/ApplicationSubmissions/_store/ApplicationStore";
import { StoresContext, useRootStore } from "../RootStore";
import { ModeratorApplicationStore } from "./ModeratorApplicationStore";

export class ModeratorRootStore {

  applicationStore: ModeratorApplicationStore
  applicationSubmissionStore: ApplicationSubmissionStore;

  constructor() {
    this.applicationStore = new ModeratorApplicationStore();
    this.applicationSubmissionStore = new ApplicationSubmissionStore();
  }
}
