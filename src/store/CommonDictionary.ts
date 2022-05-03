import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { Token } from "../Token";
import { LKRootStore } from "./lk/LKRootStore";
import { RootStore } from "./RootStore";
import { FieldType } from "./_types/FieldType";
import { LoginModel } from "./_types/LoginModel";
import { TypeAuth } from "./_types/TypeAuth";

export class CommonDictionary {

  fieldTypes?: FieldType[];

  constructor() {
    makeAutoObservable(this);
  }

  initStore = () => {
    runInAction(() => {
      this.fieldTypes = undefined;
    })
  }

  getFieldTypes = async () => {
    const { data } = await axios.get('/api/field/types');

    runInAction(() => {
      this.fieldTypes = data.fieldTypes
    })
  }
}
