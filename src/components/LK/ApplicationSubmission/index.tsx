import { OtherHouses } from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useLKStores } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import { TextField } from '../../../UI/TextField/TextField';
import { BackBtn } from '../BackButton';
import { ApplicationGroup } from './ApplicationGroup';
import classes from './ApplicationSubmission.module.scss';
import { useApplicationSubmission } from './useApplicationSubmission';

export const ApplicationSubmission = observer(() => {

  const navigate = useNavigate();
  const { startFetch, isLoading } = useFetch({ withToast: false });
  const { id, applicationSubmissionId } = useParams();
  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications, getApplicationSubmissionById }, applicationSubmissionStore } = useLKStores();
  const { name, applicationGroups } = applicationSubmissionStore?.application || {};
  const applicationSubmission = applicationSubmissionStore?.applicationSubmission;
  const { formik, tab, setTab } = useApplicationSubmission();

  const _getApplicationById = async () => {
    const { data, error } = await startFetch(() => getApplicationById(Number(id)));

    if (error) {
      navigate('/my-applications');
    }
    else {
      applicationSubmissionStore.application = data;
    }
  }

  const _getApplicationSubmissionById = async () => {
    const { data, error } = await startFetch(() => getApplicationSubmissionById(Number(applicationSubmissionId)));

    if (error) {
      navigate('/my-applications');
    }
    else {
      applicationSubmissionStore.applicationSubmission = data;
    }
  }

  useEffect(() => {
    _getApplicationById();
    _getApplicationSubmissionById();
  }, [])

  return (
    <WithLoader isLoading={isLoading}>
      <div className={classes.root}>
        <h1 className={classes.header}>{name}, заявка № {applicationSubmissionId}</h1>
        <Divider />

        <div className={classes.headerBtnGroup}>
          <BackBtn disabled={isLoading} />

          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Отправить на проверку
          </Button>

          <Button
            variant="outlined"
            color="primary"
            disabled={isLoading}
            onClick={formik.submitForm}
          >
            Сохранить
          </Button>
        </div>
        <Divider />

        <div className={classes.body}>
          <div className={classes.serviceFields}>
            <TextField
              label="Наименование заявки"
              value={formik.values.name}
              name={"name"}
              onChange={formik.handleChange}
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
                      <ApplicationGroup applicationGroup={it} formik={formik} />
                    </TabPanel>
                  )
                })
              }
            </TabContext>
          </div>
        </div>

      </div>
    </WithLoader>
  )
})
