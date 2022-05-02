import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { NumberFieldType } from '../../../Types/inputVariantTypes';
import classes from './style.module.scss';

interface NumberFieldForm {
  numberFieldType: NumberFieldType,
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const NumberFieldForm = (props: NumberFieldForm) => {

  const { numberFieldType: { min, max }, handleChange } = props;

  return (
    <div className={classes.root}>
      <TextField
        name="min"
        label="Минимальное число"
        value={min}
        onChange={handleChange}
      />

      <TextField
        name="max"
        label="Максимальное число"
        value={max}
        onChange={handleChange}
      />
    </div>
  )
}
