import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { PhoneFieldType } from '../../Types/inputVariantTypes';
import classes from './style.module.scss';

interface PhoneFieldFormProps {
  phoneFieldType: PhoneFieldType,
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const PhoneFieldForm = (props: PhoneFieldFormProps) => {

  const { phoneFieldType: { type }, handleChange } = props;

  return (
    <div className={classes.root}>
      <TextField
        name="type"
        label="Тип"
        value={type}
        onChange={handleChange}
      />
    </div>
  )
}
