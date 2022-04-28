import { IconButton } from '@mui/material'
import React from 'react'
import { Button } from '../../../UI/Button/Button'
import { TextField } from '../../../UI/TextField/TextField'
import { Application, ApplicationGroup } from '../Types/Application'
import classes from './ApplicationGroups.module.scss';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { FieldArray, FormikConfig, FormikProps, FormikProvider, FormikValues } from 'formik'

interface ApplicationGroupProps {
    applicationGroups: Required<ApplicationGroup[]>,
    formik: FormikProps<Application>
}
export const ApplicationGroups = ({ formik, applicationGroups }: ApplicationGroupProps) => {

    const handleCreate = () => {
        formik.handleChange({
            target: {
                name: 'applicationGroups',
                value: [
                    ...applicationGroups,
                    { name: '' }
                ]
            }
        })
    }

    const handleDelete = (index: number) => {

        formik.setValues(previosState => {
            const values = previosState.applicationGroups?.slice() || []; // sLice
            values.splice(index, 1); // sPlice

            return { ...previosState, applicationGroups: values }
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {

        formik.setValues(previosState => {
            const values = previosState.applicationGroups?.slice() || []; // sLice
            values[index] = { ...values[index], name: e.target.value }

            return { ...previosState, applicationGroups: values }
        })
    }

    return (
        <>
            <FormikProvider value={formik}>
                <FieldArray
                    name="applicationGroups"
                    render={(arrayHelper) => {
                        return (
                            <>
                                {
                                    applicationGroups?.map((it, index) => {
                                        return (
                                            <div key={index} className={classes.applicationGroup}>
                                                <TextField
                                                    name={`applicationGroups.${index}.name`}
                                                    label="Наименование"
                                                    value={it.name}
                                                    fullWidth
                                                    onChange={formik.handleChange}
                                                />
                                                <IconButton
                                                    color="error"
                                                    disabled={index === 0}
                                                    onClick={() => arrayHelper.remove(index)}
                                                >
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
                                    onClick={() => arrayHelper.push({ name: '' })}
                                >
                                    Создать
                                </Button>
                            </>
                        )
                    }}
                />


            </FormikProvider>
            {/* {
                applicationGroups?.map((it, index) => {
                    return (
                        <div className={classes.applicationGroup}>
                            <TextField
                                key={it.id || it.name}
                                label="Наименование"
                                value={it.name}
                                fullWidth
                                onChange={(e) => handleChange(e, index)}
                            />
                            <IconButton 
                                color="error" 
                                disabled={index === 0}
                                onClick={() => handleDelete(index)}
                            >
                                <RemoveCircleIcon />
                            </IconButton>
                        </div>
                    )
                })
            } */}

        </>
    )
}
