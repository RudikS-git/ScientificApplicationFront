import { DatePicker, DesktopDatePicker } from '@mui/lab';
import React, { useRef } from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { InputVariant } from '../../../Types/Input';
import { DateFieldType, NumberFieldType, PhoneFieldType, TextFieldType, VariantInputTypes } from '../../../Types/inputVariantTypes'
import classes from './InputField.module.scss';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { InputSubmission } from '../../../Types/ApplicationSubmission';
import dayjs from 'dayjs';
import { E164Number } from 'libphonenumber-js/types';

interface InputFieldProps {
  variantInput: VariantInputTypes, //Omit<VariantInputTypes, 'NumberFieldType'>,
  value: number | string | E164Number | undefined,
  onChange(value: number | string | E164Number | undefined): void,
  disabled?: boolean
}

export const InputField = (props: InputFieldProps) => {

  const { variantInput, value, onChange, disabled } = props;

  const renderByInputType = (inputUnderTypeId: number) => {
    switch (inputUnderTypeId) {
      case InputVariant.TextField:
        return (
          <TextField
            label={variantInput?.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        )

      case InputVariant.DateField:
        return (
          <DesktopDatePicker
            label={variantInput?.label}
            inputFormat="DD.MM.YYYY"
            mask='__.__.____'
            value={value as string}
            onChange={(date) => onChange(date || '')}
            renderInput={(params) => <TextField {...params} />}
            disabled={disabled}
          />

        )

      case InputVariant.NumberField:
        return (
          <TextField
            label={variantInput?.label}
            value={value || ''}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        )

      case InputVariant.PhoneField:
        return (
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry='RU'
            label={variantInput?.label}
            disabled={disabled}
            onChange={(number) => onChange(number)}
            value={value as E164Number}
            inputComponent={TextField}
          />
        )
    }
  }

  return (
    <div>
      {renderByInputType(variantInput.inputUnderTypeId)}
      {variantInput?.description && <span className={classes.description}>{variantInput?.description}</span>}
    </div>
  )
}
