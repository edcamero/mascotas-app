import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Paper } from '@mui/material'
import axios from 'axios'
import { IUserPerfil, useAuthSecurity } from './AuthProvider'
import BackDropLoadApi from '../../components/backDropLoad/BackDropLoadApi'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()
interface ITextFieldError {
  helperText: string
  error: boolean
}
const StatusNotfound = 404
const StatusUnAuthorized = 401
const InitialError = { helperText: '', error: false }

const LoginPage: React.FC = () => {
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [userError, setUserError] = React.useState<ITextFieldError>(InitialError)
  const [passwordError, setPasswordError] = React.useState<ITextFieldError>(InitialError)
  const { setSecurityTokens, setIsAuthenticated, setUser, isAuthenticated } = useAuthSecurity()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(`/dashboard`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setIsLoading(true)
    axios
      .post(process.env.REACT_APP_API_URL + 'login', formData)
      .then(
        (response) => (
          // eslint-disable-next-line no-console
          console.log(response.data.user),
          setUser(response.data.user as IUserPerfil),
          setSecurityTokens({
            accessToken: response.data.token.access_token,
            refreshToken: response.data.token.refresh_token,
          }),
          setIsAuthenticated(true)
        )
      )
      .catch((error) => {
        if (error.response.status === StatusNotfound) {
          setUserError({ helperText: 'Correo invalido', error: true })
        }
        if (error.response.status === StatusUnAuthorized) {
          setPasswordError({ helperText: 'Contraseña invalida', error: true })
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <ThemeProvider theme={theme}>
      <BackDropLoadApi open={isLoading} />
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...passwordError}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/resetpassword" variant="body2">
                    ¿Se te olvidó tu contraseña?
                  </Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  )
}

export default LoginPage
