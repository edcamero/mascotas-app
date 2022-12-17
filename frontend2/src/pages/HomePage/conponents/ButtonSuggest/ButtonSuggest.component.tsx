import { Button } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

const ButtonSuggest: React.FC = () => {
    const navigate = useNavigate()

    const handlingClick = () => {
        navigate(`/pets/suggest`)
      }
      
  return (
    <>
      <Grid container xs={12} justifyContent="center">
        <Button sx={{ margin: '2rem', backgroundColor: '#4CAF50!important'}} size="large" variant="contained" onClick={handlingClick}>
          <Typography variant="h3" > Sugerir Mascota</Typography>
        </Button>
      </Grid>
    </>
  )
}

export default ButtonSuggest
