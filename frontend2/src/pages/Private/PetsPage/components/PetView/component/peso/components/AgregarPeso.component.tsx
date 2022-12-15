import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import BackDropLoadApi from '../../../../../../../../components/backDropLoad/BackDropLoadApi'
import MessagesComponent from '../../../../../../../../components/MessagesComponent/MessagesComponent'
import { usePeso } from '../resource/usePetPeso'

const AgregarPeso: React.FC = () => {
  let { id } = useParams()
  const { petPeso, setPetPeso, isLoading, alertMessage, petPesoError, handleOnSubmit } = usePeso(
    id ?? ''
  )
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
                id="peso"
                label="Peso"
                name="peso"
                autoComplete="off"
                autoFocus
                type="number"
                InputProps={{ inputProps: { min: 0, max: 110 } }}
                onChange={(e) =>
                  setPetPeso({
                    ...petPeso,
                    peso: e.target.value as unknown as number,
                  })
                }
                value={petPeso.peso}
                data-testid="text-title-news"
                error={petPesoError?.peso ? true : false}
                helperText={petPesoError?.peso}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={petPeso.peso === 0}
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

export default AgregarPeso
