import { toast } from "react-toastify";
import { ApplicationSubmissionType, InputSubmission } from "./../../Types/ApplicationSubmission";
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLKStores, useModeratorStores } from '../../../store/RootStore';
import { Agriculture } from "@mui/icons-material";
import { useFetch } from "../../../hooks/useFetch";

export const useApplicationSubmission = () => {

  const { applicationStore: { getApplicationById, getApplicationSubmissions, pagedSubmissionApplications }, applicationSubmissionStore } = useModeratorStores();
  const { id: applicationId, applicationGroups } = applicationSubmissionStore?.application || {};
  const { id, name, applicationState, inputSubmissions } = applicationSubmissionStore?.applicationSubmission || {}
  const { startFetch, isLoading } = useFetch();

  const formik = useFormik<Omit<ApplicationSubmissionType, 'id' | 'applicationId' | 'created' | 'applicationState'>>({
    initialValues: {
      name: name || '',
      inputSubmissions: []
    },
    onSubmit: () => console.log(),
    enableReinitialize: true
  });

  const prepareForm = () => new Promise(() => {
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
  })

  useEffect(() => {

    startFetch(() => prepareForm())

  }, [applicationGroups, inputSubmissions])

  return {
    formik,
    isLoading
  }
}
