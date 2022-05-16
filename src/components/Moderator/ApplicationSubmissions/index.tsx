import { Box, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useModal } from '../../../hooks/useModal';
import { useAdminStores, useLKStores, useModeratorStores } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import { Mark } from '../../../UI/Mark/Mark';
import { Table } from '../../../UI/Table/Table';
import { ApplicationFilter } from '../../common/ApplicationFilter';
import { ApplicationFilterOptions } from '../../common/ApplicationFilter/useApplicationFilter';
import { ApplicationSubmissionTable } from '../../common/ApplicationSubmissionTable';
import { BackBtn } from '../../common/BackButton';
import { PageHeader } from '../../common/PageHeader';
import { ToolBar } from '../../common/ToolBar';
import { ApplicationSubmissionState, ApplicationSubmissionStateEnum, ApplicationSubmissionType } from '../../Types/ApplicationSubmission';
import { SetApplicationSubmissionModal } from '../SetApplicationSubmissionModal';
import classes from './ApplicationSubmissions.module.scss';
import queryString from 'query-string';

const _ApplicationSubmissions = () => {

  const { id } = useParams();
  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications, getApplicationStates, applicationStates }, applicationSubmissionStore } = useModeratorStores();
  const { name } = applicationSubmissionStore?.application || {};
  const navigate = useNavigate();
  const location = useLocation();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

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

  const _getApplicationSubmissions = async (filterOptions: Partial<ApplicationFilterOptions> | undefined = undefined) => {
    if (filterOptions) {
      const { data } = await startFetch(() => getApplicationSubmissions(Number(id), 1, 15, filterOptions));
    }
    else {
      const { data } = await startFetch(() => getApplicationSubmissions(Number(id)));
    }
  }

  useEffect(() => {
    _getApplicationById();

    if (!location.search) {
      _getApplicationSubmissions();
    }
    else {
      const query = queryString.parse(location.search);
      _getApplicationSubmissions(query);
    }

    if (!applicationStates) {
      getApplicationStates();
    }

  }, [id])

  return (
    <WithLoader isLoading={isLoading}>
      <div>
        <PageHeader>Модерация - {name}</PageHeader>

        <ToolBar>
          <Button
            variant="outlined"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Фильтрация
          </Button>
        </ToolBar>
        <Divider />

        <ApplicationFilter
          collapseIn={filterOpen}
          setCollapseIn={setFilterOpen}
          applicationStates={applicationStates || [] as ApplicationSubmissionState[]}
        />

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
}

const ApplicationSubmissions = observer(_ApplicationSubmissions);
export { ApplicationSubmissions }
