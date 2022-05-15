import { Box } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useRootStore } from '../../../store/RootStore';
import { RegistrationModel } from '../../../store/_types/RegistrationModel';
import { Button } from '../../../UI/Button/Button';
import { TextField } from '../../../UI/TextField/TextField';
import classes from './Registration.module.scss';
import * as yup from 'yup';
import { toast } from 'react-toastify';

interface RegistrationFormik extends RegistrationModel {
  confirmedPassword: string
}

export const Registration = () => {
  const navigate = useNavigate();
  const { authStore: { register } } = useRootStore();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Некорректный E-mail").required("E-mail обязателен"),
    password: yup.string().required("Пароль обязателен"),
    confirmedPassword: yup.string().required("Подтверждение пароля обязателено").test('passwordMatch', 'Пароли не совпадают', (confirmedPassword, context) => {
      return context.parent.password === confirmedPassword;
    }),
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    patronymic: yup.string(),
  });

  const formik = useFormik<RegistrationFormik>({
    initialValues: {
      email: '',
      password: '',
      confirmedPassword: '',
      firstName: '',
      lastName: '',
      patronymic: ''
    },
    onSubmit: () => submit(),
    validationSchema: validationSchema
  });

  const { startFetch } = useFetch();

  const submit = async () => {
    const { error, validateErrors } = await startFetch(() => register(formik.values));

    if (error) {
      formik.setErrors({
        email: validateErrors?.email[0],
        password: validateErrors?.password[0]
      });
    }
    else {
      toast("Вы успешно зарегистрировались", { type: 'success' });
      navigate('/auth/login');
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <h1>Регистрация</h1>
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
          id='firstName'
          type="firstName"
          size='small'
          variant="standard"
          label="Имя"
          name="firstName"
          onChange={formik.handleChange}
          error={formik.errors['firstName']}
          disabled={formik.isSubmitting}
        />

        <TextField
          id='lastName'
          type="lastName"
          size='small'
          variant="standard"
          label="Фамилия"
          name="lastName"
          onChange={formik.handleChange}
          error={formik.errors['lastName']}
          disabled={formik.isSubmitting}
        />

        <TextField
          id='patronymic'
          type="patronymic"
          size='small'
          variant="standard"
          label="Отчество"
          name="patronymic"
          onChange={formik.handleChange}
          error={formik.errors['patronymic']}
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

        <TextField
          id='confirmedPassword'
          type="password"
          size='small'
          variant="standard"
          label="Подтверждение пароля"
          name="confirmedPassword"
          onChange={formik.handleChange}
          error={formik.errors['confirmedPassword']}
          disabled={formik.isSubmitting}
        />

        <Box className={classes['button-box']}>
          <Button
            variant='contained'
            onClick={formik.submitForm}
            disabled={formik.isSubmitting}
            fullWidth
          >
            Зарегистрироваться
          </Button>

          <Link to="/auth/login">
            <Button
              variant='outlined'
              fullWidth
            >
              Вход
            </Button>
          </Link>
        </Box>
      </div>
    </div>
  )
}
