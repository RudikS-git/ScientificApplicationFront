import { FormikProps } from 'formik';
import React, { useCallback, useMemo } from 'react'
import { ApplicationSubmissionType, InputSubmission } from '../../Types/ApplicationSubmission';
import { ApplicationGroupType } from '../../LK/types/Application'
import { InputField } from '../../LK/ApplicationSubmission/InputField';
import classes from './ApplicationGroup.module.scss';

interface ApplicationGroup {
  applicationGroup: ApplicationGroupType,
  formik: FormikProps<Omit<ApplicationSubmissionType, 'id' | 'applicationId' | 'created' | 'applicationState'>>,
  isReady?: boolean
}

export const ApplicationGroup = (props: ApplicationGroup) => {

  const { applicationGroup, formik, isReady } = props;
  const { inputFields } = applicationGroup;
  const { inputSubmissions } = formik.values;

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
              key={it.inputFieldId}
              variantInput={it}
              value={value}
              onChange={(value) => index != -1 && formik.setFieldValue(`inputSubmissions[${index}].value`, value)}
              disabled={isReady}
            />
          )
        })
      }
    </div>
  )
}
