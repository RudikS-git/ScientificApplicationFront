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
import { Table } from '../../../UI/Table/Table';
import { ApplicationSubmissionType } from '../../Types/ApplicationSubmission';
import { BackBtn } from '../BackButton';
import classes from './ApplicationSubmission.module.scss';
import { CreateApplicationSubmissionModal } from './CreateApplicationSubmissionModal';
import { useApplicationSubmission } from './useApplicationSubmission';

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
        <h1 className={classes.header}>{name}</h1>
        <Divider />

        <Box className={classes.btnGroup}>
          <BackBtn />
          <Button
            variant="contained"
            onClick={open}
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

        <Table
          headerRow={{
            id: 1,
            columns: [
              "ID",
              "Дата",
              "Наименованиие",
              "Рег.номер",
              "Статус",
              "",
            ],
          }}
          bodyRows={
            pagedSubmissionApplications?.items?.map((it: ApplicationSubmissionType) => {
              return {
                id: it.id,
                columns: [
                  it.id?.toString(),
                  dayjs(it.created).format('DD.MM.YYYY'),
                  it.name,
                  `RN-${it.id}`,
                  it.applicationState.name,

                  <div className={classes.manageBlock}>
                    <Button onClick={() => navigate(`/my-applications/details/${id}/${it.id}`)}>Подробнее</Button>
                    <Button>История</Button>
                    <Button color="error" onClick={() => _deleteApplicationSubmission(it.id)}>Удалить</Button>
                  </div>
                ],
              }
            })

          }

        // pagination={{
        //   perPages: perPages,
        //   page: Number(page) || 1,
        //   perPage: Number(perPage) || 15,
        //   count: pagedApplications?.totalCount,
        //   changePageHandler: (newPage: number, perPage: number) => navigate(`/admin/applications/${newPage}/${perPage}`),
        //   changeRowsPerPageHandler: (perPage: number) => navigate(`/admin/applications/1/${perPage}`)
        // }}
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
