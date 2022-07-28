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

const theme = createTheme()

const LoginPage: React.FC = () => {
  const { setSecurityTokens, setIsAuthenticated, setUser } = useAuthSecurity()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      email: formData.get('email'),
      password: formData.get('password'),
    })

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
        /* this.error.status = error.response.status
        this.error.message =
          error.response.status === statusNotfound
            ? 'Correo no registrado'
            : 'Error en la contraseña'*/
      })
  }

  return (
    <ThemeProvider theme={theme}>
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
                  <Link href="#" variant="body2">
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
