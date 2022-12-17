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
  MenuItem,
} from '@mui/material'
import React from 'react'
import BackButtonComponent from '../../../components/BackButtonComponent/BackButtonComponent'
import {
  estadoCivilData,
  estrato,
  ISuggestPet,
  ISuggestPetError,
  sexoAdop,
  sizeHome,
} from '../resources/suggestPet'

interface IFormSuggestPetProps {
  suggest: ISuggestPet
  setSuggest: (value: ISuggestPet) => void
  errorsSuggest: ISuggestPetError
  handleOnClickButton: () => void
}

const FormSuggestPet: React.FC<IFormSuggestPetProps> = ({
  suggest,
  setSuggest,
  errorsSuggest,
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
              Formulario de Sugerencia de Mascota
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
              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="vivienda"
                  label="Vivienda"
                  name="vivienda"
                  autoComplete="off"
                  autoFocus
                  value={suggest.vivienda}
                  onChange={(e) =>
                    setSuggest({
                      ...suggest,
                      vivienda: e.target.value as string,
                    })
                  }
                  error={errorsSuggest.vivienda ? true : false}
                  helperText={errorsSuggest?.vivienda}
                >
                  {sizeHome.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="sexo"
                  label="Sexo"
                  name="sexo"
                  autoComplete="off"
                  autoFocus
                  value={suggest.sexo}
                  onChange={(e) =>
                    setSuggest({
                      ...suggest,
                      sexo: e.target.value as string,
                    })
                  }
                  error={errorsSuggest.sexo ? true : false}
                  helperText={errorsSuggest?.sexo}
                >
                  {sexoAdop.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="estadoCivil"
                  label="Estado Civil"
                  name="estadoCivil"
                  autoComplete="off"
                  autoFocus
                  value={suggest.estadoCivil}
                  onChange={(e) =>
                    setSuggest({
                      ...suggest,
                      estadoCivil: e.target.value as string,
                    })
                  }
                  error={errorsSuggest.estadoCivil ? true : false}
                  helperText={errorsSuggest?.estadoCivil}
                >
                  {estadoCivilData.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="estrato"
                  label="Estrato"
                  name="estrato"
                  autoComplete="off"
                  autoFocus
                  value={suggest.estrato}
                  onChange={(e) =>
                    setSuggest({
                      ...suggest,
                      estrato: Number(e.target.value as unknown as number),
                    })
                  }
                  error={errorsSuggest.estrato ? true : false}
                  helperText={errorsSuggest?.estrato}
                >
                  {estrato.map((option) => (
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
                  id="edad"
                  label="Edad"
                  name="edad"
                  autoComplete="off"
                  autoFocus
                  type="number"
                  onChange={(e) =>
                    setSuggest({
                      ...suggest,
                      edad: Number(e.target.value as unknown as  number),
                    })
                  }
                  value={suggest.edad}
                  data-testid="text-title-news"
                  error={errorsSuggest.edad ? true : false}
                  helperText={errorsSuggest?.edad}
                />
              </Grid>

              <Grid item xs={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    suggest.vivienda === '' ||
                    suggest.estadoCivil === '' ||
                    suggest.estrato === 0 ||
                    suggest.sexo === '' ||
                    suggest.edad === 0
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

export default FormSuggestPet
