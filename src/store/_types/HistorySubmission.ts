import { ApplicationSubmissionState } from "../../components/Types/ApplicationSubmission";

export interface HistorySubmission {
  id: number,
  created: Date,
  lastApplicationState: ApplicationSubmissionState,
  newApplicationState: ApplicationSubmissionState,
  comment?: string
}