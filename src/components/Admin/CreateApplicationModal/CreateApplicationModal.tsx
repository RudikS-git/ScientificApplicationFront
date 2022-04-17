import { Box, Grid, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react'
import { useModal } from '../../../hooks/useModal';
import { Button } from '../../../UI/Button/Button';
import { ModalWindow } from '../../../UI/ModalWindow/ModalWindow';
import { TextField } from '../../../UI/TextField/TextField';
import { CreateApplicationModel } from '../ManageApplications/useApplication';

interface CreateApplicationModal {
    isOpen: boolean,
    close(): void,
    ok(): void,
    error?: string,
    formik: FormikProps<CreateApplicationModel>
}

export const CreateApplicationModal = ({ isOpen, close, ok, formik } : CreateApplicationModal) => {

    return (
        <ModalWindow open={isOpen} onClose={close}>
            <div>
                <Typography variant="h1" align='center' gutterBottom>Создание заявки</Typography>
                <TextField
                    label="Наименование"
                    name="name"
                    onChange={formik.handleChange}
                    error={formik.errors?.name}
                    disabled={formik.isSubmitting}
                />

                <Box sx={{ mt: 3 }}>
                    <Grid container justifyContent='center' spacing={2}>
                        <Grid sm={6} item>
                            <Button
                                fullWidth
                                variant='contained'
                                color='error'
                                onClick={close}
                                disabled={formik.isSubmitting}
                            >
                                Отменить
                            </Button>
                        </Grid>
                        <Grid sm={6} item>
                            <Button
                                fullWidth
                                variant='contained'
                                onClick={ok}
                                disabled={formik.isSubmitting}
                            >
                                Создать
                            </Button>
                        </Grid>
                    
                    </Grid>
                </Box>
            </div>
        </ModalWindow>
    )
}
