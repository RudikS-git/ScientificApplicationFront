import { Box, Grid, MenuItem, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import React, { ChangeEventHandler } from 'react'
import { Button } from '../../../UI/Button/Button';
import { ModalWindow } from '../../../UI/ModalWindow/ModalWindow';
import { Select } from '../../../UI/Select';
import { TextField } from '../../../UI/TextField/TextField';
import { ManageApplicationSubmission } from '../../Types/ManageApplicationSubmission';
import { useManageApplicationSubmission } from './useManageApplicationSubmission';
import classes from './SetApplicationSubmissionModal.module.scss';
import { observer } from 'mobx-react';
import { useModeratorStores } from '../../../store/RootStore';

interface CreateApplicationModal {
  isOpen: boolean,
  close(): void,
  error?: string,
}

const _SetApplicationSubmissionModal = ({ isOpen, close }: CreateApplicationModal) => {

  const { formik } = useManageApplicationSubmission({ close });
  const { applicationStore: { applicationStates }, applicationSubmissionStore } = useModeratorStores();

  return (
    <ModalWindow open={isOpen} onClose={close}>
      <div className={classes.root}>
        <Typography variant="h1" align='center' gutterBottom>Управление заявкой</Typography>

        <Select
          label="Состояние заявки"
          options={applicationStates}
          value={formik.values.applicationState?.id}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => formik.setFieldValue('applicationState', applicationStates?.find(it => it.id === +e.target.value))}
        >
          {
            applicationStates?.map(({ id, name }) => <MenuItem value={id} key={id}>{name}</MenuItem>)
          }
        </Select>

        <TextField
          label="Комментарий"
          name="comment"
          onChange={formik.handleChange}
          error={formik.errors?.comment}
          disabled={formik.isSubmitting}
          fullWidth
          multiline
          minRows={2}
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
                onClick={formik.submitForm}
                disabled={formik.isSubmitting}
              >
                Установить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ModalWindow>
  )
}

const SetApplicationSubmissionModal = observer(_SetApplicationSubmissionModal);
export { SetApplicationSubmissionModal }
