import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFetch } from '../../../hooks/useFetch';
import { useLKStores } from '../../../store/RootStore';

export interface CreateApplicationSubmissionModel {
  name: string
}

interface UseApplicationProps {
  applicationId: number,
  submitHandler(result: any): void
}

export const useApplicationSubmission = ({ applicationId, submitHandler }: UseApplicationProps) => {

  const { applicationStore: { createApplicationSubmission, deleteApplicationSubmission } } = useLKStores();
  const { startFetch, isLoading } = useFetch();
  const navigate = useNavigate();

  const fetchCreateApplication = async () => {

    const result = await startFetch(() => createApplicationSubmission({
      ...formik.values,
      applicationId: applicationId
    }));

    const { data, error, validateErrors } = result;

    if (validateErrors?.name) {
      formik.setErrors({
        name: validateErrors.name?.length != 0 && validateErrors?.name[0],
      });
    }

    submitHandler(result);
  }

  const _deleteApplicationSubmission = async (id: number | undefined) => {
    if (id) {
      const { data, error } = await startFetch(() => deleteApplicationSubmission(id));

      if (!error) {

        toast("Вы успешно удалили вашу заявку", { type: 'success' })
        return true;
      }
    }

    toast("Не удалось удалить заявку", { type: 'error' })
  }

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: fetchCreateApplication
  })

  return {
    formik,
    deleteApplicationSubmission: _deleteApplicationSubmission
  }
}
