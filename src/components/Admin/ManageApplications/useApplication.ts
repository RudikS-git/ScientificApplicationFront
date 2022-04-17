import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFetch } from '../../../hooks/useFetch';
import { useAdminStores } from '../../../store/RootStore';

export interface CreateApplicationModel {
    name: string
}

interface useApplicationProps {
    submitHandler(result: any): void
}

export const useApplication = ({ submitHandler } : useApplicationProps) => {

    const { applicationStore: { createApplication, deleteApplicationById } } = useAdminStores();
    const { startFetch, isLoading } = useFetch();
    const navigate = useNavigate();

    const fetchCreateApplication = async () => {

        const result = await startFetch(createApplication({
            ...formik.values, 
            groups: [
                { name: formik.values.name }
            ]
        }));

        const { data, error, validateErrors } = result;

        if(validateErrors?.name) {
            formik.setErrors({ 
                name: validateErrors.name?.length != 0 && validateErrors?.name[0],
            });
        }
        else if(data) {
            console.log(data)
        }

        submitHandler(result);
    }

    const deleteApplication = async (id: number) => {
        const { error } = await startFetch(deleteApplicationById(id));

        console.log(error)
        if(!error) {
            //navigate(0);
        }

    }

    const formik = useFormik({
      initialValues: {
        name: '',
      },
      onSubmit: fetchCreateApplication
    })

    return {
        formik,
        deleteApplication
    }
}
