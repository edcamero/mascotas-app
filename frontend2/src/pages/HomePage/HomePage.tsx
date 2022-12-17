import { Grid, Typography } from '@mui/material'
import React from 'react'
import imagebackgraud from '../../images/background1.jpg'
import { useTheme } from '@mui/material/styles'
import PetPublic from './conponents/PetsPublic/PetPublic.component'
import WrapperPayPet from '../PayPet/WrapperPayPet.component'
import ButtonSuggest from './conponents/ButtonSuggest/ButtonSuggest.component'

const HomePage: React.FC = () => {
  const theme = useTheme()

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="top"
        alignItems="flex-start"
        sx={{ marginTop: '-2rem' }}
      >
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <img
            src={imagebackgraud}
            alt="imagen de inicio"
            data-testid="main-img"
            style={{
              width: '100%',
              position: 'relative',
            }}
          />

          <Grid
            item
            container
            xs={12}
            justifyContent="center"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Grid item xs={12} md={8} lg={6}>
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontWeight: 'bold',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '1.2rem',
                  },
                  [theme.breakpoints.up('sm')]: {
                    fontSize: '2.5rem',
                  },
                  [theme.breakpoints.up('md')]: {
                    fontSize: '3rem',
                  },
                }}
              >
                “No vamos a salvar el mundo cuando rescatamos a un animal, pero para ese animal su
                mundo somos nosotros”
              </Typography>
            </Grid>
          </Grid>
        </div>
        <PetPublic />
        <ButtonSuggest/>
        <WrapperPayPet />
      </Grid>
    </>
  )
}

export default HomePage
