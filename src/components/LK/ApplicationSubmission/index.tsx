import { OtherHouses } from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useLKStores } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import { TextField } from '../../../UI/TextField/TextField';
import { ApplicationSubmissionStateEnum } from '../../Types/ApplicationSubmission';
import { BackBtn } from '../../common/BackButton';
import { ApplicationGroup } from '../../common/ApplicationGroup';
import classes from './ApplicationSubmission.module.scss';
import { useApplicationSubmission } from './useApplicationSubmission';
import { PageHeader } from '../../common/PageHeader';
import { ApplicationSubmissionForm } from '../../common/ApplicationSubmissionForm/ApplicationSubmissionForm';
import { ApplicationSubmissionPageHeader } from '../../common/ApplicationSubmissionPageHeader';

export const ApplicationSubmission = observer(() => {

  const navigate = useNavigate();
  const { startFetch, isLoading } = useFetch({ withToast: false });
  const { id, applicationSubmissionId } = useParams();
  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications, getApplicationSubmissionById, sendApplicationForVerification }, applicationSubmissionStore } = useLKStores();
  const { name, applicationGroups } = applicationSubmissionStore?.application || {};
  const applicationSubmission = applicationSubmissionStore?.applicationSubmission;
  const { applicationState } = applicationSubmission || {};
  const { formik } = useApplicationSubmission();
  const isReady = applicationState?.id !== ApplicationSubmissionStateEnum.Draft && applicationState?.id !== ApplicationSubmissionStateEnum.Modification;

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

  const _sendApplicationForVerification = async () => {
    const { data, error } = await startFetch(() => sendApplicationForVerification(Number(applicationSubmissionId)));

    if (error) {
      toast("Не удалось отправить заявку на проверку", { type: 'error' });
    }
    else {
      await _getApplicationSubmissionById();
      toast("Вы успешно отправили заявку на проверку", { type: 'success' });
    }
  }

  useEffect(() => {
    _getApplicationById();
    _getApplicationSubmissionById();
  }, [])

  return (
    <WithLoader isLoading={isLoading}>
      <div className={classes.root}>
        <ApplicationSubmissionPageHeader applicationState={applicationState}>
          {name}, заявка № {applicationSubmissionId}
        </ApplicationSubmissionPageHeader>

        <div className={classes.headerBtnGroup}>
          <BackBtn disabled={isLoading} />

          {
            !isReady &&
            <>
              <Button
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={_sendApplicationForVerification}
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
            </>
          }
        </div>
        <Divider />

        <ApplicationSubmissionForm
          applicationGroups={applicationGroups}
          formik={formik}
          isReady={isReady}
        />
      </div>
    </WithLoader>
  )
})
