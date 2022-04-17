import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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

export const ApplicationDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { applicationStore: { getApplicationById }} = useAdminStores();
    const { startFetch, isLoading } = useFetch();
    const [application, setApplication] = useState<Application>();

    const getApplication = async () => {
      const { data, error } = await startFetch(getApplicationById(Number(id)));

      if(error) {
        navigate(-1);
      }
      else {
        setApplication(data);
        console.log(data);
      }

    }

    useEffect(() => {
        if(id) {
          getApplication()
        }
    }, [id]);
    
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
                    value={application?.name}
                    fullWidth
                  />

                  <TextField
                    label="Описание"
                    value={application?.description}
                    fullWidth
                    multiline
                  />
                </div>


                <div>
                  <h2>Группы</h2>
                  <ApplicationGroups applicationGroups={application?.applicationGroups} />
                </div>
            </WithLoader>
          </div>
        // </BreadCrumbsHOC>
    )
}
