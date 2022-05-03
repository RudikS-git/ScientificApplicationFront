export interface ApplicationSubmissionType {
  id: number,
  name: string,
  created: Date,
  applicationState: ApplicationSubmissionState,
  inputSubmissions: InputSubmission[]
}

export interface ApplicationSubmissionState {
  id: number,
  name: string
}

export interface InputSubmission {
  id: number,
  inputFieldId: number,
  value: string | number | undefined
}