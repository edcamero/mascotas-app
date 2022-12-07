import { Grid, Card, CardMedia } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IPayPetCardProps {
  text: string
  image: string
  link?: string
}
const PayPetCard: React.FC<IPayPetCardProps> = ({ text, image, link }) => {
  const navigate = useNavigate()
  const handlingClick = () => {
    if (link) {
      navigate(link)
    }
  }
  return (
    <Grid item xs={4} container direction="row" justifyContent="center" alignItems="center">
      <Card sx={{ width: 250, marginTop: '2rem' }} onClick={handlingClick}>
        <CardMedia component="img" height="350" image={image} alt="img-card-pay" />
      </Card>
    </Grid>
  )
}

export default PayPetCard
