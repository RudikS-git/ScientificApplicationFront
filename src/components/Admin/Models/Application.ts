export interface Application {
    id: number,
    name: string,
    description?: string
    created?: Date,
    updated?: Date,
    applicationGroups?: ApplicationGroup[]
}

export interface ApplicationGroup {
    id: number,
    name: string,
    selectFields?: AAdminSelect[],
    fields?: AAdminField[],
    fieldSets?: AAdminFieldSet[]
}

export interface AAdminSelect {
    label: string
}

export interface AAdminField {
    label: string
}

export interface AAdminFieldSet {
    label: string
}