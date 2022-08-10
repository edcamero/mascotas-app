import { Button } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButtonComponent = () => {
  const navigate = useNavigate()
  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<KeyboardBackspaceIcon />}
      data-testid="button-back"
      color="secondary"
      onClick={() => navigate(-1)}
    >
      REGRESAR
    </Button>
  )
}

export default BackButtonComponent
