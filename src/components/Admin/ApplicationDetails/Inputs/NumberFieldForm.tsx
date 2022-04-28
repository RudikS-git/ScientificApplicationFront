import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { NumberFieldType } from '../../Types/inputVariantTypes';
import classes from './style.module.scss';

export const NumberFieldForm = (props: NumberFieldType) => {

  const { min, max } = props;

  return (
    <div className={classes.root}>
      <TextField
        label="Минимальное число"
        value={min}
      />

      <TextField
        label="Максимальное число"
        value={max}
      />
    </div>
  )
}
