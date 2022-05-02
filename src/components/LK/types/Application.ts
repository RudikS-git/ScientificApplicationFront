import { VariantInputTypes } from "../../Types/inputVariantTypes"

export interface Application {
  id?: number,
  name?: string,
  description?: string
  applicationGroups?: ApplicationGroup[],
}

export interface ApplicationGroup {
  id?: number,
  name?: string,
  inputFields?: VariantInputTypes[],
}
