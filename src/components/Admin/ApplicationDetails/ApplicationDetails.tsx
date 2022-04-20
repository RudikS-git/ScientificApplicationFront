import { Divider } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BreadCrumbsHOC } from '../../../HOC/BreadCrumbsHOC';
import { WithLoader } from '../../../HOC/WithLoader';
import { useFetch } from '../../../hooks/useFetch';
import { useAdminStores } from '../../../store/RootStore';
import { Button } from '../../../UI/Button/Button';
import { TextField } from '../../../UI/TextField/TextField';
import { ApplicationGroups } from '../ApplicationGroups/ApplicationGroups';
import { ADMIN_APPLICATION_BREADCUMBS } from '../BreadCrumbsPath/Application';
import { CreateApplicationTabs } from '../CreateApplicationTabs/CreateApplicationTabs';
import { Application } from '../Models/Application';
import classes from './ApplicationDetails.module.scss';
import { useApplicationDetails } from './useApplicationDetails';

export const ApplicationDetails = () => {

    const { id } = useParams();
    const { formik, fetchUpdateApplication, getApplication, isLoading } = useApplicationDetails({ id: Number(id) });

    useEffect(() => {
        if(id) {
          getApplication()
        }
    }, [id]);

    console.log(formik)
    
    return (
        // <BreadCrumbsHOC links={ADMIN_APPLICATION_BREADCUMBS}>
          <div className={classes.root}>
            <div>
              <CreateApplicationTabs value={0} handleChange={() => console.log('hj')} />
              <Divider />
            </div>

            <WithLoader isLoading={isLoading}>
                <div>
                  <h2>Основные настройки</h2>
                  <TextField
                    label="Наименование"
                    name="name"
                    value={formik.values?.name}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.errors?.name}
                  />

                  <TextField
                    label="Описание"
                    name="description"
                    value={formik.values?.description}
                    onChange={formik.handleChange}
                    fullWidth
                    multiline
                    error={formik.errors?.description}
                  />
                </div>

                <div>
                  <h2>Группы</h2>
                  <ApplicationGroups formik={formik} applicationGroups={formik.values?.applicationGroups || []} />
                </div>

                <Button
                  onClick={formik.submitForm}
                  disabled={formik.isSubmitting}
                >
                  Сохранить
                </Button>
            </WithLoader>
          </div>
        // </BreadCrumbsHOC>
    )
}
