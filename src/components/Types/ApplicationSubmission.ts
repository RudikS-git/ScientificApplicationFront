export interface ApplicationSubmissionType {
  id: number,
  name: string,
  created: Date,
  applicationState: ApplicationSubmissionState,
  inputSubmissions: InputSubmission[]
}

export interface ApplicationSubmissionState {
  id: ApplicationSubmissionStateEnum,
  name: string
}

export enum ApplicationSubmissionStateEnum {
  Draft = 1,
  Checked,
  Rejected,
  Modification,
  Accepted
}

export interface InputSubmission {
  id: number,
  inputFieldId: number,
  value: string | number | undefined
}