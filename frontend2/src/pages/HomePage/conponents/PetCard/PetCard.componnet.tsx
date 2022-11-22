import {  Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { IPetsPublic } from '../resource/usePetPublic'
import esLocale from 'date-fns/locale/es'
import { useNavigate } from 'react-router-dom'

interface IPetCard {
  pet: IPetsPublic
}
const PetCard: React.FC<IPetCard> = ({ pet }) => {
  const navigate = useNavigate()

  const handlingClick = () => {
    navigate(`/pets/${pet.ID}`)
  }
  
  return (
    <Grid item xs={4} container direction="row" justifyContent="center" alignItems="center">
      <Card sx={{ width: 350, marginTop: '2rem' }}  onClick={handlingClick}>
        <CardMedia component="img" height="140" image={`${pet.fotos[0].url}`} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${pet.nombre}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${formatDistanceToNow(new Date(pet?.fechaNacimiento ?? new Date()), {
              locale: esLocale,
            })} - ${pet.especie} ${pet.sexo === 'F' ? 'hembra' : 'macho'} - ${pet.raza}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PetCard
