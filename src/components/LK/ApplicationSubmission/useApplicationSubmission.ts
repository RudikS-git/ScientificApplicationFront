import { toast } from "react-toastify";
import { ApplicationSubmissionType, InputSubmission } from "./../../Types/ApplicationSubmission";
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLKStores } from '../../../store/RootStore';
import { Agriculture } from "@mui/icons-material";
import { useFetch } from "../../../hooks/useFetch";

export const useApplicationSubmission = () => {

  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications, updateApplicationSubmission }, applicationSubmissionStore } = useLKStores();
  const { id: applicationId, applicationGroups } = applicationSubmissionStore?.application || {};
  const { id, name, applicationState, inputSubmissions } = applicationSubmissionStore?.applicationSubmission || {}
  const [tab, setTab] = useState<string>('0');
  const { startFetch, isLoading } = useFetch();

  const formik = useFormik<Omit<ApplicationSubmissionType, 'id' | 'applicationId' | 'created' | 'applicationState'>>({
    initialValues: {
      name: name || '',
      inputSubmissions: []
    },
    onSubmit: () => _updateApplicationSubmission(),
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

    applicationGroups?.forEach(ag => {
      ag.inputFields?.forEach(input => {
        const existInputSubmission = inputSubmissions?.find(it => it.inputFieldId === input.inputFieldId);

        if (existInputSubmission) {
          currentInputSubmissions[index] = { id: existInputSubmission.id, inputFieldId: input.inputFieldId, value: existInputSubmission.value }
        }
        else {
          currentInputSubmissions[index] = { id: 0, inputFieldId: input.inputFieldId, value: '' }
        }

        index++;
      })
    })

    formik.setFieldValue('inputSubmissions', currentInputSubmissions);

  }, [applicationGroups, inputSubmissions])

  return {
    tab,
    setTab,
    formik,
    isLoading
  }
}
