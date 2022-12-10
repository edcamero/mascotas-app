import { ThemeProvider } from '@emotion/react'
import {
  Paper,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  createTheme,
} from '@mui/material'
import axios from 'axios'
import React from 'react'
import BackDropLoadApi from '../../components/backDropLoad/BackDropLoadApi'
import LockResetIcon from '@mui/icons-material/LockReset'
import IMessageAttributes from '../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../components/MessagesComponent/Resources/MessagesList'
import MessagesComponent from '../../components/MessagesComponent/MessagesComponent'

const StatusNotfound = 404
const InitialError = { helperText: '', error: false }


interface ITextFieldError {
  helperText: string
  error: boolean
}

const RecoverPassword: React.FC = () => {
  const theme = createTheme()
  const [isLoading, setIsLoading] = React.useState(false)
  const [userError, setUserError] = React.useState<ITextFieldError>(InitialError)
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)



  React.useEffect(() => {
    if (alertMessage.message !== '') {
      setOpenMessage(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMessage.message])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setIsLoading(true)
    axios
      .post(process.env.REACT_APP_API_URL + 'forgotpassword', formData)
      .then((response) => {
          setAlertMessage(messagesList.SUCCESS_CREATED)
      })
      .catch((error) => {
        if (error.response.status === StatusNotfound) {
          setUserError({ helperText: 'Correo invalido', error: true })
          setAlertMessage(messagesList.INVALID_FORM_VALIDATION)
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <ThemeProvider theme={theme}>
      <BackDropLoadApi open={isLoading} />
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <Paper elevation={3} sx={{ marginTop: '5rem' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Recuperar Constraseña
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...userError}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Enviar
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  )
}

export default RecoverPassword
