import { InputVariant } from "./Input"
import { VariantInputTypes } from "./inputVariantTypes"

export interface Application {
    id?: number,
    name?: string,
    description?: string
    created?: Date,
    updated?: Date,
    applicationGroups?: ApplicationGroup[]
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