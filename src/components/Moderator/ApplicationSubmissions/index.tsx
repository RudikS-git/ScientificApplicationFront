import { Box, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useModal } from '../../../hooks/useModal';
import { useAdminStores, useLKStores, useModeratorStores } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import { Mark } from '../../../UI/Mark/Mark';
import { Table } from '../../../UI/Table/Table';
import { ApplicationSubmissionTable } from '../../common/ApplicationSubmissionTable';
import { BackBtn } from '../../common/BackButton';
import { PageHeader } from '../../common/PageHeader';
import { ToolBar } from '../../common/ToolBar';
import { ApplicationSubmissionState, ApplicationSubmissionStateEnum, ApplicationSubmissionType } from '../../Types/ApplicationSubmission';
import { SetApplicationSubmissionModal } from '../SetApplicationSubmissionModal';
import classes from './ApplicationSubmissions.module.scss';

export const ApplicationSubmissions = observer(() => {

  const { id } = useParams();
  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications }, applicationSubmissionStore } = useModeratorStores();
  const { name } = applicationSubmissionStore?.application || {};
  const navigate = useNavigate();

  const submitHandler = ({ data, error, validateErrors }: any) => {
    if (!error) {
      close();
      _getApplicationSubmissions();
    }
  }

  const { startFetch, isLoading } = useFetch({ withToast: false });

  const _getApplicationById = async () => {
    const { data } = await startFetch(() => getApplicationById(Number(id)));
    applicationSubmissionStore.application = data;
  }

  const _getApplicationSubmissions = async () => {
    const { data } = await startFetch(() => getApplicationSubmissions(Number(id)));
  }

  useEffect(() => {
    _getApplicationById();
    _getApplicationSubmissions();
  }, [id])

  return (
    <WithLoader isLoading={isLoading}>
      <div>
        <PageHeader>Модерация - {name}</PageHeader>

        <ToolBar>
          <Button
            variant="outlined"
          >
            Фильтрация
          </Button>
        </ToolBar>
        <Divider />

        <ApplicationSubmissionTable
          pagedApplicationSubmissions={pagedSubmissionApplications}
          renderActionNode={(it) =>
            <>
              <Button onClick={() => navigate(`/moderator/applications/details/${id}/${it.id}`)}>Подробнее</Button>
              <Button onClick={() => navigate(`/moderator/applications/history-submission/${id}/${it.id}`)}>История</Button>
            </>
          }
        />
      </div>
    </WithLoader>
  )
})
