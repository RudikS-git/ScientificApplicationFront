import React from 'react'
import { useNavigate } from 'react-router';
import { Button } from '../../../UI/Button/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackBtnProps {
  disabled?: boolean
}

export const BackBtn = ({ disabled }: BackBtnProps) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      variant="text"
      startIcon={<ArrowBackIcon />}
      color="info"
      disabled={disabled}
    >
      Вернуться назад
    </Button>
  )
}
