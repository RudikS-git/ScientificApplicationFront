import { toast } from "react-toastify";
import { ApplicationSubmissionType, InputSubmission } from "./../../Types/ApplicationSubmission";
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLKStores } from '../../../store/RootStore';
import { Agriculture } from "@mui/icons-material";
import { useFetch } from "../../../hooks/useFetch";
import * as yup from 'yup';
import { InputVariant } from "../../Types/Input";
import { isValidPhoneNumber } from "react-phone-number-input";

export const useApplicationSubmission = () => {

  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications, updateApplicationSubmission }, applicationSubmissionStore } = useLKStores();
  const { id: applicationId, applicationGroups } = applicationSubmissionStore?.application || {};
  const { id, name, applicationState, inputSubmissions } = applicationSubmissionStore?.applicationSubmission || {}
  const { startFetch, isLoading } = useFetch();
  const [validationSchema, setValidationSchema] = useState(yup.object());

  const formik = useFormik<Omit<ApplicationSubmissionType, 'id' | 'applicationId' | 'created' | 'applicationState'>>({
    initialValues: {
      name: name || '',
      inputSubmissions: []
    },
    onSubmit: () => _updateApplicationSubmission(),
    validationSchema: validationSchema,
    enableReinitialize: true
  });

  const _updateApplicationSubmission = async () => {
    const { error } = await startFetch(() => updateApplicationSubmission({
      applicationSubmission: {
        ...formik.values,
        id: id,
        applicationId: applicationId,
        applicationState: applicationState,
      }
    }))

    if (error) {
      toast("Не удалось сохранить заявку", { type: 'error' })
    }
    else {
      toast("Заявка успешно сохранена", { type: 'success' })
    }
  }

  useEffect(() => {

    let index = 0;
    const currentInputSubmissions: InputSubmission[] = [];
    const schema: [yup.Schema, ...yup.Schema[]] = [yup.object()];

    applicationGroups?.forEach(ag => {
      ag.inputFields?.forEach(input => {
        const existInputSubmission = inputSubmissions?.find(it => it.inputFieldId === input.inputFieldId);

        switch (input.inputUnderTypeId) {
          case InputVariant.TextField:
            schema[index] = yup.object().shape({
              id: yup.number(),
              value: yup.string()
                .when("isRequired", (value, schema) => {
                  if (input.isRequired) {
                    return schema.required("Поле является обязательным")
                  }
                  else {
                    return schema.nullable()
                  }
                })
                .max(input.maxLength || 1024, 'Превышен лимит символов')
                .min(input.minLength || 0, 'Не достигнут лимит символов')
            })
            break;

          case InputVariant.NumberField:
            schema[index] = yup.object().shape({
              id: yup.number(),
              value: yup
                .number()
                .max(input.max || Number.MAX_SAFE_INTEGER, 'Превышен лимит')
                .min(input.min || -Number.MAX_SAFE_INTEGER, 'Не достигнут лимит')
                .when("isRequired", (value, schema) => {
                  if (input.isRequired) {
                    return schema.required("Поле является обязательным")
                  }
                  else {
                    return schema.nullable()
                  }
                })
            })
            break;

          case InputVariant.PhoneField:
            schema[index] = yup.object().shape({
              id: yup.number(),
              value: yup.string()
                .when("isRequired", (value, schema) => {
                  if (input.isRequired) {
                    return schema.required("Поле является обязательным")
                  }
                  else {
                    return schema.nullable()
                  }
                })
                .test('valid phone', 'Номер не существует', (phone, _context) => {

                  if (!phone) {
                    return false;
                  }

                  return isValidPhoneNumber(phone);
                }),
            })
            break;

          case InputVariant.DateField:
            schema[index] = yup.object().shape({
              id: yup.number(),
              value: yup.date()
                .when("isRequired", (value, schema) => {
                  if (input.isRequired) {
                    return schema.required("Поле является обязательным")
                  }
                  else {
                    return schema.nullable()
                  }
                })
              // .when("maxDateTime", (value, schema) => {
              //   if (input.maxDateTime) {
              //     console.log(input.maxDateTime)
              //     return schema.max(input.maxDateTime, "Дата вышла за пределы доступного диапазона")
              //   }

              //   return schema
              // })
              // .when("minDateTime", (value, schema) => {
              //   if (input.minDateTime) {
              //     return schema.min(input.minDateTime, "Дата вышла за пределы доступного диапазона")
              //   }

              //   return schema
              // })
            })
            break;
        }

        if (existInputSubmission) {
          currentInputSubmissions[index] = { id: existInputSubmission.id, inputFieldId: input.inputFieldId, value: existInputSubmission.value }
        }
        else {
          currentInputSubmissions[index] = { id: 0, inputFieldId: input.inputFieldId, value: '' }
        }

        index++;
      })
    })

    if (schema.length > 0) {
      setValidationSchema(yup.object().shape({
        inputSubmissions: yup.tuple(schema)
      }));
    }

    formik.setFieldValue('inputSubmissions', currentInputSubmissions);

  }, [applicationGroups, inputSubmissions])

  console.log(formik);

  return {
    formik,
    isLoading
  }
}
