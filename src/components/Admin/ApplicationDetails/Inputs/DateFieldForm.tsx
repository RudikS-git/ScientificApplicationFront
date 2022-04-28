import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { DateFieldType } from '../../Types/inputVariantTypes';
import classes from './style.module.scss';

export const DateFieldForm = (props: DateFieldType) => {

  const { minDateTime, maxDateTime } = props;

  return (
    <div className={classes.root}>
      <TextField
        label="Минимальная дата"
        value={minDateTime}
      />
      <TextField
        label="Максимальная дата"
        value={maxDateTime}
      />
    </div>
  )
}
