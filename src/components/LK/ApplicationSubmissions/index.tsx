import { Box, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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

export const ApplicationSubmissions = observer(() => {

  const { id } = useParams();
  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications }, applicationSubmissionStore } = useLKStores();
  const { name } = applicationSubmissionStore?.application || {};
  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();

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

  const _getApplicationSubmissions = async () => {
    const { data } = await startFetch(() => getApplicationSubmissions(Number(id)));
  }

  const _deleteApplicationSubmission = async (id: number) => {
    const isSuccess = await deleteApplicationSubmission(id)

    if (isSuccess) {
      _getApplicationSubmissions();
    }
  }

  useEffect(() => {
    _getApplicationById();
    _getApplicationSubmissions();
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
          >
            Фильтрация
          </Button>
        </Box>

        <Divider />

        <ApplicationSubmissionTable
          pagedApplicationSubmissions={pagedSubmissionApplications}
          renderActionNode={(it) =>
            <>
              <Button onClick={() => navigate(`/my-applications/details/${id}/${it.id}`)}>Подробнее</Button>
              <Button>История</Button>
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
})
