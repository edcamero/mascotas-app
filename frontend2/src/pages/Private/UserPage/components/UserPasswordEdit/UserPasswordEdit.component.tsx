import {
  Paper,
  Container,
  CssBaseline,
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from '@mui/material'
import React from 'react'
import BackButtonComponent from '../../../../../components/BackButtonComponent/BackButtonComponent'

const UserPasswordEdit: React.FC = () => {
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  return (
    <>
      <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <BackButtonComponent />
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              margin: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h2" variant="h5" align="center">
              Actualizar Password del usuario
            </Typography>
            <Divider />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ p: 1, m: 2 }}
            >
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) => setPassword(e.target.value as string)}
                  value={password}
                  data-testid="text-title-news"
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="confirm-password"
                  label="Confirmar Password"
                  name="confirm-password"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) => setConfirmPassword(e.target.value as string)}
                  value={confirmPassword}
                  data-testid="text-title-news"
                />
              </Grid>

              <Grid item xs={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={password === ''}
                >
                  Actualizar Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default UserPasswordEdit
