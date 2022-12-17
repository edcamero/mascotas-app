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
import BackButtonComponent from '../../../components/BackButtonComponent/BackButtonComponent'
import { ISponsorPet, ISponsorPetError } from '../resources/sponsorerPet'

interface IFormSponsorPetProps {
  sponsor: ISponsorPet
  setSponsor: (value: ISponsorPet) => void
  errorsSponsor: ISponsorPetError
  handleOnClickButton: () => void
}

const FormSponsorPet: React.FC<IFormSponsorPetProps> = ({
  sponsor,
  setSponsor,
  errorsSponsor,
  handleOnClickButton,
}) => {
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
              Formulario de apadrinamiento
            </Typography>
            <Divider />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ p: 1, m: 2 }}
            >
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="nombres"
                  label="Nombres"
                  name="nombres"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setSponsor({
                      ...sponsor,
                      nombres: e.target.value as string,
                    })
                  }
                  value={sponsor.nombres}
                  data-testid="text-title-news"
                  error={errorsSponsor.nombres ? true : false}
                  helperText={errorsSponsor?.nombres}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="apellidos"
                  label="Apellidos"
                  name="apellidos"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setSponsor({
                      ...sponsor,
                      apellidos: e.target.value as string,
                    })
                  }
                  value={sponsor.apellidos}
                  data-testid="text-title-news"
                  error={errorsSponsor.apellidos ? true : false}
                  helperText={errorsSponsor?.apellidos}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="telefono"
                  label="Teléfono"
                  name="telefono"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setSponsor({
                      ...sponsor,
                      telefono: e.target.value as string,
                    })
                  }
                  value={sponsor.telefono}
                  data-testid="test-phone"
                  error={errorsSponsor.telefono ? true : false}
                  helperText={errorsSponsor?.telefono}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setSponsor({
                      ...sponsor,
                      email: e.target.value as string,
                    })
                  }
                  value={sponsor.email}
                  data-testid="test-email"
                  error={errorsSponsor.email ? true : false}
                  helperText={errorsSponsor?.email}
                />
              </Grid>

              <Grid item xs={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    sponsor.nombres === '' ||
                    sponsor.apellidos === '' ||
                    sponsor.telefono === '' ||
                    sponsor.email === '' ||
                    errorsSponsor.email !== ''
                  }
                  onClick={() => {
                    handleOnClickButton()
                  }}
                >
                  Enviar Solicitud
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default FormSponsorPet
