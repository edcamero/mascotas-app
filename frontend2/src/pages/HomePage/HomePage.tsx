import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import imagebackgraud from '../../images/background1.jpg'
import BackDropLoadApi from '../../components/backDropLoad/BackDropLoadApi'
import { ISummary } from './resource/HomeResource'
import { useTheme } from '@mui/material/styles'

const HomePage: React.FC = () => {
  const [summary, setSummary] = useState<ISummary | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const theme = useTheme()

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(`${process.env.REACT_APP_API_URL}summary`)
        .then((response) => setSummary(response.data))
        .finally(() => setIsLoading(false))
    }
  }, [isLoading])

  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <Grid
        container
        direction="row"
        justifyContent="top"
        alignItems="flex-start"
        sx={{ marginTop: '-2rem'}}
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
        <Grid item xs={10} md={2} sx={{ marginTop: '4rem' }}>
          {summary?.Global && <> data prueba</>}
        </Grid>
        <Grid item xs={10} md={6} sx={{ margin: '1rem' }}>
          {summary?.Countries && <> data prueba</>}
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage
