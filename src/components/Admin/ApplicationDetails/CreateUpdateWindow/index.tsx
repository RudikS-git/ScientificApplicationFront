import { ClassNames } from '@emotion/react';
import { Divider } from '@mui/material';
import classNames from 'classnames';
import React, { FC } from 'react'
import { Button } from '../../../../UI/Button/Button'
import classes from './style.module.scss';

interface CreateUpdateWindowProps {
  className?: string,
  save(): void,
  cancel(): void,
  isLoading?: boolean
}

export const CreateUpdateWindow: FC<CreateUpdateWindowProps> = ({ children, className, save, cancel, isLoading }) => {

  const currentClassName = classNames({
    [classes.root]: true,
    [className || '']: Boolean(className)
  })

  return (
    <div className={currentClassName}>
      {children}

      <Divider />
      <div className={classes.btns}>
        <Button variant="contained" color="error" onClick={cancel} disabled={isLoading}>
          Отменить
        </Button>

        <Button variant="contained" color="primary" onClick={save} disabled={isLoading}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
