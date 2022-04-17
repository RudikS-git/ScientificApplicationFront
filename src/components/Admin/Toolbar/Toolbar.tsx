import { Divider } from '@mui/material';
import React from 'react'
import { Button } from '../../../UI/Button/Button';
import classes from './Toolbar.module.scss';

interface ToolBarProps {
    createHandler(): void
}

export const Toolbar = ({ createHandler } : ToolBarProps) => {
  return (
    <div className={classes.root}>
        <Button
            onClick={createHandler}
        >
            Создать заявку    
        </Button>

        <Button>
            Фильтр  
        </Button>
    </div>
  )
}
