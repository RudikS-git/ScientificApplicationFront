import { TextField } from '@mui/material';
import React from 'react'
import { Button } from '../../../UI/Button/Button';
import classes from './ApplicationFilter.module.scss';

export const ApplicationFilter = () => {
  return (
    <div className={classes.root}>
      <TextField
        label="ID"
      >

      </TextField>

      <TextField
        label="Дата начала"
      >

      </TextField>

      <TextField
        label="Дата конца"
      >

      </TextField>

      <TextField
        label="Наименование"
      >

      </TextField>

      <TextField
        label="Статус"
      >

      </TextField>

      <div className={classes.btnGroup}>
        <Button
          variant='contained'
          color='error'
        >
          Сбросить
        </Button>

        <Button
          variant='contained'
        >
          Фильтровать
        </Button>
      </div>
    </div>
  )
}
