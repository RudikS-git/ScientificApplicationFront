import { InputVariant } from "../../Types/Input"
import { VariantInputTypes } from "../../Types/inputVariantTypes"

export interface Application {
    id?: number,
    name?: string,
    description?: string
    created?: Date,
    updated?: Date,
    applicationGroups?: ApplicationGroup[],
    manageApplicationState: ManageApplicationStates
}

export enum ManageApplicationStates {
    Draft = 1,
    Published
}

export interface ApplicationGroup {
    id?: number,
    name?: string,
    inputFields?: VariantInputTypes[],
    selectFields?: AAdminSelect[],
    fieldSets?: AAdminFieldSet[]
}

export interface AAdminSelect {
    label: string
}

export interface AAdminFieldSet {
    label: string
}