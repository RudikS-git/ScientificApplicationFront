import React from 'react'
import { ApplicationSubmissionState } from '../../Types/ApplicationSubmission';
import { ApplicationStateMark } from '../ApplicationStateMark'
import { PageHeader } from '../PageHeader'
import classes from './ApplicationSubmissionHeader.module.scss';

interface ApplicationSubmissionPageHeaderProps {
  applicationState?: ApplicationSubmissionState,
}

export const ApplicationSubmissionPageHeader: React.FC<ApplicationSubmissionPageHeaderProps> = ({ applicationState, children }) => {
  return (
    <PageHeader>
      <div className={classes.appHeader}>

        <div className={classes.appState}>
          <ApplicationStateMark state={applicationState} />
        </div>
        {children}
      </div>
    </PageHeader>
  )
}
