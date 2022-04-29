import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { DateFieldType } from '../../Types/inputVariantTypes';
import classes from './style.module.scss';

interface DateFieldFormProps {
  dateFieldType: DateFieldType,
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const DateFieldForm = (props: DateFieldFormProps) => {

  const { dateFieldType: { minDateTime, maxDateTime }, handleChange } = props;

  return (
    <div className={classes.root}>
      <TextField
        label="Минимальная дата"
        name="minDateTime"
        value={minDateTime}
        onChange={handleChange}
      />
      <TextField
        label="Максимальная дата"
        name="maxDateTime"
        value={maxDateTime}
        onChange={handleChange}
      />
    </div>
  )
}
