import React from 'react'
import { Mark } from '../../../UI/Mark/Mark'
import { ApplicationSubmissionState, ApplicationSubmissionStateEnum } from '../../Types/ApplicationSubmission'

interface ApplicationStateMarkProps {
  state?: ApplicationSubmissionState
}

export const ApplicationStateMark = (props: ApplicationStateMarkProps) => {

  const { state } = props || {};

  switch (state?.id) {
    case ApplicationSubmissionStateEnum.Draft:
      return <Mark text={state.name} variant="gray" />

    case ApplicationSubmissionStateEnum.Checked:
      return <Mark text={state.name} variant="blue" />

    case ApplicationSubmissionStateEnum.Accepted:
      return <Mark text={state.name} variant="green" />

    case ApplicationSubmissionStateEnum.Modification:
      return <Mark text={state.name} variant="lightGray" />

    case ApplicationSubmissionStateEnum.Rejected:
      return <Mark text={state.name} variant="red" />
    default:
      return <Mark text="Неизвестное состояние" variant="gray" />
  }
}
