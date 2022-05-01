import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFetch } from '../../../hooks/useFetch';
import { useAdminStores } from '../../../store/RootStore';
import { Application } from '../Types/Application';

interface UseApplicationDetailsProps {
  id: number
}

export const useApplicationDetails = ({ id }: UseApplicationDetailsProps) => {

  const navigate = useNavigate();
  const { applicationStore: { getApplicationById, updateApplication } } = useAdminStores();
  const { startFetch, isLoading } = useFetch();
  const { applicationDetails } = useAdminStores();
  const application = applicationDetails.application;

  const fetchUpdateApplication = async () => {
    const { error, validateErrors } = await startFetch(() => updateApplication(formik.values));

    if (!error) {
      await getApplication();
      toast('Вы успешно сохранили изменения', { type: 'success' });
    }
    else {
      formik.setErrors(validateErrors);
    }
  }

  const formik = useFormik<Application>({
    initialValues: {
      id: application?.id || undefined,
      name: application?.name || '',
      description: application?.description || '',
      created: application?.created,
      updated: application?.updated,
      applicationGroups: application?.applicationGroups || []
    },
    onSubmit: fetchUpdateApplication,
    enableReinitialize: true
  })

  const getApplication = async () => {
    const { data, error } = await startFetch(() => getApplicationById(Number(id)));

    if (error) {
      navigate(-1);
    }
    else {
      applicationDetails.application = data;
    }
  }

  return {
    formik,
    isLoading,
    getApplication,
    fetchUpdateApplication
  }
}
