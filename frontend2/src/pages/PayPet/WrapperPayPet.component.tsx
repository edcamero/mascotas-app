import { Grid } from '@mui/material'
import React from 'react'
import PayPetCard from './PayPetCard.conponent'
import { paymentmethods } from './resource/paymentmethods'
import Typography from '@mui/material/Typography'

const WrapperPayPet: React.FC = () => {
  return (
    <>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h1" gutterBottom>
          Ayuda a la Fundación
        </Typography>
        <Typography variant="h3" gutterBottom>
          Puedes contribuir de las siguientes formas
        </Typography>
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        {paymentmethods.map((paymentMethod, index) => {
          return <PayPetCard {...paymentMethod} key={index} />
        })}
      </Grid>
    </>
  )
}

export default WrapperPayPet
