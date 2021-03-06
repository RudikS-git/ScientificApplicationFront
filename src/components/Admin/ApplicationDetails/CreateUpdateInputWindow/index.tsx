import React, { ReactEventHandler } from 'react'
import { Checkbox } from '../../../../UI/Checkbox'
import { Autocomplete } from '../../../../UI/Autocomplete'
import { TextField } from '../../../../UI/TextField/TextField'
import { CreateUpdateWindow } from '../CreateUpdateWindow';
import classes from './CreateInput.module.scss';
import { useCreateInput } from './useCreateInput';
import { Divider, MenuItem } from '@mui/material';
import { Select } from '../../../../UI/Select';
import { InputVariant } from '../../../Types/Input';
import { TextFieldForm } from '../Inputs/TextFieldForm';
import { NumberFieldForm } from '../Inputs/NumberFieldForm';
import { DateFieldForm } from '../Inputs/DateFieldForm';
import { PhoneFieldForm } from '../Inputs/PhoneFieldForm';
import { InputTypes } from '../../Constants/InputTypes';

interface CreateUpdateInputWindowProps {
  cancel(): void
}

export const CreateUpdateInputWindow = ({ cancel }: CreateUpdateInputWindowProps) => {

  const { formik, applicationDetails, cancelModal } = useCreateInput({ cancel: cancel });
  const application = applicationDetails.application;
  const { groupId, isRequired, label, description, inputUnderTypeId } = formik.values;

  const renderSpecificFields = (inputType: InputVariant | undefined) => {
    switch (inputUnderTypeId) {
      case InputVariant.TextField:
        return <TextFieldForm
          textFieldType={formik.values}
          handleChange={formik.handleChange}
        />

      case InputVariant.PhoneField:
        return <PhoneFieldForm
          phoneFieldType={formik.values}
          handleChange={formik.handleChange} />

      case InputVariant.DateField:
        return <DateFieldForm
          dateFieldType={formik.values}
          handleChange={formik.handleChange}
        />

      case InputVariant.NumberField:
        return <NumberFieldForm
          numberFieldType={formik.values}
          handleChange={formik.handleChange} />

      default:
        return <></>
    }
  }

  return (
    <CreateUpdateWindow
      className={classes.root}
      save={formik.submitForm}
      cancel={cancelModal}
      saveDisabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
      cancelDisabled={formik.isSubmitting}
    >
      <div className={classes.groupBlock}>
        <Select
          label="????????????"
          value={application?.applicationGroups?.find(({ id }) => groupId === id)?.id}
          name="groupId"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => formik.setFieldValue('groupId', e.target.value)}
          fullWidth
        >
          {
            application?.applicationGroups?.map(({ id, name }) => <MenuItem value={id} key={id}>{name}</MenuItem>)
          }
        </Select>
        <Divider />
      </div>

      <Checkbox
        labelProps={{
          label: "???????????????????????? ????????"
        }}
        checkBoxProps={{
          checked: isRequired,
          onChange: (e) => formik.setFieldValue('isRequired', e.target.checked)
        }}

      />

      <TextField
        label="????????????????"
        fullWidth
        value={label}
        name="label"
        onChange={formik.handleChange}
      />

      <TextField
        label="????????????????"
        fullWidth
        value={description}
        name="description"
        onChange={formik.handleChange}
      />

      <Select
        label="??????"
        value={inputUnderTypeId}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => formik.setFieldValue('inputUnderTypeId', e.target.value)}
      >
        {
          InputTypes.map(({ id, title }) => <MenuItem value={id} key={id}>{title}</MenuItem>)
        }
      </Select>

      {
        inputUnderTypeId && (
          <>
            <Divider />

            <div className={classes.specificFields}>
              {renderSpecificFields(inputUnderTypeId)}
            </div>
          </>
        )
      }
    </CreateUpdateWindow >
  )
}
