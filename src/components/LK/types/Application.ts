import { VariantInputTypes } from "../../Types/inputVariantTypes"

export interface Application {
  id: number,
  name?: string,
  description?: string
  applicationGroups?: ApplicationGroupType[],
}

export interface ApplicationGroupType {
  id: number,
  name?: string,
  inputFields?: VariantInputTypes[],
}
