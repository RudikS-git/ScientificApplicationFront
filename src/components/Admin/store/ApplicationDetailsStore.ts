import { makeAutoObservable } from "mobx";
import { UseModalResponse } from "../../../hooks/useModal";
import { Application } from "../Types/Application";
import { VariantInputTypes } from "../../Types/inputVariantTypes";

export class ApplicationDetailsStore {

  _application?: Application;
  _inputToolModal?: UseModalResponse;
  _inputModalData?: VariantInputTypes;

  constructor() {
    makeAutoObservable(this);
  }

  get application(): Application | undefined {
    return this._application;
  }

  set application(application: Application | undefined) {
    this._application = application;
  }

  get inputToolModal(): UseModalResponse | undefined {
    return this._inputToolModal;
  }

  set inputToolModal(modalResponse: UseModalResponse | undefined) {
    this._inputToolModal = modalResponse;
  }

  get inputModalData(): VariantInputTypes | undefined {
    return this._inputModalData;
  }

  set inputModalData(modalData: VariantInputTypes | undefined) {
    this._inputModalData = modalData;
  }
}
