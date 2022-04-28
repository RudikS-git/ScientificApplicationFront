import { FormikProps } from 'formik';
import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { Application } from '../../Types/Application';
import { TextFieldType } from '../../Types/inputVariantTypes';
import classes from './style.module.scss';

export const TextFieldForm = (props: TextFieldType) => {

  const { minLength, maxLength } = props;

  return (
    <div className={classes.root}>
      <TextField
        label="Минимальная длина"
        value={minLength}
      />

      <TextField
        label="Максимальная длина"
        value={maxLength}
      />
    </div>
  )
}
