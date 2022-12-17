import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React from 'react'
import esLocale from 'date-fns/locale/es'
import BackButtonComponent from '../../../../../components/BackButtonComponent/BackButtonComponent'
import { animalSizes, IPetFormAttributesErrors, IPetRegister } from '../../resource/usePets'
import { ISpecie, specieInitial } from '../../../SpeciesPage/resource/speciesResource'
import useAxios from '../../../../../services/axios.services'
import messagesList from '../../../../../components/MessagesComponent/Resources/MessagesList'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'

interface IPetsformProps {
  titleForm: string
  petFormAttributes: IPetRegister
  setPetFormAttributes: (value: IPetRegister) => void
  clickFormPet: () => void
  petErrors?: IPetFormAttributesErrors
  setAlertMessage: (value: IMessageAttributes) => void
}
const Petsform: React.FC<IPetsformProps> = (props) => {
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState(true)
  const [species, setSpecies] = React.useState<ISpecie[]>([])
  const [specie, setSpecie] = React.useState<ISpecie>(specieInitial)

  const handleOnClickButton = () => {
    props.clickFormPet()
  }

  const handleChangeSpecie = (event: React.ChangeEvent<HTMLInputElement>) => {
    let specieSearch = species.find((x) => x.nombre === (event.target.value as string)) as ISpecie
    setSpecie(specieSearch)
  }

  React.useEffect(() => {
    if (specie.nombre != '') {
      props.setPetFormAttributes({
        ...props.petFormAttributes,
        especie: specie.nombre,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specie])

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(process.env.REACT_APP_API_URL + 'admin/species')
        .then((response) => setSpecies(response.data as ISpecie[]))
        .catch((error) => {
          props.setAlertMessage(messagesList.INTERNAL_ERROR)
        })
        .finally(() => setIsLoading(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

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
              spacing={2}
              sx={{ p: 1, m: 2 }}
            >
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="nombre"
                  label="Nombre de Animal"
                  name="nombre"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    props.setPetFormAttributes({
                      ...props.petFormAttributes,
                      nombre: e.target.value as string,
                    })
                  }
                  value={props.petFormAttributes.nombre}
                  data-testid="text-title-news"
                  error={props.petErrors?.nombre ? true : false}
                  helperText={props.petErrors?.nombre}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="color"
                  label="Color de Animal"
                  name="color"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) =>
                    props.setPetFormAttributes({
                      ...props.petFormAttributes,
                      color: e.target.value as string,
                    })
                  }
                  value={props.petFormAttributes.color}
                  error={props.petErrors?.color ? true : false}
                  helperText={props.petErrors?.color}
                />
              </Grid>

              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="tamaño"
                  label="Tamaño de Animal"
                  name="tamaño"
                  autoComplete="off"
                  autoFocus
                  value={props.petFormAttributes.tamaño}
                  onChange={(e) =>
                    props.setPetFormAttributes({
                      ...props.petFormAttributes,
                      tamaño: e.target.value as string,
                    })
                  }
                  error={props.petErrors?.tamaño ? true : false}
                  helperText={props.petErrors?.tamaño}
                >
                  {animalSizes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                  <DatePicker
                    label="Fecha de Nacimiento"
                    value={props.petFormAttributes.fechaNacimiento}
                    onChange={(newValue) => {
                      props.setPetFormAttributes({
                        ...props.petFormAttributes,
                        fechaNacimiento: newValue,
                      })
                    }}
                    renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              {!isLoading && (
                <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    select
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                    id="Especie"
                    label="Especie del Animal"
                    name="Especie"
                    autoComplete="off"
                    autoFocus
                    value={props.petFormAttributes.especie}
                    onChange={handleChangeSpecie}
                    error={props.petErrors?.especie ? true : false}
                    helperText={props.petErrors?.especie}
                  >
                    {species.map((option) => (
                      <MenuItem key={option.nombre} value={option.nombre}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}
              {!isLoading && (
                <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    select
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                    id="raza"
                    label="Raza del Animal"
                    name="raza"
                    autoComplete="off"
                    autoFocus
                    value={props.petFormAttributes.raza}
                    onChange={(e) => {
                      props.setPetFormAttributes({
                        ...props.petFormAttributes,
                        raza: e.target.value as string,
                      })
                    }}
                    error={props.petErrors?.especie ? true : false}
                    helperText={props.petErrors?.especie}
                  >
                    {specie?.razas?.map((option) => (
                      <MenuItem key={option.nombre} value={option.nombre}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}
              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={props.petFormAttributes.sexo}
                    onChange={(e) => {
                      props.setPetFormAttributes({
                        ...props.petFormAttributes,
                        sexo: e.target.value as string,
                      })
                    }}
                  >
                    <FormControlLabel value="F" control={<Radio />} label="Hembra" />
                    <FormControlLabel value="M" control={<Radio />} label="Macho" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.petFormAttributes.esterilizado}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          props.setPetFormAttributes({
                            ...props.petFormAttributes,
                            esterilizado: event.target.checked,
                          })
                        }}
                      />
                    }
                    label="Esterilizado"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={props.petFormAttributes.nombre === ''}
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

export default Petsform
