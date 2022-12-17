import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import BackButtonComponent from '../../../components/BackButtonComponent/BackButtonComponent'
import { documentTypeOptions, IDocumentType } from '../../../utils/documentType/documentType'
import { IAdopter, IAdopterErrors } from '../resources/adopter'

interface IFormAdoptionApplicationProps {
  adopter: IAdopter
  setAdopter: (value: IAdopter) => void
  errorsAdopter: IAdopterErrors
  handleOnClickButton: () => void
}
const FormAdoptionApplication: React.FC<IFormAdoptionApplicationProps> = ({
  adopter,
  setAdopter,
  errorsAdopter,
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
              Formulario de solicitud adopción
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
                    setAdopter({
                      ...adopter,
                      nombres: e.target.value as string,
                    })
                  }
                  value={adopter.nombres}
                  data-testid="text-title-news"
                  error={errorsAdopter.nombres ? true : false}
                  helperText={errorsAdopter?.nombres}
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
                    setAdopter({
                      ...adopter,
                      apellidos: e.target.value as string,
                    })
                  }
                  value={adopter.apellidos}
                  data-testid="text-title-news"
                  error={errorsAdopter.apellidos ? true : false}
                  helperText={errorsAdopter?.apellidos}
                />
              </Grid>
              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="tipo-documento"
                  label="Tipo de documento"
                  name="tipo-documento"
                  autoComplete="off"
                  autoFocus
                  value={adopter.documento.tipo}
                  onChange={(e) =>
                    setAdopter({
                      ...adopter,
                      documento: { ...adopter.documento, tipo: e.target.value as string },
                    })
                  }
                  error={errorsAdopter.tipoDocumento ? true : false}
                  helperText={errorsAdopter.tipoDocumento}
                >
                  {documentTypeOptions.map((option: IDocumentType) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="numero-documento"
                  label="Número de Documento"
                  name="numero-documento"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setAdopter({
                      ...adopter,
                      documento: { ...adopter.documento, numero: e.target.value as string },
                    })
                  }
                  value={adopter.documento.numero}
                  data-testid="test-number-document"
                  error={errorsAdopter.nombres ? true : false}
                  helperText={errorsAdopter?.nombres}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="ciudad"
                  label="Ciudad"
                  name="ciudad"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setAdopter({
                      ...adopter,
                      direccion: { ...adopter.direccion, ciudad: e.target.value as string },
                    })
                  }
                  value={adopter.direccion.ciudad}
                  data-testid="test-city"
                  error={errorsAdopter.direccion ? true : false}
                  helperText={errorsAdopter?.direccion}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="barrio"
                  label="Barrio"
                  name="barrio"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setAdopter({
                      ...adopter,
                      direccion: { ...adopter.direccion, barrio: e.target.value as string },
                    })
                  }
                  value={adopter.direccion.barrio}
                  data-testid="test-district"
                  error={errorsAdopter.direccion ? true : false}
                  helperText={errorsAdopter?.direccion}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="dirrecion"
                  label="Dirección"
                  name="direccion"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setAdopter({
                      ...adopter,
                      direccion: { ...adopter.direccion, direccion: e.target.value as string },
                    })
                  }
                  value={adopter.direccion.direccion}
                  data-testid="test-adress"
                  error={errorsAdopter.direccion ? true : false}
                  helperText={errorsAdopter?.direccion}
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
                    setAdopter({
                      ...adopter,
                      telefono: e.target.value as string,
                    })
                  }
                  value={adopter.telefono}
                  data-testid="test-phone"
                  error={errorsAdopter.telefono ? true : false}
                  helperText={errorsAdopter?.telefono}
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
                    setAdopter({
                      ...adopter,
                      email: e.target.value as string,
                    })
                  }
                  value={adopter.email}
                  data-testid="test-email"
                  error={errorsAdopter.email ? true : false}
                  helperText={errorsAdopter?.email}
                />
              </Grid>

              <Grid item xs={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    adopter.nombres === '' ||
                    adopter.apellidos === '' ||
                    adopter.documento.numero === '' ||
                    adopter.direccion.ciudad === '' ||
                    adopter.direccion.barrio === '' ||
                    adopter.direccion.direccion === '' ||
                    adopter.telefono === '' ||
                    adopter.email === '' ||
                    errorsAdopter.email !== ''
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

export default FormAdoptionApplication
