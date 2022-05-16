import { Box, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useModal } from '../../../hooks/useModal';
import { useLKStores } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import { Mark } from '../../../UI/Mark/Mark';
import { Table } from '../../../UI/Table/Table';
import { ApplicationSubmissionTable } from '../../common/ApplicationSubmissionTable';
import { ApplicationSubmissionState, ApplicationSubmissionStateEnum, ApplicationSubmissionType } from '../../Types/ApplicationSubmission';
import { BackBtn } from '../../common/BackButton';
import classes from './ApplicationSubmission.module.scss';
import { CreateApplicationSubmissionModal } from './CreateApplicationSubmissionModal';
import { useApplicationSubmission } from './useApplicationSubmission';
import AddIcon from '@mui/icons-material/Add';
import { PageHeader } from '../../common/PageHeader';
import { ApplicationFilter } from '../../common/ApplicationFilter';
import { ApplicationFilterOptions } from '../../common/ApplicationFilter/useApplicationFilter';
import queryString from 'query-string';

const _ApplicationSubmissions = () => {

  const { id } = useParams();
  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications, getApplicationStates, applicationStates }, applicationSubmissionStore } = useLKStores();
  const { name } = applicationSubmissionStore?.application || {};
  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [filterOpen, setFilterOpen] = useState(false);

  const submitHandler = ({ data, error, validateErrors }: any) => {
    if (!error) {
      close();
      _getApplicationSubmissions();
    }
  }

  const { formik, deleteApplicationSubmission } = useApplicationSubmission({ submitHandler: submitHandler, applicationId: Number(id) });
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

  const _deleteApplicationSubmission = async (id: number) => {
    const isSuccess = await deleteApplicationSubmission(id)

    if (isSuccess) {
      _getApplicationSubmissions();
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
        <PageHeader>
          {name}
        </PageHeader>

        <Box className={classes.btnGroup}>
          <BackBtn />
          <Button
            variant="contained"
            onClick={open}
            endIcon={<AddIcon />}
          >
            Новая заявка
          </Button>
          <Button
            variant="outlined"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Фильтрация
          </Button>
        </Box>

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
              <Button onClick={() => navigate(`/my-applications/details/${id}/${it.id}`)}>Подробнее</Button>
              <Button onClick={() => navigate(`/my-applications/history-submission/${id}/${it.id}`)}>История</Button>
              <Button color="error" onClick={() => _deleteApplicationSubmission(it.id)}>Удалить</Button>
            </>
          }
        />

        <CreateApplicationSubmissionModal
          isOpen={isOpen}
          close={close}
          ok={formik.submitForm}
          formik={formik}
        />
      </div>
    </WithLoader>
  )
}

const ApplicationSubmissions = observer(_ApplicationSubmissions);
export { ApplicationSubmissions }
