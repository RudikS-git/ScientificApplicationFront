import { DatePicker, DesktopDatePicker } from '@mui/lab';
import React from 'react'
import { TextField } from '../../../../UI/TextField/TextField'
import { InputVariant } from '../../../Types/Input';
import { VariantInputTypes } from '../../../Types/inputVariantTypes'
import classes from './InputField.module.scss';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { InputSubmission } from '../../../Types/ApplicationSubmission';
import dayjs from 'dayjs';

interface InputFieldProps {
  variantInput: VariantInputTypes,
  value: number | string | undefined,
  onChange(value: number | string | undefined): void,
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
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          >

          </TextField>
        )

      case InputVariant.DateField:
        return (
          <DesktopDatePicker
            label={variantInput?.label}
            inputFormat="DD.MM.YYYY"
            mask='__.__.____'
            value={dayjs(value).format('DD.MM.YYYY')}
            onChange={(date) => onChange(dayjs(date).format('DD.MM.YYYY') || '')}
            renderInput={(params) => <TextField {...params} />}
            disabled={disabled}
          />

        )

      case InputVariant.NumberField:
        return (
          <TextField
            label={variantInput?.label}
            value={value}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          >

          </TextField>
        )

      case InputVariant.PhoneField:
        return (
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry='RU'
            label={variantInput?.label}
            value={''}
            onChange={(number) => onChange(number)}
            disabled={disabled}
            inputComponent={(props) => {
              return (
                <TextField {...props} />
              )
            }}
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
