import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router';
import { MANAGE_APPLICATION_STATES } from '../../../constants/manageApplicationStates';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useModal } from '../../../hooks/useModal';
import { useAdminStores, useRootStore } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import Loader from '../../../UI/Loader/Loader';
import { Mark } from '../../../UI/Mark/Mark';
import { Table } from '../../../UI/Table/Table';
import { PageHeader } from '../../common/PageHeader';
import { ToolBar } from '../../common/ToolBar';
import { CreateApplicationModal } from '../CreateApplicationModal/CreateApplicationModal';
import { Application, ManageApplicationStates } from '../Types/Application';
import classes from './ManageApplications.module.scss';
import { useApplication } from './useApplication';

const perPages = [10, 15, 20, 25];

const ManageApplications = () => {

  const navigate = useNavigate();
  const { applicationStore: { getApplications, pagedApplications } } = useAdminStores();
  const { isOpen, open, close } = useModal();
  const { page, perPage } = useParams()

  const submitHandler = ({ data, error, validateErrors }: any) => {
    if (!error) {
      close();
      getApplicationPage()
    }
  }

  const { formik, deleteApplication } = useApplication({ submitHandler });

  const { startFetch, isLoading } = useFetch();

  useEffect(() => {
    if (page && perPage) {
      if (perPages.includes(Number(perPage))) {
        getApplicationPage(Number(page), Number(perPage))
      }
      else {
        navigate(`/admin/applications`)
      }
    }
    else {
      getApplicationPage();
    }

  }, [page, perPage])

  const getApplicationPage = (page = 1, pageSize = 15) => {
    startFetch(() => getApplications(page, pageSize))
  }

  const renderApplicationState = (state: ManageApplicationStates) => {
    switch (state) {
      case ManageApplicationStates.Draft:
        return <Mark text={MANAGE_APPLICATION_STATES[state]} variant="gray" />

      case ManageApplicationStates.Published:
        return <Mark text={MANAGE_APPLICATION_STATES[state]} variant="green" />

    }
  }

  return (
    <div className={classes.root}>
      <PageHeader>
        Конструктор заявок
      </PageHeader>

      <ToolBar
        withBackBtn={false}
      >
        <Button
          variant='contained'
          onClick={open}
          endIcon={<AddIcon />}
        >
          Создать заявку
        </Button>
        <Button
          variant="outlined"
        >
          Фильтрация
        </Button>
      </ToolBar>

      <WithLoader isLoading={isLoading}>
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
            pagedApplications?.items?.map((it: Application) => {
              return {
                id: it.id,
                columns: [
                  it.id?.toString(),
                  dayjs(it.created).format('DD.MM.YYYY'),
                  it.name,
                  `RN-${it.id}`,
                  renderApplicationState(it.manageApplicationState),

                  <div className={classes.manageBlock}>
                    <Button onClick={() => navigate(`/admin/applications/details/${it.id}`)}>Подробнее</Button>
                    <Button color="error" onClick={() => deleteApplication(it.id)}>Удалить</Button>
                  </div>
                ],
              }
            })

          }

          pagination={{
            perPages: perPages,
            page: Number(page) || 1,
            perPage: Number(perPage) || 15,
            count: pagedApplications?.totalCount,
            changePageHandler: (newPage: number, perPage: number) => navigate(`/admin/applications/${newPage}/${perPage}`),
            changeRowsPerPageHandler: (perPage: number) => navigate(`/admin/applications/1/${perPage}`)
          }}
        />
      </WithLoader>


      <CreateApplicationModal
        isOpen={isOpen}
        close={close}
        ok={formik.submitForm}
        formik={formik}
      />
    </div>
  )
}

export default observer(ManageApplications);