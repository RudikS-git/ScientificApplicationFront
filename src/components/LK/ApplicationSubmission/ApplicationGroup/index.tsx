import { FormikProps } from 'formik';
import React, { useCallback, useMemo } from 'react'
import { ApplicationSubmissionType, InputSubmission } from '../../../Types/ApplicationSubmission';
import { ApplicationGroupType } from '../../types/Application'
import { InputField } from '../InputField';
import classes from './ApplicationGroup.module.scss';

interface ApplicationGroup {
  applicationGroup: ApplicationGroupType,
  formik: FormikProps<Omit<ApplicationSubmissionType, 'id' | 'applicationId' | 'created' | 'applicationState'>>
}

export const ApplicationGroup = (props: ApplicationGroup) => {

  const { applicationGroup, formik } = props;
  const { inputFields } = applicationGroup;
  const { inputSubmissions } = formik.values;

  console.log(inputSubmissions)

  const getIndexInputSubmission = useCallback((inputFieldId: number) => {
    return inputSubmissions.findIndex(it => it.inputFieldId === inputFieldId);
  }, [inputSubmissions])

  return (
    <div className={classes.root}>
      {
        inputFields?.map(it => {

          let value;
          let index: number;
          if (it.inputFieldId) {
            index = getIndexInputSubmission(it.inputFieldId);

            if (index != -1) {
              value = inputSubmissions[index]?.value
            }
            else {
              value = undefined;
            }
          }

          return (
            <InputField
              variantInput={it}
              value={value}
              onChange={(value) => index != -1 && formik.setFieldValue(`inputSubmissions[${index}].value`, value)}
            />
          )
        })
      }
    </div>
  )
}
