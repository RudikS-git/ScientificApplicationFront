import { ButtonGroup, Divider, Tab, TabsContext } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BreadCrumbsHOC } from '../../../HOC/BreadCrumbsHOC';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useAdminStores, useRootStore } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import { TextField } from '../../../UI/TextField/TextField';
import { ApplicationGroups } from '../ApplicationGroups/ApplicationGroups';
import { ADMIN_APPLICATION_BREADCUMBS } from '../BreadCrumbsPath/Application';
import { CreateApplicationTabs } from '../CreateApplicationTabs/CreateApplicationTabs';
import { Application, ManageApplicationStates } from '../Types/Application';
import classes from './ApplicationDetails.module.scss';
import { useApplicationDetails } from './useApplicationDetails';
import { useTabs } from './useTabs';
import TabContext from '@mui/lab/TabContext';
import { Main } from './Main';
import TabPanel from '@mui/lab/TabPanel';
import { Form } from './Form';
import { observer } from 'mobx-react';
import { PageHeader } from '../../common/PageHeader';
import { ToolBar } from '../../common/ToolBar';

const _ApplicationDetails = () => {

  const { id } = useParams();
  const { commonDictionary: { fieldTypes, getFieldTypes } } = useRootStore()
  const { formik, fetchUpdateApplication, getApplication, isLoading, setManageApplicationState } = useApplicationDetails({ id: Number(id) });
  const { tab, setTab } = useTabs();

  useEffect(() => {
    if (id) {
      getApplication();
    }

    if (!fieldTypes) {
      getFieldTypes();
    }

  }, [id]);

  return (
    <div className={classes.root}>
      <PageHeader>
        Конструктор формы
      </PageHeader>

      <ToolBar>

      </ToolBar>

      <div className={classes.header}>
        <CreateApplicationTabs value={tab} handleChange={(value) => setTab(value)} />
      </div>

      <WithLoader isLoading={isLoading}>
        <div className={classes.content}>
          <TabContext value={tab.toString()}>
            <TabPanel value="main">
              <Main formik={formik} />
            </TabPanel>

            <TabPanel value="form">
              <Form />
            </TabPanel>

            <div className={classes.btnGroup}>
              <Button
                variant='contained'
                color="primary"
                onClick={formik.submitForm}
                disabled={formik.isSubmitting}
              >
                Сохранить
              </Button>

              {
                formik.values.manageApplicationState === ManageApplicationStates.Published ?
                  <Button
                    variant='contained'
                    disabled={formik.isSubmitting}
                    color="inherit"
                    onClick={() => setManageApplicationState(ManageApplicationStates.Draft)}
                  >
                    Перевести в черновик
                  </Button>
                  :
                  <Button
                    variant='contained'
                    disabled={formik.isSubmitting}
                    color="success"
                    onClick={() => setManageApplicationState(ManageApplicationStates.Published)}
                  >
                    Опубликовать
                  </Button>
              }
            </div>
          </TabContext>
        </div>
      </WithLoader>
    </div >
  )
}

const ApplicationDetails = observer(_ApplicationDetails);
export { ApplicationDetails }
