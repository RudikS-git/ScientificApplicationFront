import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps, FormControlLabel, FormControlLabelProps } from '@mui/material'
import React from 'react'

interface CheckboxProps {
  checkBoxProps?: MuiCheckboxProps
  labelProps?: Omit<FormControlLabelProps, 'control'>
}

export const Checkbox = ({ checkBoxProps, labelProps }: CheckboxProps) => {

  if (labelProps) {
    return <FormControlLabel {...labelProps} control={<MuiCheckbox {...checkBoxProps} />} />
  }
  else {
    return <MuiCheckbox {...checkBoxProps} />
  }
}
