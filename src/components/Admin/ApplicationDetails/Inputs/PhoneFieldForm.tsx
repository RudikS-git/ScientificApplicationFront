import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { PhoneFieldType } from '../../Types/inputVariantTypes';
import classes from './style.module.scss';

export const PhoneFieldForm = (props: PhoneFieldType) => {

  const { type } = props;

  return (
    <div className={classes.root}>
      <TextField
        label="Тип"
        value={type}
      />
    </div>
  )
}
