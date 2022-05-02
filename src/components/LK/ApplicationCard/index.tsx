import React from 'react'
import { Application } from '../types/Application';
import classes from './ApplicationCard.module.scss';

export const ApplicationCard = (application: Application) => {
  return (
    <div className={classes.root}>
      <h2>{application?.name}</h2>
      <p>{application?.description ? application?.description : "Описание отсутствует"}</p>
    </div>
  )
}
