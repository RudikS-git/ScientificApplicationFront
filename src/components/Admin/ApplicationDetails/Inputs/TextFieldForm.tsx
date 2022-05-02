import { FormikProps } from 'formik';
import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { Application } from '../../Types/Application';
import { TextFieldType } from '../../../Types/inputVariantTypes';
import classes from './style.module.scss';

interface TextFieldFormProps {
  textFieldType: TextFieldType,
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const TextFieldForm = (props: TextFieldFormProps) => {

  const { textFieldType: { minLength, maxLength }, handleChange } = props;

  return (
    <div className={classes.root}>
      <TextField
        name="minLength"
        label="Минимальная длина"
        value={minLength}
        onChange={handleChange}
      />

      <TextField
        name="maxLength"
        label="Максимальная длина"
        value={maxLength}
        onChange={handleChange}
      />
    </div>
  )
}
