import { TabContext, TabPanel } from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { TextField } from '../../../UI/TextField/TextField'
import { ApplicationSubmissionType } from '../../Types/ApplicationSubmission';
import { ApplicationGroupType } from '../../LK/types/Application';
import { ApplicationGroup } from '../ApplicationGroup';
import classes from './ApplicationSubmissionForm.module.scss';
import { FormikProps } from 'formik';

interface ApplicationSubmissionFormProps {
  formik: FormikProps<Omit<ApplicationSubmissionType, 'id' | 'applicationId' | 'created' | 'applicationState'>>,
  applicationGroups?: ApplicationGroupType[],
  isReady?: boolean
}

export const ApplicationSubmissionForm = (props: ApplicationSubmissionFormProps) => {

  const [tab, setTab] = useState<string>('0');
  const { formik, isReady, applicationGroups } = props || {};

  return (
    <div className={classes.body}>
      <div className={classes.serviceFields}>
        <TextField
          label="Наименование заявки"
          value={formik.values.name}
          name={"name"}
          onChange={formik.handleChange}
          disabled={isReady}
        />
      </div>

      <Box className={classes.tabs}>
        <Tabs
          value={tab}
          onChange={(event: React.SyntheticEvent, newValue: string) => setTab(newValue)}
          aria-label="groups"
        >
          {
            applicationGroups?.map((it, index) => {
              return (
                <Tab
                  key={it.id}
                  value={index.toString()}
                  label={it.name}
                />
              )
            })
          }
        </Tabs>
      </Box>

      <div className={classes.content}>
        <TabContext value={tab.toString()}>

          {
            applicationGroups?.map((it, index) => {
              return (
                <TabPanel key={it.id} value={index.toString()}>
                  <ApplicationGroup applicationGroup={it} formik={formik} isReady={isReady} />
                </TabPanel>
              )
            })
          }
        </TabContext>
      </div>
    </div>
  )
}
