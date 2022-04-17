import { IconButton } from '@mui/material'
import React from 'react'
import { Button } from '../../../UI/Button/Button'
import { TextField } from '../../../UI/TextField/TextField'
import { ApplicationGroup } from '../Models/Application'
import classes from './ApplicationGroups.module.scss';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface ApplicationGroupProps {
    applicationGroups?: ApplicationGroup[]
}
export const ApplicationGroups = ({ applicationGroups } : ApplicationGroupProps) => {
  return (
    <>
         {
            applicationGroups?.map((it, index) => {
            return (
                <div className={classes.applicationGroup}>
                <TextField
                    key={it.id}
                    label="Наименование"
                    value={it.name}
                    fullWidth
                />
                <IconButton color="error" disabled={index === 0}>
                    <RemoveCircleIcon />
                </IconButton>
                </div>
            )
            })
        }
        <Button 
            variant='contained'
            color='primary'
            fullWidth
        >
            Создать
        </Button>
    </>
  )
}
