import { Divider } from '@mui/material';
import React from 'react'
import { BackBtn } from '../BackButton';
import classes from './ToolBar.module.scss';

interface ToolBarProps {
  withBackBtn?: boolean
}

export const ToolBar: React.FC<ToolBarProps> = (props) => {

  const { children, withBackBtn = true } = props;

  return (
    <div className={classes.root}>
      {withBackBtn &&
        <div className={classes.backBtnBlock}>
          <BackBtn />
        </div>
      }
      {children}
      <Divider />
    </div>
  )
}
