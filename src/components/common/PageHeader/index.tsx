import { Divider } from '@mui/material';
import React from 'react'
import classes from './PageHeader.module.scss';

export const PageHeader: React.FC = ({ children }) => {
  return (
    <>
      <div className={classes.header}>
        {children}
      </div>
      <Divider />
    </>
  )
}
