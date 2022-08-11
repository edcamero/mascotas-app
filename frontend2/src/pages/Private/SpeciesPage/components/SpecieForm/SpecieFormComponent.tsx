/* eslint-disable no-console */
import React from 'react'
import Grid from '@mui/material/Grid'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import {
  INewSpecie,
  IRazas,
  ISpecieFormAttributesErrors,
  subSpecieInitial,
} from '../../resource/speciesResource'
import BackButtonComponent from '../../../../../components/BackButtonComponent/BackButtonComponent'

interface ISpecieFormComponentProps {
  titleForm: string
  specieFormAttributes: INewSpecie
  setSpecieFormAttributes: (value: INewSpecie) => void
  clickFormSpecie: () => void
  specieErrors?: ISpecieFormAttributesErrors
}
const SpecieFormComponent: React.FC<ISpecieFormComponentProps> = (props) => {
  const [subspecie, setSubspecie] = React.useState<IRazas>(subSpecieInitial)

  const handleDelete = (nombre: string) => {
    let array = props.specieFormAttributes.razas.filter((item) => {
      return item.nombre !== nombre
    })
    props.setSpecieFormAttributes({
      ...props.specieFormAttributes,
      razas: [...array],
    })
  }

  const handleOnClickButton = () => {
    props.clickFormSpecie()
  }

  const addSubSpecie = () => {
    subspecie.id = props.specieFormAttributes.razas.length
    props.setSpecieFormAttributes({
      ...props.specieFormAttributes,
      razas: [...props.specieFormAttributes.razas, subspecie],
    })
    setSubspecie(subSpecieInitial)
  }

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
              {props.titleForm}
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
                  id="nombre"
                  label="Nombre de Especie"
                  name="nombre"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    props.setSpecieFormAttributes({
                      ...props.specieFormAttributes,
                      nombre: e.target.value as string,
                    })
                  }
                  value={props.specieFormAttributes.nombre}
                  data-testid="text-title-news"
                  error={props.specieErrors?.nombre ? true : false}
                  helperText={props.specieErrors?.nombre}
                />
              </Grid>
              <Grid item xs={10} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="nombre"
                  label="Razas"
                  name="nombre"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    setSubspecie({
                      ...subspecie,
                      nombre: e.target.value as string,
                    })
                  }
                  value={subspecie.nombre}
                  data-testid="text-title-news"
                  error={props.specieErrors?.nombre ? true : false}
                  helperText={props.specieErrors?.nombre}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <AddCircleIcon color="primary" onClick={() => addSubSpecie()} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                {props.specieFormAttributes.razas.map((subSpecie) => (
                  <Chip
                    key={subSpecie.id}
                    label={subSpecie.nombre}
                    onDelete={() => handleDelete(subSpecie.nombre)}
                  />
                ))}
              </Grid>
              <Grid item xs={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={props.specieFormAttributes.nombre === ''}
                  onClick={() => {
                    handleOnClickButton()
                  }}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default SpecieFormComponent
