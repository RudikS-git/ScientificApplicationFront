import classes from './Login.module.scss';
import React from 'react'
import { TextField } from '../../../UI/TextField/TextField';
import { Box, Button } from '@mui/material';
import { useRootStore } from '../../../store/RootStore';
import { useFormik } from 'formik';
import { LoginModel } from '../../../store/_types/LoginModel';
import { ErrorModel } from '../../../api/_types/ErrorModel';
import { Token } from '../../../Token';
import { useNavigate } from 'react-router';
import { useFetch } from '../../../hooks/useFetch';
import { toast } from 'react-toastify';

export const Login = () => {

  const navigate = useNavigate();
  const { authStore: { login } } = useRootStore();
  const formik = useFormik<LoginModel>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: () => submit()
  });

  const { startFetch, isLoading } = useFetch();

  const submit = async () => {
    const { error, validateErrors } = await startFetch(() => login(formik.values));

    if (error) {
      formik.setErrors({
        email: validateErrors?.email[0],
        password: validateErrors?.password[0]
      });
    }
    else {
      navigate('/lk')
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <h1>Авторизация</h1>
        <TextField
          id='email'
          type="email"
          size='small'
          variant="standard"
          label="Эл.почта"
          name="email"
          onChange={formik.handleChange}
          error={formik.errors['email']}
          disabled={formik.isSubmitting}
        />

        <TextField
          id='password'
          type="password"
          size='small'
          variant="standard"
          label="Пароль"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors['password']}
          disabled={formik.isSubmitting}
        />

        <Box className={classes['button-box']}>
          <Button
            variant='contained'
            onClick={formik.submitForm}
            disabled={formik.isSubmitting}
          >
            Войти
          </Button>
        </Box>


      </div>
    </div>
  )
}
