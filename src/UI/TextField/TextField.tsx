import React from 'react'
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material'
import classes from './TextField.module.scss';

interface TextFieldProps extends Omit<MuiTextFieldProps, 'error'> {
    error?: string | boolean
    //mask?: string
}

export const TextField = (props: TextFieldProps) => {

    const { error, ...others } = props;

    return (
        <div className={classes.root}>
            <MuiTextField
                fullWidth
                error={Boolean(error)}
                {...others}
            />

            {
                error && <p className={classes.error}>{error}</p>
            }
        </div>
    )
}
