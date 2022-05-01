import { Divider } from '@mui/material';
import React, { useEffect } from 'react'
import { useModal } from '../../../../hooks/useModal';
import { useAdminStores } from '../../../../store/RootStore';
import { Button } from '../../../../UI/Button/Button';
import { ModalWindow } from '../../../../UI/ModalWindow/ModalWindow';
import { CreateUpdateInputWindow } from '../CreateUpdateInputWindow';
import classes from './style.module.scss';

export const Toolbar = () => {

  const { applicationStore: { createInput, updateInput }, applicationDetails } = useAdminStores();
  const inputModal = useModal();
  const { isOpen, open, setIsOpen, close } = inputModal;

  useEffect(() => {
    applicationDetails.inputToolModal = inputModal;
  }, [inputModal])

  const openInputModal = () => {
    applicationDetails.inputModalData = undefined;
    open();
  }

  return (
    <div className={classes.root}>
      <h2>Панель инструментов</h2>
      <Divider />

      <div className={classes.body}>
        <Button
          variant="outlined"
          onClick={openInputModal}>
          Создать текст.поле
        </Button>
      </div>

      <ModalWindow open={isOpen} onClose={() => setIsOpen(false)}>
        <CreateUpdateInputWindow cancel={close} />
      </ModalWindow>
    </div>
  )
}
