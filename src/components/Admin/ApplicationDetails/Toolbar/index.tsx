import { Divider } from '@mui/material';
import React from 'react'
import { useModal } from '../../../../hooks/useModal';
import { Button } from '../../../../UI/Button/Button';
import { ModalWindow } from '../../../../UI/ModalWindow/ModalWindow';
import { CreateUpdateInputWindow } from '../CreateUpdateInputWindow';
import classes from './style.module.scss';

export const Toolbar = () => {

  const { isOpen, setIsOpen, open, close } = useModal();

  return (
    <div className={classes.root}>
      <h2>Панель инструментов</h2>
      <Divider />

      <div className={classes.body}>
        <Button onClick={open}>
          Создать текст.поле
        </Button>
      </div>

      <ModalWindow open={isOpen} onClose={() => setIsOpen(false)}>
        <CreateUpdateInputWindow cancel={close} />
      </ModalWindow>
    </div>
  )
}
