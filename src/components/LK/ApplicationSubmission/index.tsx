import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useLKStores } from '../../../store/RootStore';
import classes from './ApplicationSubmission.module.scss';

export const ApplicationSubmission = () => {

  const { id } = useParams();
  const { applicationStore: { getApplicationById } } = useLKStores();


  const _getApplicationById = async () => {
    const data = await getApplicationById(Number(id));
  }

  useEffect(() => {
    _getApplicationById();
  }, [id])

  return (
    <div>

    </div>
  )
}
