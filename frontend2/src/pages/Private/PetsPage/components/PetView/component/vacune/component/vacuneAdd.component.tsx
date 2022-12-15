import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React from 'react'
import { useParams } from 'react-router-dom'
import esLocale from 'date-fns/locale/es'
import BackDropLoadApi from '../../../../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../../../../components/MessagesComponent/MessagesComponent'
import { usePetVacune } from '../resource/usePetVacune'

const VacuneAdd: React.FC = () => {
  let { id } = useParams()

  const { vacunePet, setVacunePet, isLoading, alertMessage, vacunePetError, handleOnSubmit } =
    usePetVacune(id ?? '')
  const [openMessage, setOpenMessage] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (alertMessage.message !== '') {
      setOpenMessage(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMessage.message])
  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <MessagesComponent open={openMessage} setOpen={setOpenMessage} {...alertMessage} />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
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
                label="Nombre de Vacuna"
                name="nombre"
                autoComplete="off"
                autoFocus
                onChange={(e) =>
                  setVacunePet({
                    ...vacunePet,
                    nombre: e.target.value as string,
                  })
                }
                value={vacunePet.nombre}
                data-testid="text-title-news"
                error={vacunePetError?.nombre ? true : false}
                helperText={vacunePetError?.nombre}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                margin="normal"
                fullWidth
                id="peso"
                label="Peso"
                name="peso"
                autoComplete="off"
                autoFocus
                type="number"
                InputProps={{ inputProps: { min: 0, max: 110 } }}
                onChange={(e) =>
                  setVacunePet({
                    ...vacunePet,
                    peso: Number(e.target.value as unknown as number),
                  })
                }
                value={vacunePet.peso}
                data-testid="text-title-news"
                error={vacunePetError?.peso ? true : false}
                helperText={vacunePetError?.peso}
              />
            </Grid>
            <Grid item xs={6} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                <DatePicker
                  label="Fecha de vacuna"
                  value={vacunePet.createdAt}
                  onChange={(newValue) => {
                    setVacunePet({
                      ...vacunePet,
                      createdAt: newValue,
                    })
                  }}
                  renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                <DatePicker
                  label="Fecha de Proximo Control"
                  value={vacunePet.nextControlAt}
                  onChange={(newValue) => {
                    setVacunePet({
                      ...vacunePet,
                      nextControlAt: newValue,
                    })
                  }}
                  renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  vacunePet.nombre !== '' || vacunePet.peso <= 0 || vacunePet.nextControlAt !== null
                }
                onClick={() => {
                  handleOnSubmit()
                }}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}
export default VacuneAdd
