import { OtherHouses } from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useLKStores, useModeratorStores } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import { TextField } from '../../../UI/TextField/TextField';
import { ApplicationSubmissionStateEnum } from '../../Types/ApplicationSubmission';
import { BackBtn } from '../../common/BackButton';
import { ApplicationGroup } from '../../common/ApplicationGroup';
import classes from './ApplicationSubmission.module.scss';
import { PageHeader } from '../../common/PageHeader';
import { ApplicationSubmissionForm } from '../../common/ApplicationSubmissionForm/ApplicationSubmissionForm';
import { useApplicationSubmission } from './useApplicationSubmission';
import { ApplicationStateMark } from '../../common/ApplicationStateMark';
import { ApplicationSubmissionPageHeader } from '../../common/ApplicationSubmissionPageHeader';
import { SetApplicationSubmissionModal } from '../SetApplicationSubmissionModal';
import { useModal } from '../../../hooks/useModal';
import { ToolBar } from '../../common/ToolBar';

export const ApplicationSubmission = observer(() => {

  const navigate = useNavigate();
  const { startFetch, isLoading } = useFetch({ withToast: false });
  const { id, applicationSubmissionId } = useParams();
  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications, getApplicationSubmissionById }, applicationSubmissionStore } = useModeratorStores();
  const { name, applicationGroups } = applicationSubmissionStore?.application || {};
  const applicationSubmission = applicationSubmissionStore?.applicationSubmission;
  const { applicationState } = applicationSubmission || {};
  const { formik } = useApplicationSubmission();
  const { isOpen, open, close } = useModal();

  const _getApplicationById = async () => {
    const { data, error } = await startFetch(() => getApplicationById(Number(id)));

    if (error) {
      navigate('/moderator/applications');
    }
    else {
      applicationSubmissionStore.application = data;
    }
  }

  const _getApplicationSubmissionById = async () => {
    const { data, error } = await startFetch(() => getApplicationSubmissionById(Number(applicationSubmissionId)));

    if (error) {
      navigate('/moderator/applications');
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
        <ApplicationSubmissionPageHeader applicationState={applicationState}>
          Модерация - {name}, заявка № {applicationSubmissionId}
        </ApplicationSubmissionPageHeader>

        <ToolBar>
          <Button
            variant="contained"
            onClick={open}
          >
            Установить статус
          </Button>
        </ToolBar>

        <ApplicationSubmissionForm
          applicationGroups={applicationGroups}
          formik={formik}
          isReady={true}
        />
      </div>

      <SetApplicationSubmissionModal
        isOpen={isOpen}
        close={close}
      />
    </WithLoader>
  )
})