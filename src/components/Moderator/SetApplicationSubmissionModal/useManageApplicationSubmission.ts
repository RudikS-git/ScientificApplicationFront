import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFetch } from '../../../hooks/useFetch';
import { useModeratorStores } from '../../../store/RootStore';
import { ManageApplicationSubmission } from '../../Types/ManageApplicationSubmission';
import classes from './SetApplicationSubmissionModal.module.scss';

interface useManageApplicationSubmission {
  close(): void
}

export const useManageApplicationSubmission = ({ close }: useManageApplicationSubmission) => {
  const { applicationStore: { getApplicationById, getApplicationSubmissions, setApplicationSubmissionState, getApplicationSubmissionById, applicationStates, getApplicationStates }, applicationSubmissionStore } = useModeratorStores();
  const { id: applicationId, applicationGroups } = applicationSubmissionStore?.application || {};
  const { id, name, applicationState, inputSubmissions } = applicationSubmissionStore?.applicationSubmission || {}
  const { startFetch, isLoading } = useFetch({ withToast: false });
  const navigate = useNavigate();

  const formik = useFormik<ManageApplicationSubmission>({
    initialValues: {
      applicationState: applicationState,
      comment: ''
    },
    onSubmit: () => _setApplicationSubmissionState(),
    enableReinitialize: true
  });

  const _setApplicationSubmissionState = async () => {

    if (id) {
      const { data, error } = await startFetch(() => setApplicationSubmissionState(id, formik.values));

      if (error) {
        toast('Не удалось установить обратную связь заявке', { type: 'error' });
      }
      else {
        const { data, error } = await startFetch(() => getApplicationSubmissionById(id));
        applicationSubmissionStore.applicationSubmission = data;

        if (error) {
          navigate(-1);
        }
        else {
          close();
          toast(`Обратная связь заявке №${id} успешно установлена`, { type: 'success' });
        }
      }
    }

  }

  useEffect(() => {

    if (!applicationStates) {
      getApplicationStates();
    }

  }, [])


  return {
    formik,
    isLoading
  }
}
