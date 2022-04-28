import { Divider, Tab, TabsContext } from '@mui/material';
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
import { Application } from '../Types/Application';
import classes from './ApplicationDetails.module.scss';
import { useApplicationDetails } from './useApplicationDetails';
import { useTabs } from './useTabs';
import TabContext from '@mui/lab/TabContext';
import { Main } from './Main';
import TabPanel from '@mui/lab/TabPanel';
import { Toolbar } from './Toolbar';
import { Form } from './Form';
import { observer } from 'mobx-react';

export const ApplicationDetails = observer(() => {

  const { id } = useParams();
  const { commonDictionary: { fieldTypes, getFieldTypes } } = useRootStore()
  const { formik, fetchUpdateApplication, getApplication, isLoading } = useApplicationDetails({ id: Number(id) });
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
    // <BreadCrumbsHOC links={ADMIN_APPLICATION_BREADCUMBS}>
    <div className={classes.root}>
      <div className={classes.header}>
        <CreateApplicationTabs value={tab} handleChange={(value) => setTab(value)} />
        <Divider />
      </div>

      <WithLoader isLoading={isLoading}>
        <TabContext value={tab.toString()}>
          <TabPanel value="main">
            <Main formik={formik} />
          </TabPanel>

          <TabPanel value="form">
            <Form />
          </TabPanel>

          <Button
            onClick={formik.submitForm}
            disabled={formik.isSubmitting}
          >
            Сохранить
          </Button>
        </TabContext>
      </WithLoader>
    </div>
    // </BreadCrumbsHOC>
  )
})
