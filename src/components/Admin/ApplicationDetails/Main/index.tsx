import React from 'react'
import { ApplicationGroups } from '../../ApplicationGroups/ApplicationGroups'
import { Application } from '../../Types/Application'
import { FormikProps } from 'formik';
import { TextField } from '../../../../UI/TextField/TextField';
import classes from './style.module.scss';

interface MainProps {
  formik: FormikProps<Application>;
}

export const Main = ({ formik }: MainProps) => {
  return (
    <div className={classes.root}>
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
    </div>
  )
}


