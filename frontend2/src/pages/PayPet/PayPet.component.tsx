import { Box, Button, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { usePayPet } from './usePayPet'
import PaymentsIcon from '@mui/icons-material/Payments'
import BackButtonComponent from '../../components/BackButtonComponent/BackButtonComponent'

const PeyPet: React.FC = () => {
  const { makePayment,price, setPrice } = usePayPet()

  return (
    <>
      <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <BackButtonComponent />
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              margin: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h2" variant="h5" align="center">
              Realizar Donación
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
                  id="price"
                  label="Valor a donar"
                  name="price"
                  autoComplete="off"
                  autoFocus
                  onChange={(e) => setPrice(e.target.value as unknown as number)}
                  value={price}
                  data-testid="text-title-news"
                  error={price < 0 ? true : false}
                />
              </Grid>
            </Grid>

            <Button
              onClick={makePayment}
              data-testid="button-alert-cancelar"
              startIcon={<PaymentsIcon />}
            >
              Realizar Donación
            </Button>
          </Box>
        </Container>
      </Paper>
    </>
  )
}

export default PeyPet
